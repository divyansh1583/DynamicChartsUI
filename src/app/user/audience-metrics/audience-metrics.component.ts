import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';
import { AudienceMetricsDTO } from '../../shared/modals/charts.modal';
import { ToastrService } from 'ngx-toastr';

Chart.register(...registerables);

@Component({
  selector: 'app-audience-metrics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audience-metrics.component.html',
  styleUrls: ['./audience-metrics.component.scss']
})
export class AudienceMetricsComponent implements OnInit {
  metrics: AudienceMetricsDTO = {
    avg_Session: 0,
    conversion_Rate: 0,
    avg_Session_Duration_Seconds: 0,
    avg_Session_Increase_Percentage: 0,
    conversion_Rate_Increase_Percentage: 0,
    avg_Session_Duration_Increase_Percentage: 0,
    monthlyData: []
  };
  chart: Chart | undefined;

  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadMetricsData();
  }

  loadMetricsData(filter: string = 'ALL'): void {
    this.userService.getAudienceMetrics(filter).subscribe({
      next: (res) => {
        if (res.statusCode === 200) {
          this.metrics = res.data;
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

  createChart(): void {
    const ctx = document.getElementById('audienceChart') as HTMLCanvasElement;

    if (this.chart) {
      this.chart.destroy();
    }

    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const lastYearData = this.metrics.monthlyData.filter(d => d.year === 2023).map(d => d.sessions);
    const currentYearData = this.metrics.monthlyData.filter(d => d.year === 2024).map(d => d.sessions);

    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Last Year',
            data: lastYearData,
            backgroundColor: 'rgba(54, 162, 235, 0.8)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 0,
            barThickness: 10,
          
          },
          {
            label: 'Current Year',
            data: currentYearData,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderColor: 'rgba(255, 255, 255, 1)',
            borderWidth: 0,
            barThickness: 10,
            borderRadius: { topLeft: 10, topRight: 10 }, 
            borderSkipped: false, 
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true,
            grid: {
              display: false,
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)',
            }
          },
          y: {
            stacked: true,
            display: false,
          }
        },
        plugins: {
          legend: {
            display: true,
          }
        },
      }
    };

    this.chart = new Chart(ctx, config);
  }
  formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  }
}