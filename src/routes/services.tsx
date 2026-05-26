import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Bike, Gauge, Mountain, GraduationCap, ArrowRight, Clock, Users } from "lucide-react";
import lessons from "@/assets/lessons.jpg";
import scooty from "@/assets/scooty.jpg";
import advanced from "@/assets/advanced.jpg";
import trips from "@/assets/trips.jpg";

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
  { icon: Bike, t: "Beginner Training Batch", d: "Group of 5 women, 20 hours of training spread across 4 days. Start from zero — no prior riding experience needed.", img: lessons, dur: "20 hrs / 4 days", level: "Group of 5" },
  { icon: Gauge, t: "Scooty / Bike Personal Training", d: "1-on-1 training at a comfortable location of your choice. 2 hours per day for 7 days — at your own pace.", img: scooty, dur: "2 hrs × 7 days", level: "1-on-1" },
  { icon: GraduationCap, t: "Regular Training Batch", d: "3-hour group sessions for women who are already comfortable on a scooty and want to refine their skills.", img: advanced, dur: "3 hours", level: "Group of 5" },
  { icon: Mountain, t: "Getaways", d: "Women-only group rides to a new destination every 3 months. Curated routes, all-levels welcome.", img: trips, dur: "Every 3 months", level: "Women-only" },
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
              <div className="aspect-[16/9] overflow-hidden">
                <img src={s.img} alt={s.t} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
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

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 sm:mb-12">What we cover</h2>
          <div className="glass rounded-3xl p-6 sm:p-8 md:p-12 shadow-elevated">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {[
                { t: "Day 1", d: "Balance, posture, controls — getting comfortable with the machine." },
                { t: "Day 2", d: "Low-speed manoeuvres, throttle control, basic braking." },
                { t: "Day 3", d: "Traffic awareness, defensive riding, gear-shifting (for geared bikes)." },
                { t: "Day 4", d: "Real-road practice, parking, U-turns, confidence ride." },
                { t: "PT Add-ons", d: "Custom routes, your own scooty/bike, comfortable home base." },
                { t: "Getaways", d: "Women-only group ride — new destination every 3 months." },
              ].map((p, i) => (
                <div key={i} className="border-l-2 border-primary/40 pl-4">
                  <div className="text-xs uppercase tracking-widest text-primary">{p.t}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
