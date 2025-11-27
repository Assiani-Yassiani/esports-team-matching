import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  private apiUrl = 'http://localhost:8080/api/resumes';

  constructor(private http: HttpClient) { }

  createResume(resume: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, resume);
  }

  getAllResumes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getResumesByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }

  getResumeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateResume(id: number, resume: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, resume);
  }

  deleteResume(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  view(id: number, view: any) {

    return this.http.post<any>(`${this.apiUrl}/view/Offer/${id}`, view);
  }
  actif(resume: any) {
    return this.http.put(this.apiUrl + "/actif", resume)


  }
}
