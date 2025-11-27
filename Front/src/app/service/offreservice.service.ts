import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Offre {
  id: number;
  comments: string;
  comments2: string;
  description: string;
  teamType: string;
  participation: boolean;
  remunere: boolean;
  app: any
  actif: boolean
}

@Injectable({
  providedIn: 'root'
})
export class OffreserviceService {

  private apiUrl = 'http://localhost:8080/api/offres';

  constructor(private http: HttpClient) { }

  createOffre(offre: Offre, id: number): Observable<Offre> {
    return this.http.post<Offre>(`${this.apiUrl}/${id}`, offre);
  }

  updateOffre(id: number, offre: Offre): Observable<Offre> {
    return this.http.put<Offre>(`${this.apiUrl}/${id}`, offre);
  }

  deleteOffre(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getOffreById(id: number): Observable<Offre> {
    return this.http.get<Offre>(`${this.apiUrl}/${id}`);
  }

  getAllOffres(): Observable<Offre[]> {
    return this.http.get<Offre[]>(this.apiUrl);
  }
  actif(offer: any) {
    return this.http.put(this.apiUrl + "/actif", offer)

  }
}
