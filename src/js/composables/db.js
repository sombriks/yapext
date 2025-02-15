import Dexie from "dexie"

const db = new Dexie("yapext")

export async function initDB() {
  db.version(1).stores({
    categories: "++id,description",
    accounts: "++id,description",
    entries: "++id,categories_id,accounts_id"
  })

  db.on("populate", tx => {
    return Promise.all([
      tx.table("accounts").bulkAdd([
        {color: "#94c2ff", description: "Default Wallet", icon: "mdi-wallet-outline"},
        {color: "#00FF00", description: "Default Bank", icon: "mdi-bank-outline"},
        {color: "#FF0000", description: "Default Credit Card", icon: "mdi-credit-card-outline"},
      ]),
      tx.table("categories").bulkAdd([
        {color: "#00FF00", description: "Earnings"},
        {color: "#FF0000", description: "Expenses"},
      ])
    ])
  })
  return db.open()
}

export async function listAccounts(start, end) {
  console.log("listAccounts")
  return db.table("accounts").where("id").above(0).toArray()
}

export async function listCategories(start, end) {
  console.log("listCategories")
  return db.table("categories").where("id").above(0).toArray()
}
