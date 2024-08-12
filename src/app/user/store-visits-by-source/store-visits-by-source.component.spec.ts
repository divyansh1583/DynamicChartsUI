import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreVisitsBySourceComponent } from './store-visits-by-source.component';

describe('StoreVisitsBySourceComponent', () => {
  let component: StoreVisitsBySourceComponent;
  let fixture: ComponentFixture<StoreVisitsBySourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreVisitsBySourceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StoreVisitsBySourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
