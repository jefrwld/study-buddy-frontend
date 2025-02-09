import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root', // Stellt den Service global bereit
})
export class NotedApiService {
  private baseUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  uploadFiles(files: File[]): Observable<any> {
    const formData = new FormData();
    files.forEach(file => formData.append('file[]', file, file.name));
    return this.http.post(`${this.baseUrl}/upload`, formData).pipe(
      catchError(error => {
        console.log("Upload fehlgeschlagen..", error);
        return throwError(() => new Error('Fehler beim Hochladen der Datei'));
      })
    )
  }
}
