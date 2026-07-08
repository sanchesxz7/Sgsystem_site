"""Backend API tests for Sanches Group System landing page."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "http://localhost:8000").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ============ Health ============
class TestHealth:
    def test_root_ok(self, api_client):
        r = api_client.get(f"{API}/")
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "ok"
        assert "message" in data


# ============ Leads ============
class TestLeads:
    created_ids = []

    def test_create_lead_success(self, api_client):
        payload = {
            "name": "TEST_Joao Silva",
            "contact": "joao.test@example.com",
            "revenue": "R$ 50 mil — R$ 200 mil/mês",
            "message": "Teste automatizado",
            "source": "pytest",
        }
        r = api_client.post(f"{API}/leads", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        # Required fields and no _id
        assert "_id" not in data
        assert data["name"] == payload["name"]
        assert data["contact"] == payload["contact"]
        assert data["revenue"] == payload["revenue"]
        assert data["message"] == payload["message"]
        assert data["source"] == payload["source"]
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        assert "created_at" in data
        TestLeads.created_ids.append(data["id"])

    def test_create_lead_minimal_default_source(self, api_client):
        payload = {
            "name": "TEST_Maria",
            "contact": "5511999990000",
            "revenue": "Até R$ 50 mil/mês",
        }
        r = api_client.post(f"{API}/leads", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["source"] == "landing-final-cta"
        assert data.get("message") is None
        TestLeads.created_ids.append(data["id"])

    def test_create_lead_missing_name_returns_422(self, api_client):
        payload = {"contact": "x@x.com", "revenue": "Até R$ 50 mil/mês"}
        r = api_client.post(f"{API}/leads", json=payload)
        assert r.status_code == 422

    def test_create_lead_short_name_returns_422(self, api_client):
        payload = {"name": "A", "contact": "x@x.com", "revenue": "Até R$ 50 mil/mês"}
        r = api_client.post(f"{API}/leads", json=payload)
        assert r.status_code == 422

    def test_create_lead_short_contact_returns_422(self, api_client):
        payload = {"name": "Joao", "contact": "x", "revenue": "Até R$ 50 mil/mês"}
        r = api_client.post(f"{API}/leads", json=payload)
        assert r.status_code == 422

    def test_list_leads_no_id_field_and_sorted(self, api_client):
        # ensure at least one lead exists
        api_client.post(
            f"{API}/leads",
            json={
                "name": "TEST_ListCheck",
                "contact": "list@test.com",
                "revenue": "Até R$ 50 mil/mês",
            },
        )
        r = api_client.get(f"{API}/leads")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) >= 1
        for item in data:
            assert "_id" not in item
            assert "id" in item
            assert "created_at" in item
        # Sort desc check
        timestamps = [item["created_at"] for item in data]
        assert timestamps == sorted(timestamps, reverse=True)

    def test_count_leads(self, api_client):
        r = api_client.get(f"{API}/leads/count")
        assert r.status_code == 200
        data = r.json()
        assert "count" in data
        assert isinstance(data["count"], int)
        assert data["count"] >= 1
