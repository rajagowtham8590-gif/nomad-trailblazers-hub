# Deploying this project to Vercel

This project is wired for **Cloudflare Workers** by default (via
`@lovable.dev/vite-tanstack-config`, `@cloudflare/vite-plugin`, `wrangler.jsonc`,
and `src/server.ts`). Vercel cannot serve that output — every route returns
`404: NOT_FOUND` because no handler is registered for `/`.

Apply these changes **on a separate branch in your local clone** (not in
Lovable — they will break the Lovable preview).

---

## 1. Remove Cloudflare-specific files & deps

```bash
rm wrangler.jsonc
rm src/server.ts          # Vercel preset generates its own entry
bun remove @lovable.dev/vite-tanstack-config @cloudflare/vite-plugin wrangler
bun add -D @tanstack/react-start vite @vitejs/plugin-react @tailwindcss/vite vite-tsconfig-paths
```

## 2. Rewrite `vite.config.ts` for the Vercel target

```ts
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart({
      target: "vercel",          // <-- THE critical line
      customViteReactPlugin: true,
    }),
    viteReact(),
  ],
});
```

`target: "vercel"` makes TanStack Start emit `.vercel/output/` in the
Build Output API v3 format Vercel expects (with `config.json` routing
`/(.*)` to a serverless function). Without it, Vercel finds no handler and
returns `NOT_FOUND` for every path.

## 3. Add `vercel.json`

```json
{
  "buildCommand": "vite build",
  "outputDirectory": ".vercel/output",
  "framework": null
}
```

Set Framework Preset to **Other** in the Vercel dashboard so it doesn't
auto-detect Vite SPA and override these settings.

## 4. Environment variables

In Vercel → Project → Settings → Environment Variables, add **every**
`VITE_*` and server-only var your app uses. Missing
`VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY` will throw during SSR
(500, not 404 — but still broken).

---

## 5. Verify Vercel found the server entry (this is what fixes the 404)

After `git push`, **before** opening the live URL, walk this checklist. The
`NOT_FOUND` screen always means one of these is wrong.

### 5a. Build log

In the Vercel deployment's **Build Logs**, look for:

```
✓ built in ...
Build Output API v3 detected
```

If "Build Output API v3 detected" is missing, `target: "vercel"` didn't
apply. Re-check `vite.config.ts` and that `@cloudflare/vite-plugin` is gone.

### 5b. Functions tab

Open the deployment → **Functions** tab. You should see one serverless
function (usually `_server` or `index`). Empty tab = no SSR handler emitted
= Vercel is serving only static assets, which is why `/` returns 404.

### 5c. Inspect `.vercel/output/config.json` locally

```bash
vite build
cat .vercel/output/config.json
```

Expected (catch-all forwarding to the function):

```json
{
  "version": 3,
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/_server" }
  ]
}
```

No `routes` entry, or no `.vercel/output/` folder at all = `target: "vercel"`
didn't run.

### 5d. Hit the deployed function directly

```bash
curl -i https://<your-deployment>.vercel.app/
```

- `200 OK` + HTML → SSR works, done.
- `404 NOT_FOUND` + Vercel JSON → step 5b failed; function isn't registered.
- `500` + stack trace → SSR ran but threw. Check **Runtime Logs** for the
  real error (usually a missing env var).

### 5e. Project Settings sanity check

Vercel → Settings → General:

| Setting           | Value                       |
| ----------------- | --------------------------- |
| Framework Preset  | Other                       |
| Build Command     | `vite build`                |
| Output Directory  | `.vercel/output`            |
| Install Command   | `bun install` (or default)  |
| Node.js Version   | 20.x or higher              |

If "Output Directory" is left at `dist` (Vite default), Vercel ignores
`.vercel/output/` and serves only the static client bundle — that produces
the exact 404 screen you saw.

---

## Keeping Lovable + Vercel in sync

Keep this migration on a dedicated branch (e.g. `vercel`). Lovable pushes to
`main`. To pull new Lovable changes:

```bash
git checkout vercel
git merge main          # resolve conflicts in vite.config.ts / package.json
git push
```

Never merge `vercel` back into `main` — it breaks the Lovable preview.
