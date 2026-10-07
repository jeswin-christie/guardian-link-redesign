/* The page scripts used to run at the end of <body>, before the window's
   load event. Under Next.js they start after hydration, by which time load
   may already have fired; this runs `fn` on load either way. */

export function onLoad(fn) {
  if (document.readyState === 'complete') window.setTimeout(fn, 0);
  else window.addEventListener('load', fn);
}
