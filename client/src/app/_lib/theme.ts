function applyTheme(): void {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}
export function applyLightTheme(): void {
  localStorage.theme = "light";
  applyTheme();
}

export function applyDarkTheme(): void {
  localStorage.theme = "dark";
  applyTheme();
}

export function applySystemTheme(): void {
  localStorage.removeItem("theme");
  applyTheme();
}
