import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RevenueComponent } from './revenue/revenue.component';
import { AudienceMetricsComponent } from './audience-metrics/audience-metrics.component';
import { SessionsByCountriesComponent } from './sessions-by-countries/sessions-by-countries.component';
import { BalanceOverviewComponent } from './balance-overview/balance-overview.component';
import { SalesByLocationsComponent } from './sales-by-locations/sales-by-locations.component';
import { StoreVisitsBySourceComponent } from './store-visits-by-source/store-visits-by-source.component';
import { AddDataComponent } from './add-data/add-data.component';

const routes: Routes = [
  {path: '', 
    component: UserComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: DashboardComponent },
      { path: 'revenue', component: RevenueComponent },
      { path: 'audience-metrics', component: AudienceMetricsComponent },
      { path: 'sessions-by-countries', component: SessionsByCountriesComponent },
      { path: 'balance-overview', component: BalanceOverviewComponent },
      { path: 'sales-by-locations', component: SalesByLocationsComponent },
      { path: 'store-visits-by-source', component: StoreVisitsBySourceComponent },
      {path: 'add-data',component : AddDataComponent},
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
