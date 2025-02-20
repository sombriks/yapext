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
        color: "rgb(255,183,100)",
        limit: 0,
        description: "Wallet",
        icon: "mdi-wallet-outline",
        closureDay: 1,
        dueDay: 1,
      }, {
        created: new Date(),
        color: "rgb(100,255,199)",
        limit: -1000,
        description: "Bank",
        icon: "mdi-bank-outline",
        closureDay: 10,
        dueDay: 10,
      }, {
        created: new Date(),
        color: "rgb(100,237,255)",
        limit: -10000,
        description: "Default Credit Card",
        icon: "mdi-credit-card-outline",
        closureDay: 5,
        dueDay: 15,
      },]),
      tx.table("categories").bulkAdd([
        {
          created: new Date(),
          color: "rgb(50,255,50)",
          description: "Earnings",
          limit: 22000
        },{
          created: new Date(),
          color: "rgb(50,50,50)",
          description: "Housing",
          limit: -6000
        },
      ])
    ])
  })
  return db.open()
}

export async function listAccounts({start, end}) {
  console.log("listAccounts")
  return db.table("accounts").where("id").above(0).toArray()
}

export async function saveAccount(account) {
  console.log("saveAccount")
  const {id, icon, description, color, limit, closureDay, dueDay, created} = account
  if (!id) return db.table("accounts").add({description, icon, color, limit, closureDay, dueDay, created: new Date()})
  return db.table("accounts").put({
    id,
    description,
    icon,
    color,
    limit,
    closureDay,
    dueDay,
    created,
    updated: new Date()
  })
}

export async function delAccount(account) {
  console.log("delAccount")
  const {id} = account
  if (id) return db.table("accounts").where("id").equals(id).delete()
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
  if (id) return db.table("categories").where("id").equals(id).delete()
}

export async function listEntries({start, end}) {
  console.log("listEntries")
  return db.table("entries")
    .where("dueDate")
    .between(start, end)
    .reverse()
    .sortBy("dueDate")
}

export async function saveEntry(entry) {
  console.log("saveEntry")
  const {id, accounts_id, categories_id, description, amount, dueDate, created} = entry
  if (!id) return db.table("entries").add({
    categories_id,
    accounts_id,
    description,
    amount,
    dueDate,
    created: new Date()
  })
  return db.table("entries").put({
    id,
    categories_id,
    accounts_id,
    description,
    amount,
    dueDate,
    created,
    updated: new Date()
  })
}

export async function delEntry(entry) {
  console.log("delEntry")
  const {id} = entry
  if (id) return db.table("entries").where("id").equals(id).delete()
}
