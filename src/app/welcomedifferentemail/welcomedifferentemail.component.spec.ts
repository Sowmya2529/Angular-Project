import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomedifferentemailComponent } from './welcomedifferentemail.component';

describe('WelcomedifferentemailComponent', () => {
  let component: WelcomedifferentemailComponent;
  let fixture: ComponentFixture<WelcomedifferentemailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomedifferentemailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomedifferentemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
