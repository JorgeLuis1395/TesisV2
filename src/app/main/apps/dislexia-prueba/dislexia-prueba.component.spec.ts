import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DislexiaPruebaComponent } from './dislexia-prueba.component';

describe('DislexiaPruebaComponent', () => {
  let component: DislexiaPruebaComponent;
  let fixture: ComponentFixture<DislexiaPruebaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DislexiaPruebaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DislexiaPruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
