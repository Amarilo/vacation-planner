import { Component, OnInit } from '@angular/core';
import { UiSelectionService } from '../services/ui-selection/ui-selection.service';

@Component({
  selector: 'app-vacation-dates-table',
  templateUrl: './vacation-dates-table.component.html',
  styleUrls: ['./vacation-dates-table.component.css']
})
export class VacationDatesTableComponent implements OnInit {

  constructor(private uiSelectionService: UiSelectionService) { }

  ngOnInit() {
  }

  getVacationDates() {
    return this.uiSelectionService.personVacations;
  }

}
