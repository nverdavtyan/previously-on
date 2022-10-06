import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyseriesComponent } from './myseries.component';

describe('MyseriesComponent', () => {
  let component: MyseriesComponent;
  let fixture: ComponentFixture<MyseriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyseriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyseriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
