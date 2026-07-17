import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Bike, Gauge, Mountain, GraduationCap, ArrowRight, Clock, Users } from "lucide-react";
import scooty from "@/assets/scooty.jpg";
import beginnerTraining from "@/assets/beginner-training.png.asset.json";
import regularTraining from "@/assets/regular-training.png.asset.json";
import getawaysImg from "@/assets/getaways.png.asset.json";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Nomad Bikers Club" },
      { name: "description", content: "Women-only bike and scooty training: Beginner Batch, Personal Training, Regular Batch, and Getaways every 3 months." },
      { property: "og:title", content: "Training & Getaways — For Women" },
      { property: "og:description", content: "Four programs, every one crafted for women riders." },
    ],
  }),
  component: Services,
});

const services = [
  { icon: Bike, t: "Beginner Training Batch", d: "Group of 5 women, 20 hours of training spread across 4 days. Start from zero — no prior riding experience needed.", img: beginnerTraining.url, dur: "20 hrs / 4 days", level: "Group of 5" },
  { icon: Gauge, t: "Scooty / Bike Personal Training", d: "1-on-1 training at a comfortable location of your choice. 2 hours per day for 7 days — at your own pace.", img: scooty, dur: "2 hrs × 7 days", level: "1-on-1" },
  { icon: GraduationCap, t: "Regular Training Batch", d: "3-hour group sessions for women who are already comfortable on a scooty and want to refine their skills.", img: regularTraining.url, dur: "3 hours", level: "Group of 5" },
  { icon: Mountain, t: "Getaways", d: "Women-only group rides to a new destination every 3 months. Curated routes, all-levels welcome.", img: getawaysImg.url, dur: "Every 3 months", level: "Women-only" },
];

function Services() {
  return (
    <>
      <section className="pt-32 sm:pt-40 pb-12 sm:pb-16 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">For Women, By Women</div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold">Crafted for <span className="text-gradient">every woman.</span></h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground">Four programs — beginner batches, 1-on-1 personal training, regular practice, and getaways. All led by women trainers.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 grid md:grid-cols-2 gap-6 sm:gap-8">
          {services.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-3xl glass shadow-elevated hover:shadow-glow transition-all">
              <div className="overflow-hidden">
                <img src={s.img} alt={s.t} loading="lazy" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-5 sm:p-8">
                <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
                  <div className="inline-flex p-3 rounded-2xl bg-ember-gradient text-primary-foreground"><s.icon className="h-5 w-5" /></div>
                  <div className="flex gap-2">
                    <span className="inline-flex items-center gap-1 text-xs glass rounded-full px-3 py-1"><Clock className="h-3 w-3" /> {s.dur}</span>
                    <span className="inline-flex items-center gap-1 text-xs glass rounded-full px-3 py-1"><Users className="h-3 w-3" /> {s.level}</span>
                  </div>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold">{s.t}</h3>
                <p className="mt-2 text-muted-foreground">{s.d}</p>
                <Link to="/booking" className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ember-gradient text-primary-foreground text-sm font-semibold hover:scale-105 transition">
                  Book Now <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHAT IS A GETAWAY */}
      <section className="py-16 sm:py-24 border-t border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Experiences</motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            What is a Getaway?
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
            It is a short motorcycle trip where we ride together to a destination, stay for a couple of days, and explore the place at a relaxed pace. It's a chance to experience the joy of riding, discover new places, connect with fellow riders, and create great memories. We organize a Getaway once every three months.
          </motion.p>
        </div>
      </section>

    </>
  );
}
