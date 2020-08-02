import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionesnewComponent } from './calificacionesnew.component';

describe('CalificacionesnewComponent', () => {
  let component: CalificacionesnewComponent;
  let fixture: ComponentFixture<CalificacionesnewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalificacionesnewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalificacionesnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
