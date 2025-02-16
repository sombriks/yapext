import Dexie from "dexie"

const db = new Dexie("yapext")

export async function initDB() {
  db.version(1).stores({
    categories: "++id,description",
    accounts: "++id,description",
    entries: "++id,categories_id,accounts_id,description,dueDate"
  })

  db.on("populate", function (tx) {
    return Promise.all([
      tx.table("accounts").bulkAdd([{
        created: new Date(),
        color: "#94c2ff",
        limit: 0,
        description: "Default Wallet",
        icon: "mdi-wallet-outline",
        closureDay: 1,
        dueDay: 1,
      }, {
        created: new Date(),
        color: "#00FF00",
        limit: -1000,
        description: "Default Bank",
        icon: "mdi-bank-outline",
        closureDay: 10,
        dueDay: 10,
      }, {
        created: new Date(),
        color: "#FF0000",
        limit: -10000,
        description: "Default Credit Card",
        icon: "mdi-credit-card-outline",
        closureDay: 5,
        dueDay: 15,
      },]),
      tx.table("categories").bulkAdd([
        {created: new Date(), color: "#00FF00", description: "Earnings", limit: 10000},
        {created: new Date(), color: "#FF0000", description: "Expenses", limit: -3000},
      ])
    ])
  })
  return db.open()
}

export async function listAccounts({start, end}) {
  console.log("listAccounts")
  return db.table("accounts").where("id").above(0).toArray()
}

export async function saveAccounts(account) {
  console.log("saveAccounts")
  const {id, description, color, limit, closureDay, dueDay, created} = account
  if (!id) return db.table("accounts").add({description, color, limit, closureDay, dueDay, created: new Date()})
  return db.table("accounts").put({description, color, limit, closureDay, dueDay, created, updated: new Date()})
}

export async function listCategories({start, end}) {
  console.log("listCategories")
  return db.table("categories").where("id").above(0).toArray()
}

export async function saveCategory(cat) {
  // TODO validations
  console.log("saveCategory")
  const {id, description, color, limit, created} = cat
  if (!id) return await db.table("categories").add({description, color, limit, created: new Date()})
  return await db.table("categories").put({id, description, color, limit, created, updated: new Date()})
}

export async function delCategory(cat) {
  console.log("delCategory")
  const {id} = cat
  if (id) {
    return db.table("categories").where("id").equals(id).delete()
  }
}

export async function listEntries({start, end}) {
  console.log("listEntries")
  return db.table("entries")
    .where("dueDate")
    .between(start, end)
    .toArray()
}
