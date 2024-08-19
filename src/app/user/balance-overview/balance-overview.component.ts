import { Component, OnInit } from '@angular/core';
import { BalanceOverview, UserService } from '../services/user.service';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
Chart.register(...registerables);

@Component({
  selector: 'app-balance-overview',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './balance-overview.component.html',
  styleUrl: './balance-overview.component.scss'
})
export class BalanceOverviewComponent implements OnInit {
  balanceOverview: BalanceOverview | undefined;
  chart: Chart | undefined;
  selectedYear: number = 2024; // Default to current year
  years: number[] = [2024, 2023]; // Available years

  constructor(private balanceOverviewService: UserService,private toastr: ToastrService) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.balanceOverviewService.getBalanceOverview(this.selectedYear).subscribe({
      next: (res) => {
        if (res.statusCode === 200) {
          this.balanceOverview = res.data;
          this.createChart();
        } else {
          this.toastr.error(res.message);
        }
      },
      error: (err) => {
        this.toastr.error(err.message);
      }
    });
  }

  onYearChange() {
    this.fetchData();
  }

  createChart() {
    if (!this.balanceOverview) return;

    const ctx = document.getElementById('balanceChart') as HTMLCanvasElement;
    
    if (this.chart) {
      this.chart.destroy(); // Destroy existing chart if it exists
    }

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.balanceOverview.monthlyData.map(d => d.monthName),
        datasets: [
          {
            label: 'Revenue',
            data: this.balanceOverview.monthlyData.map(d => d.revenue),
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            fill: false
          },
          {
            label: 'Expenses',
            data: this.balanceOverview.monthlyData.map(d => d.expenses),
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.1,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '$' + value;
              }
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom'
          }
        }
      }
    });
  }
}
