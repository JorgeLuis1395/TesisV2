import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dislexia2Component } from './dislexia2.component';

describe('Dislexia2Component', () => {
  let component: Dislexia2Component;
  let fixture: ComponentFixture<Dislexia2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dislexia2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dislexia2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
