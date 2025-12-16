# AllWorkChatbot

A small Node/Express frontend project that serves a few assistant HTML pages and a static `public/` folder. This repository contains simple client-side assistant pages and a minimal Express server.

## Features
- Two assistant pages: `assistant.html` and `assistant2.html`
- Static site files under `public/` (includes `index.html`, `script.js`, and duplicates of the assistant pages)
- Minimal Express server in `server.js` to serve the static files

## Prerequisites
- Node.js (v16+ recommended)

## Install
Run the following to install dependencies:

```bash
npm install
```

## Run
This project does not define a `start` script in `package.json`. To run the server locally, use one of the commands below depending on your environment:

```bash
# run with node
node server.js

# or with npm (create a start script first):
# add to package.json under "scripts": { "start": "node server.js" }
# then run:
npm start
```

## Project Structure

- `assistant.html` — root-level assistant page
- `assistant2.html` — alternate assistant page
- `package.json` — project manifest
- `server.js` — minimal Express server to serve `public/` and root pages
- `public/` — static assets and copy of assistant pages

## Notes
- `package.json` currently contains only a `test` script. Add a `start` script if you want to launch via `npm start`.
- Update the README with any project-specific environment variables or configuration if you add them (for example `.env` values used by `server.js`).

## License
This project does not include a license. Add one if you intend to publish or share this project publicly.
