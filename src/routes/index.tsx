import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Bike, Compass, Gauge, Mountain, Star, Quote, Instagram } from "lucide-react";
import hero from "@/assets/hero.jpg";
import trips from "@/assets/trips.jpg";
import lessons from "@/assets/lessons.jpg";
import advanced from "@/assets/advanced.jpg";
import scooty from "@/assets/scooty.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nomad Bikers Club — Ride Free, Ride Together" },
      { name: "description", content: "Premium riding lessons, beginner programs, and guided adventure trips across India." },
      { property: "og:title", content: "Nomad Bikers Club" },
      { property: "og:description", content: "Ride Free. Ride Together." },
    ],
  }),
  component: Home,
});

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const start = performance.now();
        const dur = 1600;
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          setV(Math.floor(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative h-screen min-h-[640px] overflow-hidden">
        <motion.div style={{ scale, y }} className="absolute inset-0">
          <img src={hero} alt="Rider on mountain road" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent,oklch(0.08_0.01_40/0.6))]" />
        </motion.div>
        <motion.div style={{ opacity }} className="relative z-10 mx-auto max-w-7xl px-6 h-full flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full glass text-xs uppercase tracking-[0.25em] text-primary mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> Estd 2021 — India
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.9 }}
            className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold leading-[0.95] max-w-4xl">
            Ride Free. <br /> <span className="text-gradient">Ride Together.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground">
            From your first throttle twist to Himalayan passes — Nomad Bikers Club trains, guides and rides with you.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-10 flex flex-wrap gap-4">
            <Link to="/booking" className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-ember-gradient text-primary-foreground font-semibold shadow-glow hover:scale-105 transition">
              Book Now <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
            </Link>
            <Link to="/services" className="inline-flex items-center gap-2 px-7 py-4 rounded-full glass font-semibold hover:shadow-glow transition">
              Explore Trips
            </Link>
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span>Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }} className="w-px h-8 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </section>

      {/* STATS */}
      <section className="relative py-20 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { n: 5000, s: "+", l: "Riders Trained" },
            { n: 120, s: "+", l: "Guided Trips" },
            { n: 50, s: "k", l: "Kilometres" },
            { n: 4.9, s: "★", l: "Avg. Rating", float: true },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="font-display text-4xl md:text-6xl font-bold text-gradient">
                {s.float ? "4.9" : <Counter to={s.n} />}{s.s}
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="relative py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader eyebrow="What We Do" title="Built for every rider" desc="From the first wobble to the last switchback." />
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {[
              { icon: Bike, t: "Riding Lessons", d: "Master clutch, balance and control with certified trainers.", img: lessons },
              { icon: Gauge, t: "Scooty Training", d: "Beginner-friendly scooter classes for daily commute confidence.", img: scooty },
              { icon: Mountain, t: "Guided Trips", d: "Curated convoys through India's most legendary roads.", img: trips },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-3xl glass shadow-elevated">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={s.img} alt={s.t} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <div className="inline-flex p-3 rounded-2xl bg-ember-gradient text-primary-foreground mb-4">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold">{s.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
                  <Link to="/services" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED TRIP */}
      <section className="relative py-28 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="relative rounded-3xl overflow-hidden shadow-elevated">
              <img src={advanced} alt="Advanced rider" loading="lazy" className="w-full h-[520px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-background/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 glass rounded-2xl p-4">
                <div className="text-xs uppercase tracking-widest text-primary">Featured Trip</div>
                <div className="font-display text-2xl font-bold mt-1">Spiti Valley Expedition</div>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Why Choose Us</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">A community that rides with purpose.</h2>
            <p className="mt-6 text-muted-foreground">
              Certified trainers, mechanic-backed convoys, premium gear support, and routes designed by riders who've ridden them.
            </p>
            <ul className="mt-8 space-y-3">
              {["Certified instructors", "Mechanic-backed convoys", "Premium gear support", "Curated routes"].map((f, i) => (
                <li key={i} className="flex items-center gap-3"><Compass className="h-4 w-4 text-primary" /> {f}</li>
              ))}
            </ul>
            <Link to="/about" className="mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-full glass font-semibold hover:shadow-glow transition">
              About the club <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS PREVIEW */}
      <section className="py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader eyebrow="Voices" title="Loved by riders across India" desc="" />
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {[
              { n: "Arjun R.", t: "Best riding club I've joined. The Spiti trip was a life-changing experience." },
              { n: "Priya S.", t: "Learnt scooty as a complete beginner — patient trainers and a safe environment." },
              { n: "Rahul K.", t: "Their convoys are organized to perfection. Will ride with Nomad again and again." },
            ].map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass rounded-3xl p-7 shadow-elevated">
                <Quote className="h-6 w-6 text-primary mb-4" />
                <p className="text-sm text-muted-foreground leading-relaxed">"{r.t}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-ember-gradient flex items-center justify-center font-bold text-primary-foreground">{r.n[0]}</div>
                  <div>
                    <div className="font-semibold text-sm">{r.n}</div>
                    <div className="flex gap-0.5 mt-0.5">{Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-3 w-3 fill-primary text-primary" />)}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/testimonials" className="inline-flex items-center gap-2 text-primary font-semibold">See all reviews <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      {/* INSTA */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-primary mb-2">Follow the journey</div>
              <h2 className="font-display text-3xl md:text-4xl font-bold">@nomadbikersclub</h2>
            </div>
            <a href="https://www.instagram.com/nomadbikersclub" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass font-semibold hover:shadow-glow transition">
              <Instagram className="h-4 w-4" /> Follow
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[hero, trips, advanced, lessons, scooty, hero, trips, advanced].slice(0, 4).map((src, i) => (
              <a key={i} href="https://www.instagram.com/nomadbikersclub" target="_blank" rel="noreferrer"
                className="relative aspect-square overflow-hidden rounded-2xl group">
                <img src={src} alt="" loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition flex items-center justify-center">
                  <Instagram className="h-6 w-6 opacity-0 group-hover:opacity-100 transition" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="relative overflow-hidden rounded-[2.5rem] p-12 md:p-20 text-center glass shadow-elevated">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.72_0.21_45/0.25),transparent_70%)]" />
            <div className="relative">
              <h2 className="font-display text-4xl md:text-6xl font-bold">Your road is waiting.</h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Book a session or join the next convoy. Slots fill up fast.</p>
              <Link to="/booking" className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-ember-gradient text-primary-foreground font-semibold shadow-glow hover:scale-105 transition">
                Reserve your seat <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function SectionHeader({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="text-xs uppercase tracking-[0.3em] text-primary mb-3">{eyebrow}</div>
      <h2 className="font-display text-4xl md:text-5xl font-bold">{title}</h2>
      {desc && <p className="mt-4 text-muted-foreground">{desc}</p>}
    </div>
  );
}
