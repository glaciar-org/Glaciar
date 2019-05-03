import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Amch4LbComponent } from './amch4-lb.component';

describe('Amch4LbComponent', () => {
  let component: Amch4LbComponent;
  let fixture: ComponentFixture<Amch4LbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Amch4LbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Amch4LbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
