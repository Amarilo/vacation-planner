import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavPersonsComponent } from './side-nav-persons.component';

describe('SideNavPersonsComponent', () => {
  let component: SideNavPersonsComponent;
  let fixture: ComponentFixture<SideNavPersonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideNavPersonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavPersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
