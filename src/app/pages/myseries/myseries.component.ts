import { Component, OnInit } from '@angular/core';
import { SerieService, SearchType } from './../../services/serie.service';

@Component({
  selector: 'app-myseries',
  templateUrl: './myseries.component.html',
  styleUrls: ['./myseries.component.scss']
})
export class MyseriesComponent implements OnInit {
  title= 'pagination';
  myseries: any=[];
  page:number=1;
  count:number=0;
  tableSize:number=6; 
  tableSizes: any =[5,10,15,20,25];
  user: any;
  dataShared: any;
  constructor(
    private SerieService: SerieService,
  ) {

    this.user = JSON.parse(localStorage.getItem('currentUser') || '[]');
    console.log(this.user)
   }

  ngOnInit(): void {
    this.SerieService.searchMyData(this.user.user.id).subscribe((response)=> this.myseries = response);
    // console.log( this.myseries,'my series')
    console.log('user : '+this.user.user);
    console.log('token : '+this.user.token)
    console.log(this.myseries,'my series data')  
  }

  // ngDoCheck(): void {
  //  console.log(this.myseries,'my series data')  
  //  }

   onTableDataChange(event:any):void{
    this.page = event;

  }
  onTableSizeChange(event:any):void{
this.tableSize = event.target.value;
this.page = 1;

  }
}
