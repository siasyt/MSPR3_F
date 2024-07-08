import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredictService {
  private baseUrl = 'http://localhost:5000/predict';

  constructor(private http: HttpClient) { }

  uploadFile(formData: FormData, headers: HttpHeaders): Observable<any> {
    return this.http.post(`${this.baseUrl}/upload`, formData, { headers: headers });
  }

  confirmPrediction(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/confirm`, data);
  }

  rejectPrediction(predictionId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reject`, { prediction_id: predictionId });
  }
}



