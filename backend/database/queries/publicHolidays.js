const createTable = `
CREATE TABLE IF NOT EXISTS public_holidays(
  date TEXT NOT NULL
);
`;

const selectRecent = `
SELECT * FROM public_holidays WHERE date > date('now', 'localtime', '-1 year');
`;

const deleteAll = `
DELETE FROM public_holidays;
`;

const insertMock = `
INSERT INTO public_holidays(date)
VALUES('2018-12-24'),
      ('2018-12-25'),
      ('2018-12-26'),
      ('2019-01-01')
`;

const insertBatch = `
INSERT INTO public_holidays(date) VALUES 
`; // (?),
const deleteIfIn = `
DELETE FROM public_holidays 
WHERE date IN
`; // (?,?);



module.exports = {
  createTable,
  selectRecent,
  insertMock,
  deleteAll,
  insertBatch,
  deleteIfIn
};