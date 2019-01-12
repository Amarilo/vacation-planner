const electron = require('electron');
const url = require('url');
const path = require('path');
const sqlite = require('./backend/database/sqlite');

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;
app.on('ready', function() {
  mainWindow = new BrowserWindow({icon:'assets/island_icon.png'});

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'dist/frontend/index.html'),
      protocol: 'file:',
      slashes: true
    })
  );

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);

  mainWindow.maximize();

  mainWindow.on('close', function(){ 
    sqlite.closeConnection().then(
      () => app.quit()
    ).catch(
      () => app.quit()
    );
  });
});


const  mainMenuTemplate = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Quit',
          accelerator: 'Ctrl+Q',
          click(){
            app.quit();
          }
        }
      ]
    }
  ];


ipcMain.on('ping', function(e, item) {
  console.log('pong');
});

ipcMain.on('get-all-persons', function() {
  sqlite.getAllPersons()
    .then((rows) => mainWindow.webContents.send('get-all-persons', rows, null))
    .catch((err) => {
      mainWindow.webContents.send('get-all-persons', [], err);
      throw err;
    });
});

ipcMain.on('get-public-holidays', function() {
  sqlite.getPublicHolidays()
    .then((rows) => mainWindow.webContents.send('get-public-holidays', rows, null))
    .catch((err) => {
      mainWindow.webContents.send('get-public-holidays', [], err);
      throw err;
    });
});

ipcMain.on('get-years', function() {
  sqlite.getYears()
    .then((rows) => mainWindow.webContents.send('get-years', rows, null))
    .catch((err) => {
      mainWindow.webContents.send('get-years', [], err);
      throw err;
    });
});

// ipcMain.on('get-vacations', function(e, personId) {
//   sqlite.getVacations(personId)
//     .then((rows) => mainWindow.webContents.send('get-vacations', rows, null))
//     .catch((err) => {
//       mainWindow.webContents.send('get-vacations', [], err);
//       throw err;
//     });
// });

ipcMain.on('get-vacations-since', function(e, personId, date) {
  sqlite.getVacationsSinceDate(personId, date)
    .then((rows) => mainWindow.webContents.send('get-vacations-since', rows, null))
    .catch((err) => {
      mainWindow.webContents.send('get-vacations-since', [], err);
      throw err;
    });
});

ipcMain.on('get-vacation-count-since', function(e, personId, date) {
  sqlite.getVacationCountSinceDate(personId, date)
    .then((row) => mainWindow.webContents.send('get-vacation-count-since', row.count, null))
    .catch((err) => {
      mainWindow.webContents.send('get-vacation-count-since', 0, err);
      throw err;
    });
});

ipcMain.on('get-vacation-count-till-now', function(e, personId, date) {
  sqlite.getVacationCountTillNow(personId, date)
    .then((row) => mainWindow.webContents.send('get-vacation-count-till-now', row.count, null))
    .catch((err) => {
      mainWindow.webContents.send('get-vacation-count-till-now', 0, err);
      throw err;
    });
});

ipcMain.on('insert-person', function(e, person) {
  sqlite.insertPerson(person)
    .then(() => mainWindow.webContents.send('insert-person', null))
    .catch((err) => {
      mainWindow.webContents.send('insert-person', err);
      throw err;
    });
});

ipcMain.on('update-person', function(e, person) {
  sqlite.updatePerson(person)
    .then(() => mainWindow.webContents.send('update-person', null))
    .catch((err) => {
      mainWindow.webContents.send('update-person', err);
      throw err;
    });
});

ipcMain.on('delete-person', function(e, personId) {
  sqlite.deletePersonById(personId)
    .then(() => mainWindow.webContents.send('delete-person', null))
    .catch((err) => {
      mainWindow.webContents.send('delete-person', err);
      throw err;
    });
});

ipcMain.on('insert-year', function(e, year) {
  sqlite.insertYear(year)
    .then(() => mainWindow.webContents.send('insert-year', null))
    .catch((err) => {
      mainWindow.webContents.send('insert-year', err);
      throw err;
    });
});

ipcMain.on('update-year', function(e, year) {
  sqlite.updateYear(year)
    .then(() => mainWindow.webContents.send('update-year', null))
    .catch((err) => {
      mainWindow.webContents.send('update-year', err);
      throw err;
    });
});

ipcMain.on('delete-year', function(e, year) {
  sqlite.deleteYear(year)
    .then(() => mainWindow.webContents.send('delete-year', null))
    .catch((err) => {
      mainWindow.webContents.send('delete-year', err);
      throw err;
    });
});

ipcMain.on('insert-vacations', function(e, personId, dates) {
  sqlite.insertVacations(personId, dates)
    .then(() => mainWindow.webContents.send('insert-vacations', null))
    .catch((err) => {
      mainWindow.webContents.send('insert-vacations', err);
      throw err;
    });
});
ipcMain.on('delete-vacations', function(e, personId, dates) {
  sqlite.deleteVacations(personId, dates)
    .then(() => mainWindow.webContents.send('delete-vacations', null))
    .catch((err) => {
      mainWindow.webContents.send('delete-vacations', err);
      throw err;
    });
});

ipcMain.on('insert-holidays', function(e, dates) {
  sqlite.insertPublicHolidays(dates)
    .then(() => mainWindow.webContents.send('insert-holidays', null))
    .catch((err) => {
      mainWindow.webContents.send('insert-holidays', err);
      throw err;
    });
});
ipcMain.on('delete-holidays', function(e, dates) {
  sqlite.deletePublicHolidays(dates)
    .then(() => mainWindow.webContents.send('delete-holidays', null))
    .catch((err) => {
      mainWindow.webContents.send('delete-holidays', err);
      throw err;
    });
});
