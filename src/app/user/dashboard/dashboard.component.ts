import { Component } from '@angular/core';
import { AudienceMetricsComponent } from "../audience-metrics/audience-metrics.component";
import { BalanceOverviewComponent } from "../balance-overview/balance-overview.component";
import { RevenueComponent } from "../revenue/revenue.component";
import { SalesByLocationsComponent } from "../sales-by-locations/sales-by-locations.component";
import { SessionsByCountriesComponent } from "../sessions-by-countries/sessions-by-countries.component";
import { StoreVisitsBySourceComponent } from "../store-visits-by-source/store-visits-by-source.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AudienceMetricsComponent, BalanceOverviewComponent, RevenueComponent, SalesByLocationsComponent, SessionsByCountriesComponent, StoreVisitsBySourceComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
