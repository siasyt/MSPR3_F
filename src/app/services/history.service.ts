import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private baseUrl = 'http://localhost:5000/api'; // 替换为您的 API URL

  constructor(private http: HttpClient) { }

  getHistory(): Observable<any[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('JWT token is missing');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any[]>(`${this.baseUrl}/history`, { headers });
  }

  deleteRecord(filename: string): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('JWT token is missing');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete(`${this.baseUrl}/history/${filename}`, { headers });
  }
}
