// Route slugs + i18n keys + real public folder names
export const CATEGORIES = [
  { slug: "begravelse",        label: "navbar.categories.begravelse",        dir: "begravelse" },
  { slug: "bestselger",        label: "navbar.categories.bestselger",        dir: "bestselger" },
  // Slug vs folder name:
  { slug: "bryllupsbuketter",  label: "navbar.categories.bryllupsbuketter",  dir: "bryllups-buketter" },
  { slug: "bursdagsbuketter",  label: "navbar.categories.bursdagsbuketter",  dir: "bursdags-buketter" },
  { slug: "dekorasjoner",      label: "navbar.categories.dekorasjoner",      dir: "dekorasjoner" },
  { slug: "rosebuketter",      label: "navbar.categories.rosebuketter",      dir: "rosebuketter" },
  { slug: "julebuketter",      label: "navbar.categories.julebuketter",      dir: "julebuketter" },
];

// Recognized extensions (case-insensitive)
export const MEDIA_EXTENSIONS = [
  ".jpg",".jpeg",".png",".webp",".gif",".mp4",".mov",".webm",".m4v",
  ".JPG",".JPEG",".PNG",".WEBP",".GIF",".MP4",".MOV",".WEBM",".M4V"
];
