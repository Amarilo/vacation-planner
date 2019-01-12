import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeLT from '@angular/common/locales/lt';

registerLocaleData(localeLT);

import { AppComponent } from './app.component';
import { MonthViewComponent } from './month-view/month-view.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideNavPersonsComponent } from './side-nav-persons/side-nav-persons.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { VacationDatesTableComponent } from './vacation-dates-table/vacation-dates-table.component';

@NgModule({
  declarations: [
    AppComponent,
    MonthViewComponent,
    SideNavPersonsComponent,
    AdminPageComponent,
    VacationDatesTableComponent
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'lt'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
