import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatadisplayComponent } from './datadisplay.component';

describe('DatadisplayComponent', () => {
  let component: DatadisplayComponent;
  let fixture: ComponentFixture<DatadisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatadisplayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatadisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
