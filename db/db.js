const sql = require("./sql");
const { Client } = require("pg");
const client = new Client("postgress://localhost:5432/fitness_tracker");

const allTables = ["activities", "routines", "routines_activities"]; // TODO: provide some separation and utility functions for "middle" tables?

// Validation
const validateTable = (tableName) => {
  if (typeof (tableName) != "string") return false;
  return allTables.includes(tableName);
}
const getValidTables = (tableNames) => {
  if (!Array.isArray(tableNames)) return [];
  return tableNames.filter(name => validateTable(name));
}

// Drop
const dropTables = (tableNames) => {
  return getValidTables(tableNames).reduce((queryStr, table) => queryStr + sql.dropTable(table), "");
}

// Create
const getCreateTableSQL = (tableName) => {
  let sqlStr = `CREATE TABLE ${tableName}(`
  sqlStr += `id SERIAL PRIMARY KEY,`

  switch (tableName) {
    case "activities": sqlStr += `
        name VARCHAR(20) UNIQUE NOT NULL,
        description TEXT
      `;
      break;
    case "routines": sqlStr += `
        is_public BOOL,
        name VARCHAR(30) UNIQUE NOT NULL,
        goal TEXT
      `;
      break;
    case "routines_activities": sqlStr += `
        routine_id INT REFERENCES routines(id),
        activity_id INT REFERENCES activities(id),
        count INT NOT NULL
      `;
      break;
    default: return "";
  }

  sqlStr += `);`
  return sqlStr;
}

const createTables = (tableNames) => {
  return getValidTables(tableNames).reduce((queryStr, table) => queryStr + getCreateTableSQL(table), "");
}

// Init
const reset = async () => {
  await query(dropTables([...allTables].reverse()));
  await query(createTables(allTables));
}
const connect = async () => {
  return client.connect();
}
const end = async () => {
  return client.end();
}
const query = async (queryStr) => {
  try {
    return await client.query(queryStr);
  } catch (error) {
    console.log(`Database query\n${queryStr}\nfailed with error\n${error}`);
  }
}

module.exports = {
  allTables,
  connect, end,
  reset, 
  query,
};