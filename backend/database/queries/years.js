const createTable = `
CREATE TABLE IF NOT EXISTS year_setup(
  year INTEGER PRIMARY KEY,
  business_days INTEGER NOT NULL
);
`;

const selectYearsGE = `
SELECT * FROM year_setup WHERE year >= ?;
`;

const deleteAll = `
DELETE FROM year_setup;
`;

const insertMock = `
INSERT INTO year_setup(year, business_days)
VALUES(2017, 251),
      (2018, 251),
      (2019, 254)
`;

const insert = `
INSERT INTO year_setup(year, business_days)
VALUES(?, ?)
`;
const update = `
UPDATE year_setup
SET business_days = ? 
WHERE year = ?;
`;

const deleteByYear = `
DELETE FROM year_setup WHERE year = ?;
`;

module.exports = {
  createTable,
  selectYearsGE,
  insertMock,
  deleteAll,
  insert,
  update,
  deleteByYear,
};