Quartz by default doesn't allow RTL languages.
Changing the language of the whole website with one single line of code to RTL means I don't get to write English/Dutch on the same website. forcing the whole Quartz page to `rtl` is the wrong model.
This fix was conducted with the help of chatgpt.

Note: this allows the website to write arabic/english/dutch each with respect to its direction but HTML needs an **empty line** in between every language change
# 1. Turn on Obsidian-style line breaks
In `quartz.config.ts`: add `Plugin.HardLineBreaks()` like this
import * as Plugin from "./quartz/plugins"

```ts
export default {
  plugins: {
    transformers: [
      Plugin.Frontmatter(),
      Plugin.CreatedModifiedDate(),
      Plugin.SyntaxHighlighting(),
      Plugin.ObsidianFlavoredMarkdown(),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks(),
      Plugin.Description(),
      Plugin.Latex(),
	  Plugin.HardLineBreaks(),   <<<< THIS IS WHAT I ADDED
    ],
  },
}
```
# 2. Do **automatic direction per block**, globally
**Create** a small client script, for example: `quartz/components/scripts/bidi.inline.ts`

**Add this code in it:**
```ts
document.addEventListener("nav", applyBidi)
document.addEventListener("DOMContentLoaded", applyBidi)

function applyBidi() {
  const selectors = [
    "article p",
    "article li",
    "article h1",
    "article h2",
    "article h3",
    "article h4",
    "article h5",
    "article h6",
    "article blockquote",
    "article td",
    "article th",
    "article .callout-content p",
    "article .callout-content li",
  ]

  document.querySelectorAll<HTMLElement>(selectors.join(",")).forEach((el) => {
    el.setAttribute("dir", "auto")
  })
}
```

Then attach that script through a tiny custom component `quartz/components/BidiAuto.tsx`
**You create the file** then **add** this code:
```tsx
// @ts-ignore
import script from "./scripts/bidi.inline"
import { QuartzComponentConstructor } from "./types"

const BidiAuto: QuartzComponentConstructor = () => {
  function BidiAutoComponent() {
    return null
  }

  BidiAutoComponent.afterDOMLoaded = script
  return BidiAutoComponent
}

export default BidiAuto
```

## Then
**Open:** `quartz/components/index.ts`
Add your component export.
```ts
export { default as BidiAuto } from "./BidiAuto"
```

Then open the layout file: 

Open: `quartz.layout.ts` 
In **`sharedPageComponents.afterBody`** which is this class `export const sharedPageComponents: SharedLayout` add `Component.BidiAuto()` so it becomes

```ts
import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [Component.BidiAuto()],                       >>>>> I ADDED THIS
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}
```
# 3. Use logical alignment in CSS
In `quartz/styles/custom.scss`
Add:
```css
article p,
article li,
article h1,
article h2,
article h3,
article h4,
article h5,
article h6,
article blockquote,
article td,
article th {
  text-align: start;
}
```
