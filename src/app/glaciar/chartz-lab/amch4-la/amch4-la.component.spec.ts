import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Amch4LaComponent } from './amch4-la.component';

describe('Amch4LaComponent', () => {
  let component: Amch4LaComponent;
  let fixture: ComponentFixture<Amch4LaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Amch4LaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Amch4LaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
