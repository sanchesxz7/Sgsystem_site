import { motion } from "framer-motion";
import AveragePerformanceChart from "./AveragePerformanceChart";
import { fadeInUp, staggerContainer, viewportOnce } from "../lib/animations";

export default function AnimatedChart() {
  return (
    <section id="grafico" className="section relative" data-testid="section-chart">
      <div className="container-x">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-3xl"
        >
          <motion.span variants={fadeInUp} className="eyebrow">
            <span className="w-1.5 h-1.5 rounded-full bg-sgs-green" /> Performance média
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="font-display mt-5 font-extrabold text-white tracking-tight"
            style={{ fontSize: "clamp(34px, 4.6vw, 60px)", lineHeight: 1.05 }}
          >
            12 meses de{" "}
            <span className="text-gradient-static">crescimento real</span>.
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-5 text-slate-300 text-lg max-w-xl"
          >
            Índice médio de performance dos clientes que aplicam o método SGS.
            Base 100 em Janeiro.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7 }}
          className="mt-12"
        >
          <AveragePerformanceChart />
        </motion.div>
      </div>
    </section>
  );
}
