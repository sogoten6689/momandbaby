import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppovedTopicComponent } from './appoved-topic.component';

describe('AppovedTopicComponent', () => {
  let component: AppovedTopicComponent;
  let fixture: ComponentFixture<AppovedTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppovedTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppovedTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
