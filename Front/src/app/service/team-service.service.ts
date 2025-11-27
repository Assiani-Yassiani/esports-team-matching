import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private apiUrl = 'http://localhost:8080/api/teams';

  constructor(private http: HttpClient) { }

  createTeam(team: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, team);
  }

  getAllTeams(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getTeamsByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }

  getTeamById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateTeam(id: number, team: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, team);
  }

  deleteTeam(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  view(id: number, view: any) {

    return this.http.post<any>(`${this.apiUrl}/view/${id}`, view);
  }
}
