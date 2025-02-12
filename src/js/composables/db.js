import Dexie from "dexie"

const db = new Dexie("yapext")

export const initDB = async () => {
  db.version(1).stores({
    categories: "++id,description",
    accounts: "++id,description",
    entries: "++id,categories_id,accounts_id"
  })
  db.on("populate", tx => {
    console.log("initDB") // todo will newer versions call it again?
    return Promise.all([
      tx.table("accounts").bulkAdd([
        { color: "#0000FF", description: "Default Wallet" },
        { color: "#00FF00", description: "Default Bank" },
        { color: "#FF0000", description: "Default Credit Card" },
      ]),
      tx.table("categories").bulkAdd([
        { color: "#00FF00", description: "Earnings" },
        { color: "#FF0000", description: "Expenses" },
      ])
    ])
  })
  return db.open()
}