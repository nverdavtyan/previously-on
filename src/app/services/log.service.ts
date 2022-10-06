import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Md5 } from 'ts-md5';


@Injectable({
  providedIn: 'root'
})
export class LogService {
  apiKey = 'bae9b5613db8';
  url = 'https://api.betaseries.com/members/auth';

  constructor(private http: HttpClient) { }

  
  authData(login: string, password: string): Observable<any> {
    let body =
    {
      login:login,
      password:Md5.hashStr(password)
    }
    return this.http.post(`${this.url}?v=3.0&key=${this.apiKey}`, body).pipe(map(res => res));
  }


login(code:string){
  let body =
  {
    code:code,

  }
  return this.http.post(`https://api.betaseries.com/oauth/&key=${this.apiKey}`,body).pipe(map(res => res));
}
}
