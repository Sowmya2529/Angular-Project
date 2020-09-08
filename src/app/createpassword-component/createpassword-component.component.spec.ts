import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatepasswordComponentComponent } from './createpassword-component.component';

describe('CreatepasswordComponentComponent', () => {
  let component: CreatepasswordComponentComponent;
  let fixture: ComponentFixture<CreatepasswordComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatepasswordComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatepasswordComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
