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