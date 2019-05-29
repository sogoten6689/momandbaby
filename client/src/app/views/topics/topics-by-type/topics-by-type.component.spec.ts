import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicsByTypeComponent } from './topics-by-type.component';

describe('TopicsByTypeComponent', () => {
  let component: TopicsByTypeComponent;
  let fixture: ComponentFixture<TopicsByTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicsByTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicsByTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
