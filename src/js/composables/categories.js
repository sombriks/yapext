import {db} from "./db.js"

export async function listCategories({start, end}) {
  console.log("listCategories")
  const result = await db.table("categories").toCollection().sortBy("description")
  result.map(async (category) => {
    category.position = (await db.table("entries")
      .where("dueDate").between(start, end)
      .and(e => e.categories_id == category.id)
      .toArray()).reduce((acc, cur) => {
      acc += cur.amount
      return acc
    }, 0)
  })
  return result
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
