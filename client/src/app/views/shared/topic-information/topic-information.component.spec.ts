import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicInformationComponent } from './topic-information.component';

describe('TopicInformationComponent', () => {
  let component: TopicInformationComponent;
  let fixture: ComponentFixture<TopicInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
