import Dexie from "dexie"

const db = new Dexie("yapext")

export const initDB = async () => {
  db.version(1).stores({
    categories: "++id,description",
    accounts: "++id,description",
    entries: "++id,categories_id,accounts_id"
  })
  db.on("populate", tx => {
    return Promise.all([
      tx.table("accounts").bulkAdd([
        {color: "#0000FF", description: "Default Wallet"},
        {color: "#00FF00", description: "Default Bank"},
        {color: "#FF0000", description: "Default Credit Card"},
      ]),
      tx.table("categories").bulkAdd([
        {color: "#00FF00", description: "Earnings"},
        {color: "#FF0000", description: "Expenses"},
      ])
    ])
  })
  return db.open()
}

export const listAccounts = async () => {
  console.log("listAccounts")
  return db.table("accounts").where("id").above(0).toArray()
}
