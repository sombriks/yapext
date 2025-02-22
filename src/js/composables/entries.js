import {db} from "./db.js"

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
