import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

export interface SalesByLocationsDTO {
  countryName: any;
  salesPercentage: any;
}

export interface BalanceOverview {
  revenue: number;
  expenses: number;
  profitRatio: number;
  monthlyData: MonthlyBalanceData[];
}

export interface MonthlyBalanceData {
  monthName: string;
  revenue: number;
  expenses: number;
}


@Injectable({
  providedIn: 'root'
})


export class UserService {

  private apiUrl = 'https://localhost:7042/api/Charts';
  constructor(private http: HttpClient) { }

  getRevenueData(filter: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/revenue`, { params: { filter } });
  }

  getMonthlyRevenueData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/monthly-revenue`);
  }

  getAudienceMetrics(filter: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/audience-metrics?filter=${filter}`);
  }

  getSessionsByCountries(filter: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/sessions-by-countries?filter=${filter}`)
      .pipe(
        catchError(this.handleError)
      );
  }

getBalanceOverview(year: number): Observable<BalanceOverview> {
  return this.http.get<BalanceOverview>(`${this.apiUrl}/balance-overview?year=${year}`);
}



  getSalesByLocations(): Observable<SalesByLocationsDTO[]> {
    return this.http.get<SalesByLocationsDTO[]>(`${this.apiUrl}/sales-by-locations`);
  }

  getStoreVisitsBySource(): Observable<any> {
    return this.http.get(`${this.apiUrl}/store-visits-by-source`);
  }
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}




