import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-revenue',
  standalone: true,
  imports: [],
  templateUrl: './revenue.component.html',
  styleUrl: './revenue.component.scss'
})
export class RevenueComponent implements OnInit {

  public chart : any;

  constructor (private userService : UserService){}

  ngOnInit(): void {
    this.userService.getChartData().subscribe(data => {
      this.createChart(data);
    });

    

}
createChart(chartData: any) {
  const ctx = document.getElementById('comboChart') as HTMLCanvasElement;
  this.chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartData.labels, // e.g., ['Jan', 'Feb', 'Mar', ...]
      datasets: [
        {
          label: 'Orders',
          type: 'bar',
          data: chartData.orders, // e.g., [90, 60, 75, ...]
          backgroundColor: 'rgba(75, 192, 192, 0.6)'
        },
        {
          label: 'Earnings',
          type: 'line',
          data: chartData.earnings, // e.g., [60, 55, 70, ...]
          borderColor: 'rgba(54, 162, 235, 1)',
          fill: false
        },
        {
          label: 'Refunds',
          type: 'line',
          data: chartData.refunds, // e.g., [10, 15, 12, ...]
          borderColor: 'rgba(255, 99, 132, 1)',
          borderDash: [5, 5],
          fill: false
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// API:formate
// {
//   "labels": ["Jan", "Feb", "Mar", ...],
//   "orders": [90, 60, 75, ...],
//   "earnings": [60, 55, 70, ...],
//   "refunds": [10, 15, 12, ...]
// }

  
}