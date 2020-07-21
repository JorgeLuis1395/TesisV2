import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Memoria2Component } from './memoria2.component';

describe('Memoria2Component', () => {
  let component: Memoria2Component;
  let fixture: ComponentFixture<Memoria2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Memoria2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Memoria2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
