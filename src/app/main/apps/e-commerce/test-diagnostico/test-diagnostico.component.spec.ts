import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDiagnosticoComponent } from './test-diagnostico.component';

describe('TestDiagnosticoComponent', () => {
  let component: TestDiagnosticoComponent;
  let fixture: ComponentFixture<TestDiagnosticoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDiagnosticoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDiagnosticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
