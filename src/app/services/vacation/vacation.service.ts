import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacationService {

  totalVacations = 20;
  publicHolidays: any = [];
  years: any = [];

  yearsEmitter: Subject<any> = new Subject();

  constructor(private dbService: DatabaseService) { 
    this.getPublicHolidays().then().catch(
      (err) => console.error(err)
    );
    this.getYears();
  }

  async getPublicHolidays() {
    try {
      this.publicHolidays = await this.dbService.getPublicHolidays();
    } catch (error) {
      throw error;
    }
  }

  getYears() {
    this.dbService.getYears().then((years) => {
      this.years = years;
      this.yearsEmitter.next(years)
    });
  }

  insertYear(year) {
    this.dbService.insertYear(year).then(() => {
      this.getYears()
    }).catch((err) => 
      console.error(err)
    );
  }
  updateYear(year) {
    this.dbService.updateYear(year).then(() => {
      this.getYears()
    }).catch((err) => 
      console.error(err)
    );
  }
  deleteYear(year) {
    this.dbService.deleteYear(year).then(() => {
      this.getYears()
    }).catch((err) => 
      console.error(err)
    );
  }

  calcBusinessDays(startDate, endDate) { 
    let day = startDate;
    let businessDays = {};
  
    while (day.isSameOrBefore(endDate,'day')) {
      if (!this.isFreeDay(day)) {
        if(businessDays[day.year()]) {
          businessDays[day.year()]++;
        } else {
          businessDays[day.year()] = 1;
        }
      };
      day.add(1,'d');
    }
    return businessDays;
  }

  isFreeDay(day) {
    return day.day()==0 || day.day()==6 || this.publicHolidays.includes(day.format('YYYY-MM-DD'));
  }

  getVacationInfo(start, end, takenVacationDays, current_vacationDays) {
    let businessDays = this.calcBusinessDays(start, end);
    
    let vacationDays = 0;
    for(let year in businessDays) {
      let vacationInc = this.round(this.totalVacations / this.getTotalBusinessDays(year),2);
      vacationDays += businessDays[year] * vacationInc;
    }
    vacationDays = this.round(vacationDays, 2);
    let vacationsRemaining = vacationDays - takenVacationDays + current_vacationDays;
    vacationsRemaining = this.round(vacationsRemaining, 2);

    return {
      previously_had: current_vacationDays,
      taken: takenVacationDays, 
      remaining: vacationsRemaining, 
      gathered: vacationDays
    };
  }

  round(number, decimals) {
    const multiplier = Math.pow(10, decimals);
    return Math.round(number * multiplier) / multiplier;
  }

  getTotalBusinessDays(year) {
    for(let item of this.years){
      if(item.year == year) {
        return item.business_days;
      }
    }
    return NaN;
  }

  async toggleHolidays(dayArray) {
    try {
      let holidaysToRemove = [];
      let holidaysToAdd = [];
      dayArray.forEach(element => {
        let elementPlace = this.publicHolidays.indexOf(element);
        if(elementPlace > -1) {
          holidaysToRemove.push(element);
        } else {
          holidaysToAdd.push(element);
        }
      });
  
      await this.dbService.deletePublicHolidays(holidaysToRemove);
      await this.dbService.insertPublicHolidays(holidaysToAdd);
      await this.getPublicHolidays();
    } catch (error) {
      throw error;
    }
  }
}
