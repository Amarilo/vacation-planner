import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationDatesTableComponent } from './vacation-dates-table.component';

describe('VacationDatesTableComponent', () => {
  let component: VacationDatesTableComponent;
  let fixture: ComponentFixture<VacationDatesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacationDatesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacationDatesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
