const TableRow = require("./TableRow");

class Routine extends TableRow {
  constructor({name, goal, isPublic}) {
    super();
    this.name = name;
    this.goal = goal;
    this.isPublic = Boolean(isPublic);
  }

  static tableName () {
    return "routines";
  }
  getTableName () {
    return Routine.tableName();
  }
}

module.exports = Routine;