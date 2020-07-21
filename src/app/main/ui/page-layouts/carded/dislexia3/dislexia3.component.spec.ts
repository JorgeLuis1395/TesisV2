import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dislexia3Component } from './dislexia3.component';

describe('Dislexia3Component', () => {
  let component: Dislexia3Component;
  let fixture: ComponentFixture<Dislexia3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dislexia3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dislexia3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
