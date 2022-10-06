import { Component, OnInit } from '@angular/core';
import { Movies } from 'src/app/models/movies';
import { MoviesService } from 'src/app/services/movies-service.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { SerieService, SearchType } from './../../services/serie.service';
@Component({
  selector: 'app-movies-home',
  templateUrl: './movies-home.component.html',
  styleUrls: ['./movies-home.component.scss']
})

export class MoviesHomeComponent implements OnInit {
  title= 'pagination';
  data: any=[];
  page:number=1;
  count:number=0;
  tableSize:number=18; 
  tableSizes: any =[5,10,15,20,25] ;
  responsive: boolean = true;
  movies: any[] = [];
  categories: any=[];
  searchTerm: string = '';
  display: string='';
  myresults: any;
  results: any;
  constructor(private moviesService: MoviesService,
    private serieService: SerieService,

    ) { }

  ngOnInit(): void {
this.moviesService.getMovies().subscribe((response)=> this.data = response);
this.moviesService.getCategories().subscribe((response)=> this.categories = response);

  }


  // ngDoCheck(): void {
  //  // console.log(this.categories.genres.Action,'categories data')
  //   console.log(this.data,'movies data')

  // this.categories = this.categories;
  //   this.watchedMovies = this.data;

         
  // }
  onTableDataChange(event:any):void{
    this.page = event;
    // this.ngOnInit()
  }
  onCategoriesChange(event:any):void{
    this.page = event;
    // this.ngOnInit();
  }

  onTableSizeChange(event:any):void{
      this.tableSize = event.target.value;
      this.page = 1;
    // this.ngOnInit()
  }
  searchTitle() {
    if(this.searchTerm == ''){
     this.display = 'results';
      this.data = this.moviesService.getMovies();
    }
    console.log(this.searchTerm)
    this.display = 'results';
    this.results = this.serieService.searchDataByTitle(this.searchTerm);
  }




}
