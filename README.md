# Drone Network Mission Dashboard V4 — Satellite Baseline + Interlock Panel

This version uses the uploaded satellite-style map image as the centre screen background and adds a top essentials strip plus simulated interlock/action buttons.

## New in V4
- Satellite image integrated into the central display
- Transparent tactical panels around the centre screen
- Essentials strip: Target Locked, Kamikaze Strike Sim Active, ROE Status Cleared, Human Review Required
- Action rail: Strike, Call Out, Return Home, Abort
- Moving targets and target trails over the uploaded map image
- AI/ROE analysis and fusion panels

## Safety Boundary
This is a visual educational simulation only. It does not include real drone control, targeting, firing, payload, release, navigation, coordinates, or autonomous weapon logic.

## Run
```bash
npm install
npm run dev
```

Open:
```text
http://localhost:5173/
```

## Customise
Edit:
```text
src/config/mission.js
src/styles.css
```

To replace the image, replace:
```text
src/assets/rajasthan-satellite-base.jpeg
```
