import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DislexiaTestComponent } from './dislexia-test.component';

describe('DislexiaTestComponent', () => {
  let component: DislexiaTestComponent;
  let fixture: ComponentFixture<DislexiaTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DislexiaTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DislexiaTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
