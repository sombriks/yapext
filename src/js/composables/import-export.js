import {dayFormatter, monthFormatter} from "./formatter.js"
import {Directory, Encoding, Filesystem} from "@capacitor/filesystem"
import {Capacitor} from "@capacitor/core"
import {saveEntry} from "./entries.js"
import {findOrCreateCategory} from "./categories.js";
import {findOrCreateAccount} from "./accounts.js";

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
  const name = `yapext-data-${monthFormatter(date)}.csv`;
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

export async function fromCSV(csv, date = new Date()) {
  for (let line of csv.split("\n")) {
    try {
      const cell = line.trim().split(/[;,]/)
      const dueDate = cell[0]?.trim() || date
      const category = cell[1]?.trim() || "Other"
      const account = cell[2]?.trim() || "Other"
      const amount = cell[3]?.trim()
      const description = cell[4]?.trim() || "No description"
      await importEntry({
        dueDate, category, account,  amount, description
      })
    } catch (e) {
      console.log(e)
      console.log("failed to import", line)
    }
  }
}

async function importEntry({dueDate, category, account,  amount, description}) {
  const entry = {
    dueDate: parseDateOrFail(dueDate),
    categories_id: (await findOrCreateCategory(category)).id,
    accounts_id: (await findOrCreateAccount(account)).id,
    amount: parseFloatOrFail(amount),
    description
  }
  await saveEntry(entry)
  console.log(entry)
}

function parseDateOrFail(d) {
  d = d.split("-")
  return new Date(d[0], d[1] - 1, d[2])
}

function parseFloatOrFail(f) {
  f = parseFloat(f)
  if(isNaN(f)) throw f
  return f
}
