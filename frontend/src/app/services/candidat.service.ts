import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {
  private apiUrl = 'https://api401.alwaysdata.net/backend/api/src/candidats.php';

  constructor(private http: HttpClient) {}

  // Récupérer tous les candidats
  getCandidats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?action=getCandidats`);
  }

  // Ajouter un nouveau candidat
  ajouterCandidat(candidat: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}?action=ajouterCandidat`, candidat);
  }
}
