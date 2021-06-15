import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionItemComponent } from './function-item.component';

describe('FunctionItemComponent', () => {
  let component: FunctionItemComponent;
  let fixture: ComponentFixture<FunctionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunctionItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
