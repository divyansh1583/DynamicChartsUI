import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { SalesByLocationsDTO, UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { ChartType, GoogleChartComponent, GoogleChartsModule } from 'angular-google-charts';
import { ToastrService } from 'ngx-toastr';
Chart.register(...registerables);

@Component({
  selector: 'app-sales-by-locations',
  standalone: true,
  imports: [CommonModule,GoogleChartsModule],
  templateUrl: './sales-by-locations.component.html',
  styleUrl: './sales-by-locations.component.scss'
})
export class SalesByLocationsComponent implements OnInit {
  chartType: ChartType = ChartType.GeoChart;
  chartData: any[] = [];
  chartColumns = ['Country', 'Sales Percentage'];
  chartOptions = {
    region: 'world', // You can use 'US' for a US map, or '001' for the whole world
    displayMode: 'regions', // Can also try 'markers'
    colorAxis: { colors: ['#e0f7fa', '#006064'] }, // Light to dark blue
    backgroundColor: '#ffffff', // Map background
    datalessRegionColor: '#f0f0f0', // Color for regions with no data
    defaultColor: '#f5f5f5',
    resolution: 'countries',
    keepAspectRatio: true,
    tooltip: { textStyle: { color: '#444444' }, showColorCode: true },
  };

  salesList: SalesByLocationsDTO[] = [];

  constructor(private salesService: UserService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.salesService.getSalesByLocations().subscribe({
      next: (res) => {
        if (res.statusCode === 200) {
          this.salesList = res.data;
          this.chartData = this.salesList.map((item) => [item.countryName, item.salesPercentage]);
          this.salesList = res.data;
        } else {
          this.toastr.error(res.message);
        }
      },
      error: (err) => {
        this.toastr.error(err.message);
      }
    });
  }
}
 