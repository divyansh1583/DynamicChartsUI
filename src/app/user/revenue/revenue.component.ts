import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';
Chart.register(...registerables);

@Component({
  selector: 'app-revenue',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './revenue.component.html',
  styleUrl: './revenue.component.scss'
})

  export class RevenueComponent implements OnInit {
    revenueData: any;
    monthlyData: any;
    chart: Chart | undefined;
  
    constructor(private userService: UserService) {}
  
    ngOnInit(): void {
      this.loadRevenueData();
      this.loadMonthlyData();
    }
  
    loadRevenueData(filter: string = 'ALL'): void {
      this.userService.getRevenueData(filter).subscribe(
        (data) => {
          this.revenueData = data;
        },
        (error) => console.error('Error fetching revenue data:', error)
      );
    }
  
    loadMonthlyData(): void {
      this.userService.getMonthlyRevenueData().subscribe(
        (data) => {
          this.monthlyData = data;
          this.createChart();
        },
        (error) => console.error('Error fetching monthly data:', error)
      );
    }
  
    createChart(): void {
      const ctx = document.getElementById('revenueChart') as HTMLCanvasElement;
      
      if (this.chart) {
        this.chart.destroy();
      }
  
      const config: ChartConfiguration = {
        type: 'line',
        data: {
          labels: this.monthlyData.months,
          datasets: [
            {
              label: 'Orders',
              data: this.monthlyData.orders,
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
              yAxisID: 'y-axis-1',
            },
            {
              label: 'Earnings',
              data: this.monthlyData.earnings,
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              type: 'bar',
              yAxisID: 'y-axis-2',
            },
            {
              label: 'Refunds',
              data: this.monthlyData.refunds,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
              type: 'line',
              yAxisID: 'y-axis-1',
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            'y-axis-1': {
              type: 'linear',
              position: 'left',
              title: {
                display: true,
                text: 'Orders & Refunds'
              }
            },
            'y-axis-2': {
              type: 'linear',
              position: 'right',
              title: {
                display: true,
                text: 'Earnings'
              }
            }
          }
        }
      };
  
      this.chart = new Chart(ctx, config);
    }
 
  
}