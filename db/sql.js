const getAll = (tableName) => {
  return `SELECT * FROM ${tableName};`;
}
const getWhere = (tableName, key, value) => {
  return `SELECT * FROM ${tableName} WHERE ${keyString(key)}=${valueString(value)};`;
}

const dropTable = (tableName) => {
  return `DROP TABLE IF EXISTS ${tableName};`;
}
const deleteWhere = (tableName, key, value) => {
  return `DELETE FROM ${tableName} WHERE ${keyString(key)}=${valueString(value)} RETURNING *;`;
}

/** Converts Camel case (from JS variable names) to Snake case (for SQL key names) */
const keyString = (key) => {
  return key.replace(/[A-Z]/g, str => '_' + str.toLowerCase());
}

const keyStrings = (obj) => {
  return Object.keys(obj).map(key => keyString(key)).join(",");
}

/** Converts JS values to SQL representations */
const valueString = (value) => {
  let result = value.toString();
  if (typeof(value) === "string") result = `'${result}'`;
  return result;
}

const valueStrings = (obj) => {
  return Object.values(obj).map(value => valueString(value)).join(",");
}

const createRow = (tableName, rowObj) => {
  return `
    INSERT INTO ${tableName} (${keyStrings(rowObj)})
    VALUES(${valueStrings(rowObj)})
    RETURNING *;
  `
}

module.exports = {
  getAll,
  getWhere, 
  dropTable, 
  deleteWhere,
  createRow,
};