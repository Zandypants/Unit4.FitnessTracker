const express = require("express");
const app = express();

const db = require("./db/db");
const sql = require("./db/sql");

const PORT = 8080;
const API_URL = "/api/v1";

db.connect();

// these allow getting req.body from raw and encoded posts
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(express.static('dist')); // TODO: uncomment this when adding frontend

app.get("/", (req, res) => res.send("This is the Home Page for the Fitness Tracker API."));
// app.get("/", (req, res) => res.sendFile(`${__dirname}/dist/index.html`));  // TODO: replace above with this when adding frontend

app.get(API_URL + "/:tableName", async (req, res, next) => {
  try {
    const { rows } = await db.query(sql.getAll(req.params.tableName));
    res.send(rows);
  } catch (error) {
    next({
      name: `Missing ${req.params.tableName}`,
      error,
    })
  }
});

app.get(API_URL + "/:tableName/:id", async (req, res, next) => {
  try {
    const { rows: [row] } = await db.query(sql.getWhere(req.params.tableName, "id", req.params.id));
    res.send(row);
  } catch (error) {
    next({
      name: `Missing ${req.params.tableName}`,
      error,
    })
  }
});

app.post(API_URL + "/:tableName", async (req, res, next) => {
  try {
    const {rows: [newRow] } = await db.query(sql.createRow(req.params.tableName, req.body));
    res.send(newRow);
  } catch (error) {
    next(error);
  }
});

app.delete(API_URL + "/:tableName/:id", async (req, res, next) => {
  try {
    const {tableName, id} = req.params;
    const {rows: [row]} = await db.query(sql.deleteWhere(tableName, "id", id));
    res.send(`${row ? "Sucessfully deleted" : "Failed to delete"} row ${id} from table ${tableName}!`);
  } catch (error) {
    next(error);
  }
});

app.use((req, res) => {
  res.status(404).send({error: "404 - Not Found", message: "No route found for the requested endpoint"});
});

app.use((error, req, res, next) => {
  console.log("Server error:", error);
  res.status(500).send(error);
});

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });