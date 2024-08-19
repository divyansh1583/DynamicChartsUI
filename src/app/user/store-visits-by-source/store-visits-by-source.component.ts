import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

Chart.register(...registerables);

@Component({
  selector: 'app-store-visits-by-source',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './store-visits-by-source.component.html',
  styleUrls: ['./store-visits-by-source.component.scss']
})
export class StoreVisitsBySourceComponent implements OnInit {
  chart: Chart<'doughnut'> | undefined; // Change to 'doughnut' type

  constructor(private userService: UserService, private toastr: ToastrService) {}


  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.userService.getStoreVisitsBySource().subscribe({
      next: (res) => {
        if (res.statusCode === 200) {
          this.createChart(res.data);
        } else {
          this.toastr.error(res.message);
        }
      },
      error: (err) => {
        this.toastr.error(err.message);
      }
    });
  }

  createChart(data: any) {
    const ctx = document.getElementById('storeVisitsChart') as HTMLCanvasElement;
    if (this.chart) {
      this.chart.destroy();
    }
    const config: ChartConfiguration<'doughnut'> = { // Specify 'doughnut' type here
      type: 'doughnut',
      data: {
        labels: data.map((item: any) => item.sourceType),
        datasets: [{
          data: data.map((item: any) => item.percentage),
          backgroundColor: [
            '#3366cc', '#dc3912', '#ff9900', '#109618', '#990099'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          }
        }
      }
    };
    this.chart = new Chart(ctx, config);
  }
}
