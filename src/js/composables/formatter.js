export function periodFormatter(date) {
  return date?.toISOString()
    .replace(/(\d+)-(\d+)-.*/, "$1-$2") || "..."
}

export function dayFormatter(date) {
  return date?.toISOString()
    .replace(/(\d+)-(\d+)-(\d+)T.*/, "$1-$2-$3") || "..."
}
