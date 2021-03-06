const db = require('../../database')

class TagsRepository {
  async findAll() {
    const rows = await db.query(`
      SELECT * from tags
    `)

    const recipes = await db.query(`
      SELECT * from recipes
    `)

    rows.map((tag, index) => {
      recipes.map((recipe) => {
        console.log(tag.name)
        console.log(recipe.title)
        recipe.tag_id.map((id) => {
          if (id === tag.id) {
            tag.recipes.push(recipe)
          }
        })
      })
    })

    return rows
  }

  async findById(id) {
    const [row] = await db.query(
      `
        SELECT * FROM tags
        WHERE id = $1
      `,
      [id]
    )

    return row
  }

  async findRecipes(tagId) {
    const recipes = []
    const rows = await db.query(
      `
      SELECT * from recipes
    `
    )
    rows.map((recipe, index) => {
      recipe.tag_id.map((id) => {
        if (id === tagId) {
          recipes.push(recipe)
        }
      })
    })
    return recipes
  }

  async create(name, resume, recipes) {
    const [row] = await db.query(
      `
      INSERT INTO tags (name, resume, recipes)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
      [name, resume, recipes]
    )

    return row
  }

  async update(id, { name, resume, recipes }) {
    const [row] = await db.query(
      `
      UPDATE tags
      SET name = $1,
      resume = $2,
      recipes = $3
      WHERE id = $4
      RETURNING *
    `,
      [name, resume, recipes, id]
    )

    return row
  }

  async delete(id) {
    const deleteOp = await db.query(
      `
      DELETE FROM tags
      WHERE id = $1
    `,
      [id]
    )

    return deleteOp
  }
}
//
module.exports = new TagsRepository()
