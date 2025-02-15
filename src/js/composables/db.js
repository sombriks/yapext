import Dexie from "dexie"

const db = new Dexie("yapext")

export async function initDB() {
  db.version(1).stores({
    categories: "++id,description",
    accounts: "++id,description",
    entries: "++id,categories_id,accounts_id,description,dueDate"
  })

  db.on("populate", tx => {
    return Promise.all([
      tx.table("accounts").bulkAdd([
        {created: new Date(), color: "#94c2ff", description: "Default Wallet", icon: "mdi-wallet-outline"},
        {created: new Date(), color: "#00FF00", description: "Default Bank", icon: "mdi-bank-outline"},
        {created: new Date(), color: "#FF0000", description: "Default Credit Card", icon: "mdi-credit-card-outline"},
      ]),
      tx.table("categories").bulkAdd([
        {created: new Date(), color: "#00FF00", description: "Earnings", limit: 10000},
        {created: new Date(), color: "#FF0000", description: "Expenses", limit: 3000},
      ])
    ])
  })
  return db.open()
}

export async function listAccounts({start, end}) {
  console.log("listAccounts")
  return db.table("accounts").where("id").above(0).toArray()
}

export async function listCategories({start, end}) {
  console.log("listCategories")
  return db.table("categories").where("id").above(0).toArray()
}

export async function listEntries({start, end}) {
  console.log("listEntries")
  return db.table("entries")
    .where("dueDate")
    .between(start, end)
    .toArray()
}

export async function saveCategory(cat) {
  // TODO validations
  console.log("saveCategory")
  const {id, description, color, limit, created} = cat
  if (!id) return await db.table("categories").add({description, color, limit, created: new Date()})
  return await db.table("categories").put({id, description, color, limit, created, updated: new Date()})
}
