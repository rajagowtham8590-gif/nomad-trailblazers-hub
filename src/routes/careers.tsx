import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { z } from "zod";
import { CheckCircle2, Send, Heart, Users, Compass } from "lucide-react";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Nomad Bikers Club" },
      { name: "description", content: "Join Nomad Bikers Club as a women trainer. Help us make the road an equal space for women across India." },
      { property: "og:title", content: "Careers — Ride with us" },
      { property: "og:description", content: "Become a Nomad trainer. For women, by women." },
    ],
  }),
  component: Careers,
});

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  phone: z.string().trim().regex(/^[+\d\s-]{8,15}$/, "Enter a valid phone"),
  city: z.string().trim().min(2, "Enter your city").max(80),
  email: z.string().trim().email("Enter a valid email").max(160),
  instagram: z.string().trim().min(1, "Share your IG handle").max(60),
  experience: z.coerce.number().min(0, "Enter years").max(60),
});

const inputCls = "w-full px-4 py-3.5 rounded-xl bg-secondary/60 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition placeholder:text-muted-foreground/60";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{label}</div>
      {children}
      {error && <div className="text-xs text-destructive mt-1">{error}</div>}
    </label>
  );
}

function Careers() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const r = schema.safeParse(data);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach(i => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); (e.target as HTMLFormElement).reset(); }, 900);
  }

  return (
    <>
      <section className="pt-32 sm:pt-40 pb-10 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Careers</div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold">Ride with us. <br /><span className="text-gradient">Train with us.</span></h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground">
            We're looking for women riders with geared-bike experience to join our trainer community. Help us make the road an equal space.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 grid sm:grid-cols-3 gap-4">
          {[
            { i: Heart, t: "Do work that matters", d: "Empower women to take the road on their own terms." },
            { i: Users, t: "Join a sisterhood", d: "A tight-knit community of women trainers across 24+ cities." },
            { i: Compass, t: "Flexible & rewarding", d: "Schedule batches and PT sessions around your life." },
          ].map((v, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-5">
              <div className="inline-flex p-3 rounded-xl bg-ember-gradient text-primary-foreground mb-3"><v.i className="h-5 w-5" /></div>
              <div className="font-display text-lg font-bold">{v.t}</div>
              <p className="text-sm text-muted-foreground mt-1">{v.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <motion.form onSubmit={onSubmit} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            className="glass rounded-3xl p-6 md:p-10 shadow-elevated space-y-5">
            <h3 className="font-display text-2xl font-bold">Apply to become a trainer</h3>
            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Full name" error={errors.name}><input name="name" className={inputCls} placeholder="Your name" /></Field>
              <Field label="Mobile number" error={errors.phone}><input name="phone" className={inputCls} placeholder="+91 9XXXXXXXXX" /></Field>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <Field label="City located in" error={errors.city}><input name="city" className={inputCls} placeholder="Bangalore" /></Field>
              <Field label="Email" error={errors.email}><input name="email" type="email" className={inputCls} placeholder="you@example.com" /></Field>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Instagram handle" error={errors.instagram}><input name="instagram" className={inputCls} placeholder="@yourhandle" /></Field>
              <Field label="Years riding a geared bike" error={errors.experience}><input name="experience" type="number" min={0} step={1} className={inputCls} placeholder="3" /></Field>
            </div>
            <button disabled={loading} className="w-full inline-flex justify-center items-center gap-2 px-6 py-4 rounded-full bg-ember-gradient text-primary-foreground font-semibold shadow-glow hover:scale-[1.02] transition disabled:opacity-60">
              {loading ? "Sending..." : <>Submit application <Send className="h-4 w-4" /></>}
            </button>
          </motion.form>
        </div>

        <AnimatePresence>
          {done && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[70] flex items-center justify-center bg-background/80 backdrop-blur p-6">
              <motion.div initial={{ scale: 0.85, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }}
                className="glass rounded-3xl p-10 text-center max-w-md shadow-elevated">
                <div className="inline-flex p-4 rounded-full bg-ember-gradient mb-4 shadow-glow">
                  <CheckCircle2 className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="font-display text-3xl font-bold">Application received</h3>
                <p className="mt-3 text-muted-foreground">Thanks for applying. Our team will reach out within 5 working days.</p>
                <button onClick={() => setDone(false)} className="mt-6 px-6 py-3 rounded-full glass font-semibold">Close</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}