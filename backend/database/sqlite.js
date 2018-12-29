const sqlite3 = require('sqlite3').verbose();
const query = require('./queries');

let db = new sqlite3.Database('./vacation.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the vacation.db database.');
});

const closeConnection = () => {
  return new Promise((resolve, reject) =>{
    db.close((err) => {
      if (err) {
        reject(err.message);
      }
      resolve('Closed the database connection.');
    });
  });
}

db.serialize(() => {
  db.run(query.persons.createTable)
    .run(query.years.createTable)
    .run(query.publicHolidays.createTable)
    .run(query.vacations.createTable);
});

// db.serialize(() => {
//   db.run(query.years.deleteAll)
//     .run(query.persons.deleteAll)
//     .run(query.publicHolidays.deleteAll)
//     .run(query.vacations.deleteAll);
// });

// db.serialize(() => {
//   db.run(query.years.insertMock)
//     .run(query.persons.insertMock)
//     .run(query.publicHolidays.insertMock)
//     .run(query.vacations.insertMock);
// });

// closeConnection();


const getAllPersons = () => {
  return new Promise((resolve,reject) => {
    db.all(query.persons.selectAll, [], (err, rows) => {
      if(err) reject(err);
      resolve(rows);
    });
  });
};

const insertPerson = (person) => {
  return new Promise((resolve,reject) => {
      db.get(query.persons.selectMaxId, [], (err, row) =>{
        if(err) reject(err);
        db.run(query.persons.insert, [row.id+1, person.name, person.from_date, person.vacation_days], (err) => {
          if(err) reject(err);
          resolve();
        });
      });
  });
};

const deletePersonById = (id) => {
  return new Promise((resolve,reject) => {
    db.all(query.persons.deleteById, [id], (err) => {
      if(err) reject(err);
      resolve();
    });
  });
};

const updatePerson = (person) => {
  return new Promise((resolve,reject) => {
    db.all(query.persons.update, [person.name, person.from_date, person.vacation_days, person.id], (err) => {
      if(err) reject(err);
      resolve();
    });
  });
};

const getYearsGE = (year) => {
  return new Promise((resolve,reject) => {
    db.all(query.years.selectYearsGE, [year], (err, rows) => {
      if(err) reject(err);
      resolve(rows);
    });
  });
};

const insertYear = (year) => {
  return new Promise((resolve,reject) => {
    db.all(query.years.insert, [year.year, year.business_days], (err) => {
      if(err) reject(err);
      resolve();
    });
  });
};

const updateYear = (year) => {
  return new Promise((resolve,reject) => {
    db.all(query.years.update, [year.business_days, year.year], (err) => {
      if(err) reject(err);
      resolve();
    });
  });
};

const deleteYear = (year) => {
  return new Promise((resolve,reject) => {
    db.all(query.years.deleteByYear, [year.year], (err) => {
      if(err) reject(err);
      resolve();
    });
  });
}; 

const getPublicHolidays = () => {
  return new Promise((resolve,reject) => {
    db.all(query.publicHolidays.selectRecent, [], (err, rows) => {
      if(err) reject(err);
      resolve(rows);
    });
  });
};
const insertPublicHolidays = (dates) => {
  let placeholders = dates.map((date) => `(?)`).join(',');
  return new Promise((resolve,reject) => {
    db.run(query.publicHolidays.insertBatch + placeholders, dates, (err) => {
      if(err) reject(err);
      resolve();
    });
  });
};

const deletePublicHolidays = (dates) => {
  let placeholders = dates.map((date) => `?`).join(',');
  placeholders = '(' + placeholders + ');';
  return new Promise((resolve,reject) => {
    db.run(query.publicHolidays.deleteIfIn + placeholders, dates, (err) => {
      if(err) reject(err);
      resolve();
    });
  });
};

// const getVacations = (personId) => {
//   return new Promise((resolve,reject) => {
//     db.all(query.vacations.selectByPersonId, [personId], (err, rows) => {
//       if(err) reject(err);
//       resolve(rows);
//     });
//   });
// };

const getVacationsSinceDate = (personId, date) => {
  return new Promise((resolve,reject) => {
    db.all(query.vacations.selectByPersonIdAndDate, [personId, date], (err, rows) => {
      if(err) reject(err);
      resolve(rows);
    });
  });
};

const getVacationCountSinceDate = (personId, date) => {
  return new Promise((resolve,reject) => {
    db.get(query.vacations.countSinceByPersonIdAndDate, [personId, date], (err, row) => {
      if(err) reject(err);
      resolve(row);
    });
  });
};

const getVacationCountTillNow = (personId, date) => {
  return new Promise((resolve,reject) => {
    db.get(query.vacations.countTillNowByPersonIdAndDate, [personId, date], (err, row) => {
      if(err) reject(err);
      resolve(row);
    });
  });
};


const insertVacations = (personId, dates) => {
  let placeholders = dates.map((date) => `(${personId}, ?)`).join(',');
  return new Promise((resolve,reject) => {
    db.run(query.vacations.insertBatch + placeholders, dates, (err) => {
      if(err) reject(err);
      resolve();
    });
  });
};

const deleteVacations = (personId, dates) => {
  let placeholders = dates.map((date) => `?`).join(',');
  placeholders = '(' + placeholders + ');';
  return new Promise((resolve,reject) => {
    db.run(query.vacations.deleteIfIn + placeholders, [personId, ...dates], (err) => {
      if(err) reject(err);
      resolve();
    });
  });
};


const deleteAllHolidays = () => {
  return new Promise((resolve,reject) => {
    db.run(query.publicHolidays.deleteAll, [], (err) => {
      if(err) reject(err);
      resolve();
    });
  });
};

module.exports = {
  closeConnection,
  getAllPersons,
  insertPerson,
  updatePerson,
  deletePersonById,

  getYearsGE,
  insertYear,
  updateYear,
  deleteYear,

  getPublicHolidays,
  insertPublicHolidays,
  deletePublicHolidays,

  // getVacations,
  getVacationsSinceDate,
  getVacationCountSinceDate,
  getVacationCountTillNow,
  insertVacations,
  deleteVacations,
  deleteAllHolidays,
};