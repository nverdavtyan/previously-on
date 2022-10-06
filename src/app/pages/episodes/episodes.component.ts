import { SerieService } from './../../services/serie.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss']
})
export class EpisodesComponent implements OnInit {
  ionicForm!       : FormGroup ;
  isSubmitted     : boolean = false;
  id              : number = 0;
  ep              : any;
  information     : any ;
  user            : any=[];
  isDataAvailable : boolean = false;
  season          : number = 0;
  episode         : number =0;
  comments        : any =[] 
  imdb_id         : string  = '';
  pictures        :any;
  type            : any = {
    one :     "one",
    onePrec : "onePrec",
    all :     "all"
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private serieService: SerieService,
    public formBuilder: FormBuilder
  ) {
    this.user = JSON.parse(localStorage.getItem('currentUser')|| '[]');
   }

  ngOnInit(): void {
    this.ionicForm = this.formBuilder.group({
      commentaire: [''], 
    })

    // if(!this.activatedRoute.snapshot.paramMap.get('season')){
    //   this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id')); 
    // }
    if(!this.activatedRoute.snapshot.paramMap.get('season')){
      this.imdb_id = this.activatedRoute.snapshot.paramMap.get('imdb_id' ) || '';
      this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id') || '0');
    }
    else{
      this.season = parseInt(this.activatedRoute.snapshot.paramMap.get('season') || '0');
      this.episode = parseInt(this.activatedRoute.snapshot.paramMap.get('ep') || '0');
      this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id') || '0');
    }
    this.serieService.getComments(this.id).subscribe(result => {
      this.comments = result['comments']
      ;console.log(this.comments)
      })
    this.serieService.getEpisodeDetails(this.id).subscribe(result => {
      this.information = result['episode'];
      this.isDataAvailable=true;
      console.log(this.information)
      // this.serieService.getImdbSerie(this.imdb_id).subscribe(result => {
      //   this.imdbSerie = result['results'];
      // })
      this.serieService.getPict(this.imdb_id, this.information).subscribe((result:any) => {
        this.pictures = result['episodes'];
        console.log(this.pictures)
      })
    })
  }


  searchChanged() {
    console.log(this.type)
    if(this.type == 'one' ){
      this.serieService.addView(this.id, this.user.token).subscribe((v)=>(console.log(v)));
    }
    else if(this.type == 'onePrec'){
      this.serieService.addAllView(this.id, this.user.token).subscribe((v)=>(console.log(v)));
    } 
  }

  submitForm(){
    let text = this.ionicForm.value.commentaire;
    this.serieService.addComment(this.id, this.user.token, text).subscribe((v)=>(console.log(v)));
    console.log(this.ionicForm.value.commentaire)
    this.ionicForm.reset();
  }

}
