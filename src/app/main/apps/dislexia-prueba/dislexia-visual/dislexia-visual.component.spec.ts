import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DislexiaVisualComponent } from './dislexia-visual.component';

describe('DislexiaVisualComponent', () => {
  let component: DislexiaVisualComponent;
  let fixture: ComponentFixture<DislexiaVisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DislexiaVisualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DislexiaVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
