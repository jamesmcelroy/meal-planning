# Family Dinners app — setup guide

This covers the handful of steps only you can do (they require your own Google login and your own GitHub account). Everything else is already built.

## 1. Create a free Firebase project (~5 minutes)

1. Go to https://console.firebase.google.com and sign in with any Google account.
2. Click **Add project**. Name it something like `family-dinners` (the name doesn't matter, it's just a label).
3. Decline Google Analytics when asked (not needed for this app) — click **Create project**.
4. Once created, on the project's home screen click the **</>** (web) icon to register a new web app.
5. Give it a nickname (e.g. "Family Dinners Web"), leave "Firebase Hosting" unchecked (we're using GitHub Pages instead), click **Register app**.
6. Firebase will show you a code snippet with a `firebaseConfig` object — a block of `apiKey`, `authDomain`, `projectId`, etc. Copy those six values.
7. Open `firebase-config.js` in the app files and paste your six real values in place of the `"YOUR_..."` placeholders. Save.

## 2. Turn on Firestore (the database)

1. In the Firebase console left sidebar, click **Build > Firestore Database**.
2. Click **Create database**. Choose **Start in production mode**. Pick any nearby region (e.g. `us-east1`) — doesn't matter much for your family's size.
3. Once created, click the **Rules** tab at the top.
4. Delete what's there and paste in the contents of `firestore.rules` (included in the app files). Click **Publish**.

That's it for Firebase — no billing setup needed, this stays free at your usage level indefinitely (Firestore's free tier is far beyond what a family rating dinners will ever use).

## 3. Add the app files to your GitHub repo

Your existing `meal-planning` repo already hosts your recipe HTML files for AnyList. We're adding the app alongside them in the same repo, since GitHub Pages will serve everything from one place.

Go to **github.com/jamesmcelroy/meal-planning**, click **Add file > Upload files**, and drag in everything from this zip:
- `index.html`
- `manifest.json`
- `sw.js`
- `firebase-config.js` (with your real values filled in from step 1)
- `recipes.json`
- the `icons/` folder (all 3 files)
- `SETUP.md` and `firestore.rules` (reference docs, not used by the app itself, but handy to keep in the repo)
- the recipe files: `sheet-pan-sausage-roasted-veggies.html`, `shrimp-stir-fry.html`, `chicken-tacos.html`, `pasta-garlic-oil-parmesan.html`, `ny-strip-steak.html`, `soy-ginger-glazed-salmon.html`, `chicken-stir-fry-hoisin.html`, `burgers-bagged-salad.html`

Note: the recipe files have been renamed from their old day-based names (e.g. `friday-ny-strip-steak.html` is now `ny-strip-steak.html`) since recipes aren't tied to a specific day anymore. Your old files (`monday-sheet-pan-sausage.html`, etc.) will still exist in the repo alongside the new ones — GitHub's upload won't delete them automatically. Once everything below is confirmed working, you can delete the old day-named `.html` files from the repo (click each one on GitHub, then the trash icon) — just re-import any of those into AnyList first if you'd lose an in-progress import link.

Commit the upload. If GitHub Pages is already turned on for this repo (it must be, since your recipes are already viewable at `jamesmcelroy.github.io/meal-planning/`), the app will automatically be live at:

**https://jamesmcelroy.github.io/meal-planning/**

## 4. Add it to your family's iPhones

On each phone, in **Safari** (must be Safari, not Chrome, for this to work on iOS):
1. Visit `https://jamesmcelroy.github.io/meal-planning/`
2. Tap the **Share** button (square with an arrow)
3. Scroll down, tap **Add to Home Screen**
4. Tap **Add**

It'll now appear as an app icon and open full-screen, no browser bar.

## Notes on the "Tonight" tab

The Tonight tab lets anyone set which recipe is being cooked that day (a "What are we having tonight?" picker) and then rate it right away, without hunting through the Recipes tab. It stores one document per date in a `menu` collection in Firestore, so it also builds up a simple history of recent dinners as you go. No extra setup needed beyond what's already above — the `firestore.rules` file already includes a rule for the `menu` collection.

## Notes on names

The family member names are hard-coded in `index.html` near the top of the `<script>` block:

```js
const FAMILY_MEMBERS = ["James", "Roisin", "Colbie", "Bryce", "Gage"];
```

If your family roster ever changes, edit that one line and redeploy — no other code changes needed.
