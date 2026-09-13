# DesignLab Premium UI System — v3.14.0

## Design direction

Creative studio × editorial portfolio × restrained premium product polish.

The system intentionally avoids:
- decorative blobs
- large SaaS-style card collections
- exaggerated parallax
- bouncing animations
- excessive gradients
- excessive shadows

## Core tokens

Defined in `premium.css`:

- `--premium-page`
- `--premium-gutter`
- `--premium-section`
- `--premium-text`
- `--premium-muted`
- `--premium-blue`
- `--premium-radius-*`
- `--premium-shadow-*`
- `--premium-*` motion durations / easing

## Motion

The site uses:
- 10px initial page movement
- 22px section reveal movement
- 14px staggered child movement
- cubic-bezier(.22, 1, .36, 1)
- subtle 1.0–1.045 image scale only on deliberate hover states

`prefers-reduced-motion` disables these transitions.

## Important

This release does not change Supabase, Apps Script, inquiries, downloads data,
or authentication architecture.
