import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data: any;
  constructor() { }

  setData(data: any) {
    this.data = data;
    console.log(this.data)
  }
 
  getData() {
    return this.data;
  }
}
