import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private apiUrl = 'https://localhost:7042/api';
constructor(private http: HttpClient) {}

getRevenueData(filter: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/Charts/revenue`, { params: { filter } });
}

getMonthlyRevenueData(): Observable<any> {
  return this.http.get(`${this.apiUrl}/Charts/monthly-revenue`);
}
}
