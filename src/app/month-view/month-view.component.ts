import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { VacationService } from '../services/vacation/vacation.service';
import { UiSelectionService } from '../services/ui-selection/ui-selection.service';
import { PersonService } from '../services/person/person.service';

@Component({
  selector: 'app-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.css']
})
export class MonthViewComponent implements OnInit {

  monthData = [];
  weekDayNames = [
    'Pirmadienis',
    'Antradienis',
    'Trečiadienis',
    'Ketvirtadienis',
    'Penktadienis',
    'Šeštadienis',
    'Sekmadienis'
  ];
  
  date = moment();
  selectedDate = this.date.toDate();

  selectedDays = [];
  selectedStart: any;
  vacations: any = {};

  selectionIsHolidays = false;

  constructor(private vacationService: VacationService, private uiSelectionService: UiSelectionService, private personService: PersonService) { }

  ngOnInit() {
    this.uiSelectionService.selectionChangeEmitter.subscribe(
      (person) => { if(person.name) this.setupMonth() }
    );
  }

  updatePerson(){
    let today = moment();
    let person = this.uiSelectionService.getSelected();
    this.personService.getVacationsCountTillNow(person).then((vacationCount) => {
      let vacations = this.calcVacationInfo(today, vacationCount);
      person.from_date = today.format('YYYY-MM-DD');
      person.vacation_days = vacations.remaining;
      this.personService.updatePerson(person);
    }).catch(
      (err) => console.error(err)
    );
  }

  changeDate() {
    this.date = moment(this.selectedDate);
    this.setupMonth();
  }

  select(day){
    if(this.selectedStart && this.selectedStart.isSameOrBefore(day, 'day')) {
      this.calculateSelection(day);
      if(this.selectionIsHolidays) {
        this.vacationService.toggleHolidays(this.selectedDays).then(() => {
          this.vacations = this.calcVacationInfo(this.selectedDate, this.uiSelectionService.personVacationCount);
        }).catch(
          (err) => console.error('month-view-select-holidays', err)
        );;
      } else {
        this.uiSelectionService.toggleVacations(this.selectedDays).then(() => {
          this.vacations = this.calcVacationInfo(this.selectedDate, this.uiSelectionService.personVacationCount);
        }).catch(
          (err) => console.error('month-view-select-vacation', err)
        );
      }
      this.selectedStart = null;
      this.selectedDays = [];
    } else {
      if(this.selectionIsHolidays) {
        this.selectedStart = day.clone();
        this.selectedDays.push(day.format('YYYY-MM-DD'));
      } else if (!this.selectionIsHolidays && day.isSameOrAfter(moment(this.uiSelectionService.selectedPerson.from_date), 'day')) {
        this.selectedStart = day.clone();
        this.selectedDays.push(day.format('YYYY-MM-DD'));
      }
    }
  }

  hover(day) {
    if(this.selectedStart && this.selectedStart.isSameOrBefore(day, 'day')){
      this.calculateSelection(day);
    }
  }

  calculateSelection(endDay) {
    this.selectedDays = [];
    let day = this.selectedStart.clone();
    while (day.isSameOrBefore(endDay,'day')) {
      if(this.selectionIsHolidays) {
        this.selectedDays.push(day.format('YYYY-MM-DD'));
      } else {
        if(!this.vacationService.isFreeDay(day))
          this.selectedDays.push(day.format('YYYY-MM-DD'));
      }
      day.add(1, 'day');
    } 
  }

  calcVacationInfo(date, vacationCount) {
    return this.vacationService.getVacationInfo(
      moment(this.uiSelectionService.selectedPerson.from_date), 
      date, 
      vacationCount, 
      this.uiSelectionService.selectedPerson.vacation_days
    );
  }

  setupMonth() {
    this.monthData = [];
    const start = this.getStartDate();
    const end = this.getEndDate();
    
    let day = start;
    let week = [];
    while (day.isSameOrBefore(end,'day')) {
      week.push(day.clone());
      if(week.length === 7) {
        this.monthData.push(week);
        week = [];
      }
      day.add(1, 'day');
    }
    this.vacations = this.calcVacationInfo(this.selectedDate, this.uiSelectionService.personVacationCount);
  }

  getStartDate() {
    let start = this.date.clone().startOf('month');
    if (start.day() !== 1) {
      let wkDay = start.day();
      if (wkDay === 0) {
        start.subtract(6, 'day');
      } else {
        start.subtract(wkDay-1, 'day');
      }
    }
    return start;
  }

  getEndDate() {
    let end = this.date.clone().endOf('month');
    let wkDay = end.day();
    if (wkDay !== 0) {
      end.add(7-wkDay, 'day');
    }
    return end;
  }

  isWeekend(day) {
    return day.day() == 6 || day.day() == 0 || this.vacationService.publicHolidays.includes(day.format('YYYY-MM-DD'));
  }

  isOtherMonth(day) {
    return day.month() !== this.date.month();
  }

  isVacation(day) {
    return this.uiSelectionService.personVacations.includes(day.format('YYYY-MM-DD'));
  }

  isSelected(day) {
    return this.selectedDays.includes(day.format('YYYY-MM-DD'));
  }

  isCurrent(day) {
    return day.isSame(this.selectedDate, 'day');
  }

  upMonth() {
    this.date.add(1, 'month');
    this.setupMonth();
  }

  downMonth() {
    this.date.subtract(1, 'month');
    this.setupMonth();
  }

}
