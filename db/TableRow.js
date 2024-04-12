const sql = require("./sql");
const db = require("./db");

class TableRow {
  constructor() {}

  getTableName () {
    throw new Error("TableRow implementation needs a table name");
  }

  getAddStr () {
    return sql.createRow(this.getTableName(), this);
  }
  async add () {
    if (this.isAdded()) return;

    // sql insert should return the created row (held in queryReturn.rows), which should only have one element from adding this single row
    this.id = (await db.query(this.getAddStr()))?.rows?.at(0)?.id;

    return this;
  }

  isAdded() {return this.id !== undefined; }
}

module.exports = TableRow;