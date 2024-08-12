import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesByLocationsComponent } from './sales-by-locations.component';

describe('SalesByLocationsComponent', () => {
  let component: SalesByLocationsComponent;
  let fixture: ComponentFixture<SalesByLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesByLocationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesByLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
