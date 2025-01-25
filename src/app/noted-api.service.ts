import {Injectable} from '@angular/core';
import {ImageInterpretation} from './response-interfaces';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class NotedApiService {
    private baseUrl: string = 'http://localhost:8080';

    constructor(private http: HttpClient) {}

    getImageInterpretation(UplaodFile: File): Observable<ImageInterpretation[]> {
        return this.http.get<ImageInterpretation[]>(`${this.baseUrl}/upload/${UplaodFile}`);
    }
}


