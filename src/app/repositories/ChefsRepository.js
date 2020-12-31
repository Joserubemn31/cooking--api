const db = require('../../database')

class ChefsRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'
    const rows = await db.query(`
      SELECT * FROM chefs
      ORDER BY name ${direction}
    `)

    return rows
  }

  async findById(id) {
    const [row] = await db.query(`
      SELECT * FROM chefs
      WHERE id = $1
    `, [id])

    return row
  }

  async create({ name }) {
    const [row] = await db.query(`
      INSERT INTO chefs (name)
      VALUES ($1)
      RETURNING *
    `, [name])

    return row
  }

  update() {

  }

  delete() {

  }
}

module.exports = new ChefsRepository()
