const TableRow = require("./TableRow");

class Activity extends TableRow {
  constructor({name, description}) {
    super();
    this.name = name;
    this.description = description;
  }
  
  static tableName () {
    return "activities";
  }
  getTableName () {
    return Activity.tableName();
  }
}

module.exports = Activity;