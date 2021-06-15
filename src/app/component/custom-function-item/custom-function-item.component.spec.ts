import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFunctionItemComponent } from './custom-function-item.component';

describe('CustomFunctionItemComponent', () => {
  let component: CustomFunctionItemComponent;
  let fixture: ComponentFixture<CustomFunctionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomFunctionItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFunctionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
