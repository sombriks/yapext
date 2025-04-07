import {dayFormatter, periodFormatter} from "./formatter.js";
import {Directory, Encoding, Filesystem} from "@capacitor/filesystem";
import {Capacitor} from "@capacitor/core";

export function joinData({entries, categories, accounts}) {
  entries.forEach(entry => {
    entry.category = categories
      .find(category => entry.categories_id === category.id)
    entry.account = accounts
      .find(account => entry.accounts_id === account.id)
  })
}

export function toCSV(entries) {
  // due-date, category, account, value, description
  return entries.reduce((acc, entry) => {
    return acc + dayFormatter(entry.dueDate) + ";"
      + entry.category?.description + ";"
      + entry.account?.description + ";"
      + entry.amount + ";"
      + entry.description + "\n";
  }, "dueDate;category;account;value;description\n")
}

export async function saveFile({file, date}) {
  const name = `yapext-data-${periodFormatter(date)}.csv`;
  if(Capacitor.getPlatform() === "web") {
    // for web
    const blob = new Blob([file])
    const _file = new File([blob], name, {type: 'text/csv'})
    window.open(URL.createObjectURL(_file), "_blank")
  } else {
    // for mobile
    await Filesystem.writeFile({
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
      recursive: true,
      path: name,
      data: file
    })
    alert(`File saved in Documents!`)
  }
}

export async function fromCSV(csv) {
  console.log(csv)
}
