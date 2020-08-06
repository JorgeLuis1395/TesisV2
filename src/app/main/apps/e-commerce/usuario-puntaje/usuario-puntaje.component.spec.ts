import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioPuntajeComponent } from './usuario-puntaje.component';

describe('UsuarioPuntajeComponent', () => {
  let component: UsuarioPuntajeComponent;
  let fixture: ComponentFixture<UsuarioPuntajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioPuntajeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioPuntajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
