const createTable = `
CREATE TABLE IF NOT EXISTS vacations(
  person_id INTEGER NOT NULL, 
  date TEXT NOT NULL,
  FOREIGN KEY (person_id) REFERENCES person(id) ON UPDATE CASCADE ON DELETE CASCADE
);
`;

const selectByPersonId = `
SELECT date FROM vacations WHERE person_id = ?;
`;

const selectByPersonIdAndDate = `
SELECT date FROM vacations WHERE person_id = ? AND date >= date(?, '-1 year');
`;

const countTillNowByPersonIdAndDate = `
SELECT count(*) count FROM vacations WHERE person_id = ? AND date BETWEEN ? AND date('now', 'localtime');
`;

const countSinceByPersonIdAndDate = `
SELECT count(*) count FROM vacations WHERE person_id = ? AND date >= ?;
`;

const deleteAll = `
DELETE FROM vacations;
`;

const insertMock = `
INSERT INTO vacations(person_id, date)
VALUES(1, '2018-12-27'),
      (1, '2018-12-28'),
      (1, '2018-12-31'),
      (1, '2019-01-02'),
      (1, '2019-01-03'),
      (1, '2019-01-04'),
      (2, '2018-12-27'),
      (2, '2018-12-28'),
      (3, '2018-12-31'),
      (3, '2019-01-02'),
      (3, '2019-01-03'),
      (3, '2019-01-04')
`;

const insertBatch = `
INSERT INTO vacations(person_id, date) VALUES 
`; // (id, ?),
const deleteIfIn = `
DELETE FROM vacations 
WHERE person_id = ? 
AND date IN 
`; // (?,?);


module.exports = {
  createTable,
  // selectByPersonId,
  selectByPersonIdAndDate,
  countTillNowByPersonIdAndDate,
  countSinceByPersonIdAndDate,
  insertMock,
  deleteAll,
  insertBatch,
  deleteIfIn,
};