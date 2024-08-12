import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionsByCountriesComponent } from './sessions-by-countries.component';

describe('SessionsByCountriesComponent', () => {
  let component: SessionsByCountriesComponent;
  let fixture: ComponentFixture<SessionsByCountriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionsByCountriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SessionsByCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
