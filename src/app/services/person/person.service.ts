import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  personsEmitter: Subject<any> = new Subject();
  // vacationsEmitter: Subject<any> = new Subject();

  constructor(private dbService: DatabaseService) { 
    this.getPersons();
  }

  getPersons() {
    this.dbService.getPersons().then((persons) => 
      this.personsEmitter.next(persons)
    ).catch((err) =>
      console.log(err)
      
    );
  }

  insertPerson(person) {
    this.dbService.insertPerson(person).then( () => {
      this.getPersons();
    }).catch( (err) =>
      console.error(err)
    );
  }

  deletePerson(person) {
    this.dbService.deletePerson(person).then(() => {
      this.getPersons()
    }).catch((err) => 
      console.error(err)
    );
  }

  updatePerson(person) {
    this.dbService.updatePerson(person).then(() => 
      this.getPersons()
    ).catch((err) => 
      console.error(err)
    );
  }

  getVacations(person) {
    return this.dbService.getVacationDatesByPersonSince(person);
  }

  getVacationsCountTillNow(person) {
    return this.dbService.getVacationCountTillNow(person);
  }

  getVacationsCountSince(person) {
    return this.dbService.getVacationCountSince(person);
  }

  async toggleVacations(person, dayArray, takenVacations) {
    try {
      let vacationsToRemove = [];
      let vacationsToAdd = [];
      dayArray.forEach(element => {
        let elementPlace = takenVacations.indexOf(element);
        if(elementPlace > -1) {
          vacationsToRemove.push(element);
        } else {
          vacationsToAdd.push(element);
        }
      });
  
      await this.dbService.deleteVacations(person, vacationsToRemove);
      await this.dbService.insertVacations(person, vacationsToAdd);
    } catch (error) {
      throw error;
    }
  }

}
