import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
interface CountryData {
  countryName: string;
  sessions: number;
}
@Component({
  selector: 'app-sessions-by-countries',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sessions-by-countries.component.html',
  styleUrl: './sessions-by-countries.component.scss'
})

export class SessionsByCountriesComponent {
  countries: CountryData[] = [];
  maxSessions: number = 0;
  currentFilter: string = 'ALL';

  constructor(
    private userService: UserService,
    private toastr:ToastrService
  ) {}

  ngOnInit() {
    this.loadData('ALL');
  }

  loadData(filter: string) {
    this.currentFilter = filter;
    this.userService.getSessionsByCountries(filter).subscribe({
      next: (res) => {
        if (res.statusCode === 200) {
          this.countries = res.data;
          this.maxSessions = Math.max(...this.countries.map(c => c.sessions));
        } else {
          this.toastr.error(res.message);
        }
      },
      error: (err) => {
        this.toastr.error(err.message);
      }
    });
  }

  getBarWidth(sessions: number): string {
    return `${(sessions / this.maxSessions) * 100}%`;
  }
}
