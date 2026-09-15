# DesignLab Portfolio Website — Changelog

## v3.16.21 — Clients Page + Trusted Brands Logo Wall

- restored the floating hero posters on normal desktop/laptop viewports; v3.16.19 had a global responsive rule that hid the entire floating layer at ≤1100px width or ≤700px height
- retained the collision guard so an individual floating poster can still hide itself if it would overlap live hero content
- moved the detailed Clients section into a new `clients.html` page
- changed the shared navbar Clients link to the new Clients page across public pages
- simplified the homepage client section to **Trusted by brands.** with a seamless, borderless logo grid
- reordered homepage clients to prioritize Catch of the Day, Ion Ready Distribution Group, and SoleProtect, with Panpacific University last
- pre-wired future local WebP logo paths for COTD, Ion Ready, and MyITHub; text wordmarks appear automatically until those files are added
- kept existing C&B Cafe, SoleProtect, and Panpacific University local logos

### Future logo filenames
Place these files in `assets/` when ready:
- `client-cotd.webp`
- `client-ion-ready.webp`
- `client-myithub.webp`

No JavaScript changes will be required after adding those three files.


- Added grayscale local WebP logo assets for Catch of the Day, Ion Ready Distribution Group, and MyITHub Australia.
