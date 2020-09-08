import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeselectemailComponent } from './welcomeselectemail.component';

describe('WelcomeselectemailComponent', () => {
  let component: WelcomeselectemailComponent;
  let fixture: ComponentFixture<WelcomeselectemailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeselectemailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeselectemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
