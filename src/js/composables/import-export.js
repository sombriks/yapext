import {dayFormatter} from "./formatter.js";

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
