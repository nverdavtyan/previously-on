import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import { Movies } from '../models/movies';

const httpOptions= {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    "X-BetaSeries-Key": `bae9b5613db8`,
})
}

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  
 private baseApiUrl = 'https://api.betaseries.com/shows/list?v=3.0&order=popularity&filter=new`';
 private categoriesApiUrl = 'https://api.betaseries.com/shows/genres?v=3.0';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<any[]> {
    return this.http.get<any[]>(this.baseApiUrl,httpOptions)
  }

  getCategories() {
    return this.http.get(this.categoriesApiUrl,httpOptions)
  }


}
