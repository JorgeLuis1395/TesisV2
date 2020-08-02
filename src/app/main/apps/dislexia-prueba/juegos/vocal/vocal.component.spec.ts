import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VocalComponent } from './vocal.component';

describe('VocalComponent', () => {
  let component: VocalComponent;
  let fixture: ComponentFixture<VocalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VocalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
