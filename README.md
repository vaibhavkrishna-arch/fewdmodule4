# Brightday Tasks

A small task tracker built with plain HTML, CSS, and TypeScript.

## Run locally

1. Install TypeScript if needed: `npm install --global typescript`
2. Compile: `tsc`
3. Open `index.html` in a local static server (recommended: `npx serve .`).

The browser loads the committed JavaScript files (`app.js` and `model.js`), not TypeScript.

## Deploy with GitHub Pages

1. Push this project to your public GitHub repository.
2. In **Settings → Pages**, select **Deploy from a branch**, choose `main` and `/ (root)`, then save.
3. Wait for the Pages URL shown in Settings → Pages.

## Pull request checklist

- [ ] Create a branch such as `part-2-ui-ship`.
- [ ] Run `tsc` and confirm there are no errors.
- [ ] Test add, advance, and all four filters.
- [ ] Deploy and test the live URL on another device/browser.
- [ ] Open a PR into `main` and include both the repository URL and live URL in its description.

This is a standalone starter implementation. If Part 1 used different model exports or field names, merge those names into `app.ts` rather than replacing your original model contract.
