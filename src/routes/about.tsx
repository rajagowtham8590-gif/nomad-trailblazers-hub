import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Compass, Heart, Shield, Users } from "lucide-react";
import about from "@/assets/about.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Nomad Bikers Club" },
      { name: "description", content: "Founded in 2021, Nomad Bikers Club is India's women-only riding community — making the road an equal space for women." },
      { property: "og:title", content: "About Nomad Bikers Club" },
      { property: "og:description", content: "For Women, By Women — making the road an equal space." },
      { property: "og:image", content: about },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.72_0.21_45/0.25),transparent_60%)]" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Our Story</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">
            For women, <br /><span className="text-gradient">by women.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Since 2021, Nomad Bikers Club has been on one mission — making the road an equal space for women. We've trained 5,000+ women across 24+ cities, and we're just getting started.
          </motion.p>
        </div>
      </section>

      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden shadow-elevated">
            <img src={about} alt="Riders convoy" loading="lazy" className="w-full h-[40vh] sm:h-[60vh] object-cover" />
          </motion.div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 sm:mb-16">The Journey</h2>
          <div className="relative space-y-10">
            <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-primary/30 to-transparent" />
            {[
              { y: "2021", t: "The Spark", d: "Founded by women riders who wanted a safe, judgement-free space for other women to learn." },
              { y: "2022", t: "First Batches", d: "Launched beginner training batches in Bangalore and Chennai — all women, all the time." },
              { y: "2023", t: "Personal Training", d: "Opened 1-on-1 PT so women could learn at their own pace, in their own neighbourhood." },
              { y: "2024", t: "Getaways Begin", d: "Started women-only getaways — a new destination every 3 months." },
              { y: "2025", t: "5,000+ Women", d: "Crossed five thousand women trained, and grew across 24+ Indian cities." },
            ].map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="relative pl-12">
                <div className="absolute left-0 top-1.5 h-6 w-6 rounded-full bg-ember-gradient shadow-glow" />
                <div className="text-sm uppercase tracking-widest text-primary">{m.y}</div>
                <div className="font-display text-2xl font-bold mt-1">{m.t}</div>
                <p className="text-muted-foreground mt-2">{m.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 sm:mb-14">Our Values</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: Shield, t: "Safe Space", d: "Women trainers, women batches, zero judgement." },
              { icon: Heart, t: "Patience", d: "Everyone learns at their own pace. We meet you there." },
              { icon: Users, t: "Sisterhood", d: "A community of women who lift each other up — on and off the road." },
              { icon: Compass, t: "Equality", d: "The road belongs to everyone. We're making sure women take their share." },
            ].map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="glass rounded-3xl p-6 text-center hover:shadow-glow transition">
                <div className="inline-flex p-3 rounded-2xl bg-ember-gradient text-primary-foreground mb-4">
                  <v.icon className="h-5 w-5" />
                </div>
                <div className="font-display text-lg font-bold">{v.t}</div>
                <p className="text-sm text-muted-foreground mt-2">{v.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-16 sm:py-24 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <div className="text-xs uppercase tracking-[0.3em] text-primary mb-3">The Team</div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold">Meet the women behind the wheel</h2>
            <p className="mt-3 sm:mt-4 text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
              Riders, trainers and mentors leading Nomad Bikers Club across India.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {[
              { n: "Maya", r: "Founder & Lead Trainer" },
              { n: "Deepika", r: "Trainer & Community Lead" },
              { n: "Jayshree", r: "Trainer & Getaways Curator" },
            ].map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-3xl p-6 sm:p-8 text-center hover:shadow-glow transition"
              >
                <div className="mx-auto h-20 w-20 rounded-full bg-ember-gradient flex items-center justify-center font-display text-3xl font-bold text-primary-foreground shadow-glow">
                  {m.n[0]}
                </div>
                <div className="font-display text-xl font-bold mt-5">{m.n}</div>
                <div className="text-sm text-primary mt-1">{m.r}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
