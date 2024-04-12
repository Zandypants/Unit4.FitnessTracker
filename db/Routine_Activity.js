const TableRow = require("./TableRow");

class Routine_Activity extends TableRow {
  constructor({routineId, activityId, count}) {
    super();
    this.routineId = routineId;
    this.activityId = activityId;
    this.count = count;
  }
  
  static tableName () {
    return "routines_activities";
  }
  getTableName () {
    return Routine_Activity.tableName();
  }
}

module.exports = Routine_Activity;