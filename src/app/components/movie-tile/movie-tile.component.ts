import { Component, OnInit,Input,Output, EventEmitter} from '@angular/core';
import {faHeart,faEye,faRemove} from '@fortawesome/free-solid-svg-icons';
import {faHeart as faNotFav, faEye as faNotWatched, faPlusSquare} from '@fortawesome/free-regular-svg-icons';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { SerieService, SearchType } from './../../services/serie.service';
@Component({
  selector: 'app-movie-tile',
  templateUrl: './movie-tile.component.html',
  styleUrls: ['./movie-tile.component.scss']
})
export class MovieTileComponent implements OnInit {
@Input() imageUrl: string='';
@Input() id: number=0;
@Input() isWatched: boolean =false;
@Input() isFav: boolean =false;
@Output() favClick = new EventEmitter();
@Output() watchedClick = new EventEmitter();

faFav = faNotFav;
faWatched= faNotWatched;
faPlus = faPlusSquare;
faDelete = faRemove;
user:any;
mySeries: any = [];
myresults: any;
type: SearchType = SearchType.mySeries;
  constructor(
    private router: Router,
    private data: DataService,
    private serieService: SerieService,
  ) { 
    this.user = JSON.parse(localStorage.getItem('currentUser') || '[]');
 //console.log(  this.user,'my user')
  }

  ngOnInit(): void {
    if(this.user.length!==0)
    { 
     this.myresults = this.serieService.searchMyData(this.user.user.id);
    this.myresults.subscribe((v:any)=> v);
    this.myresults.forEach((elem:any) => {
      for (let index = 0; index < elem.length; index++) {
        this.mySeries.push(elem[index].id); 
      }
    });
  }

  }
  

  onFavClick():void{
    this.favClick.emit();
  }

  onWatchedClick():void{
    this.watchedClick.emit();

  }

  addSerie(id: number) {
    this.serieService.addSerie(id, this.user.token).subscribe(
      (resp) => {
        this.ngOnInit();
        this.type = SearchType.mySeries;
        console.log('add')
        

      });
  }
  removeSerie(id: number){
    this.serieService.removeSerie(id, this.user.token).subscribe(
      (resp) => {
        this.ngOnInit();
        this.type = SearchType.mySeries;
        console.log('rm')
      });
  }
  
  onPressup($event: any, id: number) {
    console.log("onPressUp", $event);
    this.router.navigate(['serie', id]);    
}
}
