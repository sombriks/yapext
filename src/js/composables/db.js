import Dexie from "dexie"

export const db = new Dexie("yapext")

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
        description: "Credit Card",
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
        }, {
          created: new Date(),
          color: "rgb(232,239,57)",
          description: "Housing",
          limit: -6000
        }, {
          created: new Date(),
          color: "rgb(214,86,86)",
          description: "Food",
          limit: -4000
        }, {
          created: new Date(),
          color: "rgb(86,214,165)",
          description: "Services",
          limit: -2000
        }, {
          created: new Date(),
          color: "rgb(103,214,86)",
          description: "Study",
          limit: -2000
        }, {
          created: new Date(),
          color: "rgb(81,201,221)",
          description: "Investments",
          limit: -1000
        },
      ])
    ])
  })
  return db.open()
}

