import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private apiUrl = 'https://localhost:7042/api/combochart';
  constructor(private http:HttpClient) { }

  getChartData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
