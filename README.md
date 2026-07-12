# olivermann.studio

Personal portfolio site for Oliver Mann: communications portfolio, photography portfolio, and blog. Built with [Astro](https://astro.build), hosted free on GitHub Pages, deployed automatically by GitHub Actions on every push to `main`.

**You never need to run code to update this site.** Everything below happens in GitHub's web editor. After every commit, the site rebuilds and republishes itself in about 2 minutes (check the **Actions** tab for progress).

---

## 1. Add a new blog post

Every post is one folder inside `src/content/blog/`, holding an `index.md` file and the post's images.

**Step 1.** In the repo, click **Add file → Create new file**.

**Step 2.** In the filename box, type the full path, for example:

```
src/content/blog/my-new-post/index.md
```

Typing a `/` in the filename box creates a folder. The folder name becomes the post's web address (`olivermann.studio/blog/my-new-post`), so keep it kebab-case: lowercase, hyphens, no spaces.

**Step 3.** Paste in the post content (front matter + body), then click **Commit changes** (commit directly to `main`).

**Step 4.** If the post has images: open the new folder, click **Add file → Upload files**, drag the images in, and commit. Two commits (text first, then images) is fine; the site just rebuilds twice.

### Post template

```markdown
---
title: "My Post Title"
date: 2026-08-01
types: [case-study]
draft: false
skillsTags: ["Email Marketing", "Analytics"]
heroImage: "./my-hero.jpg"
heroImageAlt: "Description of the hero image"
excerpt: "One or two sentences shown on cards and in the blog list."
featured: false
---

Body text goes here. Regular Markdown: paragraphs, **bold**, [links](https://example.com), images.
```

### Front matter fields

| Field | Required | Notes |
|---|---|---|
| `title` | yes | Always wrap in double quotes. |
| `date` | yes | Exactly `YYYY-MM-DD`, no quotes. Controls ordering. |
| `types` | yes | One or more of: `case-study`, `writing`, `video`, `podcast`, `research`, `speaking`, `indigenous-engagement`. Drives the blog filter tabs and home page sections. A post can have several, e.g. `[podcast, indigenous-engagement]`. |
| `draft` | yes | `true` hides the post from the site entirely. Safe way to save works-in-progress. |
| `excerpt` | yes | Always wrap in double quotes. Shown on cards and in the blog list. |
| `heroImage` | no | Path to an image **in the same folder**, e.g. `"./hero.jpg"`. |
| `heroImageAlt` | with heroImage | Required whenever `heroImage` is set. |
| `heroVideoId` | no | YouTube video ID (the part after `youtu.be/`). Use instead of `heroImage` for video posts; the YouTube thumbnail becomes the card image. Never set both. |
| `externalLink` | no | If set, the post links straight out to this URL and **no page is created on the site**. Use for pieces published elsewhere (UBC stories, YouTube, etc.). |
| `role` | no | For speaking entries: `"Moderator"`, `"Speaker"`, etc. Shown on the card. |
| `skillsTags` | no | For case studies: the "Skills Demonstrated" pills at the end of the post. |
| `featured` | no | `true` puts the post in the home page "Featured Case Studies" block. |
| `featuredRank` | with featured | `1` = the big slot, `2`–`4` = the stacked slots. |

### Case study structure (STAR format)

For case studies, use this body structure to keep them short and interview-ready:

```markdown
## Situation

Two to three sentences: organization, context, challenge.

## Approach

- What you actually did.
- Channels, creative, timeline decisions.

## Result

- Outcome and impact, with stats.
```

Screenshots dropped into the body as Markdown images (`![caption](./screenshot.png)`) automatically open in the site's lightbox when clicked.

### YAML gotchas (most build failures come from these)

- **Always put `title` and `excerpt` in double quotes.** Unquoted colons or apostrophes break the front matter.
- Date format is exactly `YYYY-MM-DD`, unquoted.
- Folder and file names: kebab-case, lowercase, no spaces. The folder name becomes the URL.
- The three dashes `---` must appear alone on the first line and again after the last front-matter field.
- **If the build fails after committing:** open the **Actions** tab, click the failed run, and the log shows which file and field caused it. The previous version of the site stays live in the meantime; a failed build never takes the site down. Fix the file and commit again.

---

## 2. Add or edit photos on the Photography page

Photos are driven by one data file: `src/data/photos.yaml`. Image files live in `src/assets/photos/`.

**To add a photo:**

1. Export the image at web resolution: **about 2000px on the long edge, 85% JPEG quality. Never upload full-resolution originals** (this repo is public).
2. Go to `src/assets/photos/`, click **Add file → Upload files**, drag the image in, commit.
3. Open `src/data/photos.yaml`, click the pencil icon to edit, and add an entry:

```yaml
- src: "my-new-photo.jpg"
  alt: "Descriptive alt text: who or what is in the photo"
  category: portrait
  date: 2026-08-01
```

For event photos you can also add:

```yaml
  caption: "Event Name, August 2026"
  flickrAlbum: "https://www.flickr.com/photos/163166916@N03/albums/XXXXXXXXX/"
```

Notes:

- `category` must be exactly `portrait` or `event`.
- `date` is the date taken; the gallery is ordered newest first.
- `flickrAlbum` is only allowed on `event` photos. It adds the "View full album on Flickr" link in the lightbox.
- Every photo needs `alt` text. The build fails with a clear error if `alt` is missing or `category` has a typo, so mistakes can't silently break the page.

**To remove or recaption a photo:** edit its entry in `photos.yaml` (removing the entry hides the photo; you can also delete the image file). **To reorder:** change the `date` values.

---

## 3. Everything else

| Task | Where |
|---|---|
| Edit resume | `src/pages/resume.astro` (the text is plain HTML, edit carefully) |
| Edit home page hero roles | `src/pages/index.astro`, the `roles` list in the script at the bottom |
| Footer email/social links | `src/layouts/BaseLayout.astro` |
| Custom domain | `public/CNAME` (also set in the repo's Pages settings) |

## Local development (optional, not required)

```bash
npm install
npm run dev      # local preview at localhost:4321
npm run build    # production build into dist/
```
