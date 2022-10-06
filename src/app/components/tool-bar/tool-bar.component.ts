import { Component, OnInit } from '@angular/core';
import {Route, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {
  pageTitle = "Home"
  
  user: any;
  dataShared: any;
constructor(private router: Router, private data: DataService, ) {
  this.user = JSON.parse(localStorage.getItem('currentUser') || '[]');
  this.dataShared = this.data.getData();
   console.log(this.dataShared)

 }
routes =this.router.config.map((route:Route)=>route?.path || 'Home')

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser') || '[]');
    this.dataShared = this.data.getData();
     console.log(this.user,'user')
  }

  changeRoute(route:string):void{
    this.pageTitle = route;
    const pathToGo = route === 'Home' ? '/' : route;
    this.router.navigate([pathToGo])
  }
  switch(){
    this.dataShared = this.data.getData();
  }
  logout(){
    this.user ;
    this.data.setData(null);
    this.dataShared = null;
     console.log(this.user)
    localStorage.removeItem('currentUser');
    this.router.navigate(['/'])
    window.location.reload()
  
  }



}