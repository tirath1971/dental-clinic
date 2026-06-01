# Shining Pearls Dental Clinic

A clean, clinical booking + patient-facing website with a staff dashboard, built
as a runnable front-end demo. Bookings are persisted to **localStorage** (a mock
backend) so the whole flow works with no server.

> Palette: white / off-white surfaces, clinical blue (`#0EA5E9` → `#2563EB`),
> soft mint accent (`#5EEAD4`), slate-700 text. Display font **Sora**, body
> **Inter**. Pearl/shine motif throughout.

---

## ✨ Features

- **Home** — interactive 3D tooth hero (react-three-fiber, glossy pearl enamel,
  slow auto-rotate that pauses on hover, subtle float), services grid with
  glossy "3D-look" icons, doctor profiles, testimonials + a before/after image
  comparison slider.
- **Booking flow** — 4-step wizard (service → dentist → date & time → details →
  confirmation) with validation, **double-booking prevention**, and a friendly
  success screen.
- **Clinic dashboard** (`/dashboard`) — sidebar nav, overview stat cards, a
  weekly appointments bar chart, and a filterable appointments table with
  confirm / complete / cancel actions.
- **Quality** — mobile-first responsive, semantic HTML, ARIA labels, keyboard
  navigation, visible focus states, and full `prefers-reduced-motion` support
  (the 3D canvas falls back to a static image).

## 🧱 Tech stack

React + Vite + TypeScript · Tailwind CSS · React Router · Three.js
(`@react-three/fiber` + `@react-three/drei`) · Framer Motion · lucide-react.

## 🚀 Getting started

Requires **Node 18+**.

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
```

Other scripts:

```bash
npm run build    # type-check + production build to /dist
npm run preview  # preview the production build locally
npm run lint     # type-check only (tsc --noEmit)
```

## 📁 Project structure

```
src/
  components/
    layout/      Navbar, Footer, PublicLayout
    ui/          Button, Card, Input, Select, Textarea, Badge, StatusPill, Logo…
    three/       HeroTooth (lazy + fallback), ToothCanvas, ToothModel
    icons/       ServiceIcon3D (glossy gradient SVG icons)
    home/        Hero, ServicesGrid, ServiceCard, TeamSection, DoctorCard,
                 Testimonials, BeforeAfterSlider, TrustStrip
    booking/     BookingWizard + the 5 step components, StepIndicator
    dashboard/   DashboardLayout, Sidebar, StatCard, WeeklyChart,
                 TableFilters, AppointmentsTable
  data/seed.ts   Services, doctors (incl. Dr. Charu Gandhi), demo appointments,
                 clinic contact/hours
  hooks/         useAppointments, usePrefersReducedMotion
  lib/           storage (mock backend), booking (slots/validation), cn
  pages/         HomePage, BookingPage, DashboardPage, NotFoundPage
  types/         Service, Doctor, Appointment, PatientInfo, AppointmentStatus
public/          favicon, tooth-fallback, doctor + before/after placeholders
```

## 🗃️ Data model (mock)

```ts
Service     { id, name, description, durationMins, icon, fromPrice }
Doctor      { id, name, specialty, bio, photo, yearsExperience }
Appointment { id, serviceId, doctorId, date, timeSlot,
              patient: { name, email, phone, notes? }, status, createdAt }
```

`status` is one of `pending | confirmed | completed | cancelled`.

## 🖼️ Swapping in real assets

All placeholders live in `public/` and are referenced by path, so they're easy
to replace:

- **Doctor photos** — `public/doctors/*.svg`. Update the `photo` field in
  `src/data/seed.ts` to point at your real images (any format).
- **Before/after cases** — `public/cases/case-1-*.svg`, referenced in
  `src/components/home/Testimonials.tsx`.
- **Hero tooth** — currently procedural geometry in
  `src/components/three/ToothModel.tsx` (no asset needed). To use a real model,
  load a `.glb` with drei's `useGLTF` inside `ToothCanvas.tsx`.
- **Static hero fallback** — `public/tooth-fallback.svg`.

## 🔌 Plugging in a real backend later

The mock backend is intentionally isolated in **`src/lib/storage.ts`**. Every
data operation goes through these functions:

| Function | Replace with |
| --- | --- |
| `getAppointments()` | `GET /appointments` |
| `createAppointment(input)` | `POST /appointments` |
| `updateAppointmentStatus(id, status)` | `PATCH /appointments/:id` |
| `isSlotTaken(doctorId, date, slot)` | server-side availability check |
| `subscribe(listener)` | websocket / polling / React Query invalidation |

Recommended path:

1. Make the `storage.ts` functions `async` and have them call your API.
2. Swap `useAppointments` (currently `useSyncExternalStore`) for your data
   library of choice (e.g. **TanStack Query**) — the component API stays the same.
3. Move slot-availability validation server-side and surface a 409 on conflict;
   the UI already handles a `SlotTakenError` gracefully.
4. Add real auth in front of `/dashboard` (it's an open route in this demo).

Seed data in `src/data/seed.ts` can then be deleted or used only for tests.

## ♿ Accessibility & performance notes

- The Three.js canvas is **lazy-loaded** in its own bundle chunk and only
  mounts when motion is allowed; otherwise a static SVG renders.
- The before/after comparison is a real `<input type="range">`, so it's
  keyboard-operable and screen-reader friendly.
- Interactive elements have hover, `focus-visible`, and active states; a
  "Skip to content" link is provided.

---

Built as a demo — placeholder content throughout, ready for real assets and a
real API.
