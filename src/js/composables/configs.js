export async function restoreConfigs() {
  console.log("Restoring configs")
  const theme = localStorage.getItem("theme")
  if (theme) {
    const root = document.querySelector(":root")
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
  }
}
