import { Component, OnInit, Input } from '@angular/core';
import { PersonService } from '../services/person/person.service';
import { UiSelectionService } from '../services/ui-selection/ui-selection.service';
import { VacationService } from '../services/vacation/vacation.service';

@Component({
  selector: 'app-side-nav-persons',
  templateUrl: './side-nav-persons.component.html',
  styleUrls: ['./side-nav-persons.component.css']
})
export class SideNavPersonsComponent implements OnInit {

  persons:any = [];

  years: any = [];

  @Input() showYears = true;

  constructor(private personService: PersonService, private vacationService: VacationService, private uiSelectionService: UiSelectionService) { }

  ngOnInit() {
    this.personService.personsEmitter.subscribe(
      (persons) => {
        this.persons = persons;
        if(persons.length > 0)
          this.uiSelectionService.selectPerson(this.persons[0]);
      }
    )
    this.vacationService.yearsEmitter.subscribe(
      (years) => this.years = years
    );
  }

  isSelected(identifier) {
    const selected = this.uiSelectionService.getSelected();
    if (selected && selected.name) {
      return identifier === selected.name;
    } else if (selected && selected.year) {
      return identifier === selected.year;
    }
    return false;
  }

  selectPerson(person) {
    this.uiSelectionService.selectPerson(person).then().catch(
      (err) => console.error('side-nav-select-person', err)
    );
  }

  selectYear(year) {
    this.uiSelectionService.selectYear(year);
  }

}
