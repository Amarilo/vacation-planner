const sqlite = require('./backend/database/sqlite');

sqlite.deleteAllHolidays()
.then(
  () => console.log('ok')
).catch(
  (err) => console.log('err',err)
);