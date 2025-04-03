import {db} from "./db.js"

export async function listAccounts({start, end}) {
  console.log("listAccounts")
  const result = await db.table("accounts")
    .toCollection()
    .sortBy("description")
  for (const account of result) {
    const entries = await db.table("entries")
      .where("dueDate").between(start, end)
      .and(e => e.accounts_id === account.id)
      .toArray()
    account.position = entries.reduce((acc, cur) => {
      acc += cur.amount
      return acc
    }, 0)
  }
  return result
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
