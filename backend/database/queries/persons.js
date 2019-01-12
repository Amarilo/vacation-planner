
const createTable = `
CREATE TABLE IF NOT EXISTS person(
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  from_date TEXT NOT NULL,
  vacation_days REAL NOT NULL
);
`;

const selectAll = `
SELECT * FROM person ORDER BY name;
`;
const selectMaxId = `
SELECT max(id) id FROM person;
`;

const insertMock = `
INSERT INTO person(id, name, from_date, vacation_days)
VALUES(1, 'john', date('now', 'localtime'), 0),
      (2, 'jane', '2018-10-01', 5.00),
      (3, 'jason', '2018-06-01', 8);
`;
const insert = `
INSERT INTO person(id, name, from_date, vacation_days)
VALUES(?, ?, ?, ?)
`;


const update = `
UPDATE person
SET name = ?,
    from_date = ?,
    vacation_days = ?
WHERE id = ?;
`;


const deleteAll = `
DELETE FROM person;
`;
const deleteById = `
DELETE FROM person WHERE id = ?;
`;

module.exports = {
  createTable,
  selectAll,
  selectMaxId,
  insertMock,
  insert,
  update,
  deleteAll,
  deleteById,
};