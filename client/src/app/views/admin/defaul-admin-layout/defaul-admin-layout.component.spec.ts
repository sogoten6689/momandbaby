import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaulAdminLayoutComponent } from './defaul-admin-layout.component';

describe('DefaulAdminLayoutComponent', () => {
  let component: DefaulAdminLayoutComponent;
  let fixture: ComponentFixture<DefaulAdminLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaulAdminLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaulAdminLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
