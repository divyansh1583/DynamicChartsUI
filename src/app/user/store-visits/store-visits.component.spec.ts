import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreVisitsComponent } from './store-visits.component';

describe('StoreVisitsComponent', () => {
  let component: StoreVisitsComponent;
  let fixture: ComponentFixture<StoreVisitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreVisitsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StoreVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
