import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PersonService } from '../person/person.service';

@Injectable({
  providedIn: 'root'
})
export class UiSelectionService {

  selectedPerson: any = {};
  personVacations: any = [];
  personVacationCount = 0;

  selectedYear: any = {};

  isYear = false;

  selectionChangeEmitter: Subject<any> = new Subject();

  constructor(private personService: PersonService) { 
    // this.personService.vacationsEmitter.subscribe(
    //   (vacations) => this.personVacations = vacations
    // );
  }

  getSelected() {
    if(this.isYear) {
      return this.selectedYear;
    }
    return this.selectedPerson;
  }

  async selectPerson(person) {
    try {
      this.selectedPerson = person;
      this.isYear = false;
      this.personVacations = await this.personService.getVacations(person);
      this.personVacationCount = await this.personService.getVacationsCountSince(person);
      this.selectionChangeEmitter.next(person);
    } catch (error) {
      throw error;
    }
  }

  selectYear(year) {
    this.selectedYear = year;
    this.isYear = true;
    this.selectionChangeEmitter.next(year);
  }

  usePerson() {
    this.isYear = false;
  }

  getSelectedIdentifier() {
    if(this.isYear && this.selectedYear) {
      return this.selectedYear.year;
    } else if (this.selectedPerson) {
      return this.selectedPerson.name;
    }
    return null;
  }

  async toggleVacations(selectedDays) {
    try {
      await this.personService.toggleVacations(this.selectedPerson, selectedDays, this.personVacations);
      this.personVacations = await this.personService.getVacations(this.selectedPerson);
      this.personVacationCount = await this.personService.getVacationsCountSince(this.selectedPerson);
    } catch (error) {
      throw error;
    }
  }
}
