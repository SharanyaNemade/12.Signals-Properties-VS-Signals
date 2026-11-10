import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataType } from './data-type';

describe('DataType', () => {
  let component: DataType;
  let fixture: ComponentFixture<DataType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataType],
    }).compileComponents();

    fixture = TestBed.createComponent(DataType);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
