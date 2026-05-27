# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- Install dependencies: `npm install`
- Run the server: `node server.js` (listens on `http://localhost:3000`)
- No test, build, or lint scripts are configured.

## Architecture

This is a small Express app with a static front end. There is no framework, bundler, or build step — files in `public/` are served as-is and `server.js` is run directly with Node (ESM, `"type": "module"`).

**Request flow for sky map generation** (the only non-trivial path in the app):

1. User fills the form on `public/skymap.html` and clicks the search button, which calls `validateAndUpdateDetails()` in `public/nightsky.js`.
2. The browser calls the public Nominatim geocoding API directly (`nominatim.openstreetmap.org`) to turn the city name into lat/lon.
3. The browser then POSTs to `http://localhost:3000/proxy/star-chart` on our own server.
4. `server.js` forwards that body to the Astronomy API (`api.astronomyapi.com/api/v2/studio/star-chart`) with a hardcoded Basic auth header and returns the JSON to the client.
5. The client reads `data.imageUrl` from the response and sets it as the `src` of the `.skyChart` `<img>`.

The proxy exists because the Astronomy API requires Basic auth credentials that cannot be exposed in the browser. The Nominatim call has no such requirement and is made client-side.

The front-end script URL is hardcoded to `http://localhost:3000/proxy/star-chart` in `public/nightsky.js` — if you change the port or host, update that fetch URL too.

## Things to know

- **Credentials are committed in `server.js`.** The Astronomy API key is hardcoded as a base64-encoded `id:secret` string in `authString`. Treat this as known and do not rotate/remove without coordinating with the user.
- **No environment variable support.** Port (3000) and credentials are literals in `server.js`.
- **Tailwind comes from a CDN** (`tailwindcss/2.2.19`) in the HTML files — there is no Tailwind config or PostCSS pipeline. Same for `html2pdf.js`.
- **DOM coupling is by class name, not id.** `nightsky.js` queries elements like `.myName`, `.yourName`, `.skyChart`, `.night`, `.search` — renaming these classes in HTML will silently break the form.
- **`skymap.html` ships with placeholder content** (names "Matia & Sonia", date "23rd January 2023", etc.) inside `.night`. That block is hidden until `updateDetails()` runs and overwrites the text.
- **ESM is required**: use `import`, not `require`. `__dirname` is reconstructed via `path.resolve()` in `server.js`.
