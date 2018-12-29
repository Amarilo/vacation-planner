import { Injectable } from '@angular/core';
import { IpcService } from '../ipc/ipc.service';
import { reject, resolve } from 'q';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private ipc: IpcService) { }

  //Persons
  getPersons() {
    this.ipc.send('get-all-persons');
    return new Promise((resolve, reject) => {
      this.ipc.on('get-all-persons', (e, persons, err) => {
        if(err) reject(err);
        resolve(persons);
      });
    });

    // return [
    //   {id: 0, name: 'Don Neto', from_date: '2018-06-01', vacation_days: 0},
    //   {id: 1, name: 'Virginia Malikenaitiene', from_date: '2018-06-01', vacation_days: 5},
    //   {id: 2, name: 'Rafael Caro Quintero', from_date: '2018-03-01', vacation_days: 0},
    //   {id: 3, name: 'Pan Veceslav', from_date: '2018-01-01', vacation_days: 0}
    // ];
  }
  
  insertPerson(person) {
    this.ipc.send('insert-person', person);
    return new Promise((resolve, reject) => {
      this.ipc.on('insert-person', (e, err) => {
        if(err) reject(err);
        resolve();
      });
    });
  }
  updatePerson(person){
    this.ipc.send('update-person', person);
    return new Promise((resolve, reject) => {
      this.ipc.on('update-person', (e, err) => {
        if(err) reject(err);
        resolve();
      });
    });
  }
  deletePerson(person){
    this.ipc.send('delete-person', person.id);
    return new Promise((resolve, reject) => {
      this.ipc.on('delete-person', (e, err) => {
        if(err) reject(err);
        resolve();
      });
    });
  }
  
  //Years
  getYears(year) {
    this.ipc.send('get-years-ge', year);
    return new Promise((resolve, reject) => {
      this.ipc.on('get-years-ge', (e, years, err) => {
        if(err) reject(err);
        resolve(years);
      });
    });

    // return [
    //   {year: 2018, business_days: 251},
    //   {year: 2019, business_days: 254},
    // ];
  }
  insertYear(year) {
    this.ipc.send('insert-year', year);
    return new Promise((resolve, reject) => {
      this.ipc.on('insert-year', (e, err) => {
        if(err) reject(err);
        resolve();
      });
    });
  }
  updateYear(year){
    this.ipc.send('update-year', year);
    return new Promise((resolve, reject) => {
      this.ipc.on('update-year', (e, err) => {
        if(err) reject(err);
        resolve();
      });
    });
  }
  deleteYear(year){
    this.ipc.send('delete-year', year);
    return new Promise((resolve, reject) => {
      this.ipc.on('delete-year', (e, err) => {
        if(err) reject(err);
        resolve();
      });
    });
  }
  
  //Vacations
  getVacationDatesByPerson(person) {
    this.ipc.send('get-vacations', person.id);
    return new Promise((resolve, reject) => {
      this.ipc.on('get-vacations', (e, vacations, err) => {
        if(err) reject(err);
        resolve(vacations.map(item => item.date));
      });
    });

    // const vacations = [
    //   ['2018-12-27','2018-12-28','2018-12-31', '2019-01-02', '2019-01-03', '2019-01-04'],
    //   ['2018-12-27','2018-12-28'],
    //   ['2018-12-31', '2019-01-02', '2019-01-03', '2019-01-04'],
    //   [],
    // ];
    // return vacations[person.id]
  }

  getVacationDatesByPersonSince(person) {
    this.ipc.send('get-vacations-since', person.id, person.from_date);
    return new Promise((resolve, reject) => {
      this.ipc.on('get-vacations-since', (e, vacations, err) => {
        if(err) reject(err);
        resolve(vacations.map(item => item.date));
      });
    });
  }

  getVacationCountSince(person): Promise<number> {
    this.ipc.send('get-vacation-count-since', person.id, person.from_date);
    return new Promise((resolve, reject) => {
      this.ipc.on('get-vacation-count-since', (e, count, err) => {
        if(err) reject(err);
        resolve(count);
      });
    });
  }

  getVacationCountTillNow(person) {
    this.ipc.send('get-vacation-count-till-now', person.id, person.from_date);
    return new Promise((resolve, reject) => {
      this.ipc.on('get-vacation-count-till-now', (e, count, err) => {
        if(err) reject(err);
        resolve(count);
      });
    });
  }
  
  insertVacations(person, datesArr): Promise<any> {
    if(datesArr.length === 0) return Promise.resolve();
    this.ipc.send('insert-vacations', person.id, datesArr);
    return new Promise((resolve, reject) => {
      this.ipc.on('insert-vacations', (e, err) => {
        if(err) reject(err);
        resolve();
      });
    });
  }
  
  deleteVacations(person, datesArr): Promise<any> {
    if(datesArr.length === 0) return Promise.resolve();
    this.ipc.send('delete-vacations', person.id, datesArr);
    return new Promise((resolve, reject) => {
      this.ipc.on('delete-vacations', (e, err) => {
        if(err) reject(err);
        resolve();
      });
    });
  }
  
  //Public holidays
  getPublicHolidays() {
    this.ipc.send('get-public-holidays');
    return new Promise((resolve, reject) => {
      this.ipc.on('get-public-holidays', (e, holidays, err) => {
        if(err) reject(err);
        resolve(holidays.map(item => item.date));
      });
    });
    
    // return ['2018-12-24','2018-12-25','2018-12-26', '2019-01-01'];
  }

  insertPublicHolidays(datesArr): Promise<any> {
    if(datesArr.length === 0) return Promise.resolve();
    this.ipc.send('insert-holidays', datesArr);
    return new Promise((resolve, reject) => {
      this.ipc.on('insert-holidays', (e, err) => {
        if(err) reject(err);
        resolve();
      });
    });
  }

  deletePublicHolidays(datesArr): Promise<any> {
    if(datesArr.length === 0) return Promise.resolve();
    this.ipc.send('delete-holidays', datesArr);
    return new Promise((resolve, reject) => {
      this.ipc.on('delete-holidays', (e, err) => {
        if(err) reject(err);
        resolve();
      });
    });
  }
}
