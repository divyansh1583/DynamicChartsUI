import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudienceMetricsComponent } from './audience-metrics.component';

describe('AudienceMetricsComponent', () => {
  let component: AudienceMetricsComponent;
  let fixture: ComponentFixture<AudienceMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudienceMetricsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AudienceMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
