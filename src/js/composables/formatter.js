export function monthFormatter(date) {
  return date?.toISOString()
    .replace(/(\d+)-(\d+)-.*/, "$1-$2") || "..."
}

export function dayFormatter(date) {
  return date?.toISOString()
    .replace(/(\d+)-(\d+)-(\d+)T.*/, "$1-$2-$3") || "..."
}

export function moneyFormatter(amount = 0) {
  return Intl.NumberFormat(navigator.language, {
    style: "currency", currency: 'USD' // TODO check locale
  }).format(amount);
}
