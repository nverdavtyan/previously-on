import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SerieService } from 'src/app/services/serie.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { faFilm } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  information: any;
  user: any;
  seasons: any = [];
  allEp: Observable<any> | undefined;
  genres: any = [];
  actors: any = [];
  filmIcon = faFilm;
  constructor(
    private activatedRoute: ActivatedRoute,
    private serieService: SerieService,
    private router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem('currentUser') || '[]');
   }


   ngOnInit() {
    let id = parseInt(this.activatedRoute.snapshot.paramMap.get('id') || '0');
    this.allEp = this.serieService.getAllEpToSee(id, this.user.token);
    this.allEp.subscribe((v:any) => console.log('AllEp: ', v));
    this.serieService.getDetails(id).subscribe((result :any)=> {
      this.information = result['show'];console.log(this.information);
      this.genres = Object.values(this.information.genres);
    })
   this.actors= this.serieService.getActors(id)
   this.actors.subscribe((res:any) => console.log('actors: ', res));

  }


  onPressUp( id: number,imdb_id: string) {
    this.router.navigate(['episode', id, imdb_id]);    
}
action(id: number, season:number, ep:number){
  console.log(id,season, ep)
  this.router.navigate(['episode', id, season, ep]);  
}
openWebsite() {
    window.open(this.information.resource_url, '_blank');
  }

}
