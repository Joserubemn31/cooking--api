const db = require('../../database')

class CategoriesRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'

    const rows = await db.query(`
      SELECT categories.*, count(recipes.id) AS recipes
      FROM categories
      LEFT JOIN recipes ON recipes.category_id = categories.id
      GROUP BY (categories.id, categories.name, categories.img_url)
      ORDER BY name ${direction}
    `)

    return rows
  }

  async findById(id) {
    const [row] = await db.query(
      `
      SELECT categories.*, count(recipes.id) as recipes
      FROM categories
      LEFT JOIN recipes ON recipes.category_id = categories.id
      WHERE categories.id = $1
      GROUP BY (categories.id, categories.name, categories.img_url)
    `,
      [id]
    )

    return row
  }

  async findByName(name) {
    const [row] = await db.query(
      `
      SELECT * FROM categories
      WHERE name = $1
    `,
      [name]
    )

    return row
  }

  async create({ name, img_url }) {
    const [row] = await db.query(
      `
      INSERT INTO categories (name, img_url)
      VALUES ($1, $2)
      RETURNING *
    `,
      [name, img_url]
    )

    return row
  }

  async update(id, { name, img_url }) {
    const [row] = await db.query(
      `
      UPDATE categories
      SET name = $1,
      img_url = $2
      WHERE id = $3
      RETURNING *
    `,
      [name, img_url, id]
    )

    return row
  }

  async delete(id) {
    const deleteOp = await db.query(
      `
      DELETE FROM categories
      WHERE id = $1
    `,
      [id]
    )

    return deleteOp
  }
}

module.exports = new CategoriesRepository()
