import { Component, OnInit } from '@angular/core';
import { UiSelectionService } from '../services/ui-selection/ui-selection.service';
import { PersonService } from '../services/person/person.service';
import { VacationService } from '../services/vacation/vacation.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  selected: any = {};
  deleteModalOpen = false;

  addPersonModalOpen = false;
  newPerson: any = {};

  addYearModalOpen= false;
  newYear: any = {};

  constructor(private uiSelectionService: UiSelectionService, private personService: PersonService, private yearService: VacationService) { }

  ngOnInit() {
    this.selected = this.uiSelectionService.getSelected();
    this.uiSelectionService.selectionChangeEmitter.subscribe(
      (selection) => this.selected = Object.assign({}, selection)
    );
  }

  isYear() {
    return this.uiSelectionService.isYear;
  }

  getSelectedIdentifier() {
    return this.uiSelectionService.getSelectedIdentifier();
  }

  deleteSelected() {
    if ( this.isYear() ) {
      this.yearService.deleteYear(this.selected);
    } else {
      this.personService.deletePerson(this.selected);
    }
    this.deleteModalOpen = false;
  }

  onPersonUpdate() {
    this.personService.updatePerson(this.selected);
  }

  onYearUpdate() {
    this.yearService.updateYear(this.selected);
  }

  addPerson() {
    this.personService.insertPerson(this.newPerson);
    this.newPerson = {};
    this.addPersonModalOpen = false;
  }

  addYear() {
    this.yearService.insertYear(this.newYear)
    this.newYear = {};
    this.addYearModalOpen = false;
  }

  validPerson(person) {
    if(person.name && person.from_date && typeof person.vacation_days == 'number' && person.vacation_days >= 0) 
      return true;
    return false;
  }

  validYear(year) {
    if(year.year && year.business_days && year.year > 2000) 
      return true;
    return false;
  }

}
