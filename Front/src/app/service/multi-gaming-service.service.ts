import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultiGamingServiceService {


  private apiUrl = 'http://localhost:8080/api/multigaming';

  constructor(private http: HttpClient) { }

  createMultiGaming(multiGaming: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, multiGaming);
  }

  getAllMultiGamings(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getMultiGamingsByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }

  getMultiGamingById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateMultiGaming(id: number, multiGaming: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, multiGaming);
  }

  deleteMultiGaming(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  view(id: number, view: any) {

    return this.http.post<any>(`${this.apiUrl}/view/${id}`, view);
  }
}
