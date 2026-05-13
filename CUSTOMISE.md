# V4 Customisation Guide

## Main files
```text
src/config/mission.js
src/styles.css
src/assets/rajasthan-satellite-base.jpeg
```

## Change top essentials
Edit `essentials` in `src/config/mission.js`.

## Change action buttons
Edit `actionPanel` in `src/config/mission.js`.

## Change target paths
Edit `movingTargets[].path`.

Higher x = right. Lower x = left. Higher y = down. Lower y = up.

## Change node locations
Edit `assets[].x` and `assets[].y`.

## Change display height
In `src/styles.css`, edit:
```css
.mission-display { min-height: 740px; }
```

## Change panel transparency
In `src/styles.css`, edit:
```css
--panel: rgba(8,11,15,.74);
```
Lower `.74` makes it more transparent. Higher makes it darker.

## Change map brightness
In `src/styles.css`, edit:
```css
.satellite-img { filter: saturate(.92) contrast(1.08) brightness(.78); }
```
