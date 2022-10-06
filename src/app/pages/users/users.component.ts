import { ProfilService } from './../../services/profil.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
	user: any;
	userID: number;
	userName: '';
	friendlist: any;
	token: number;
	searchTerm: string='';
	friendSearch: any= [];
	onDemands: any;
	onMyDemands: any=[];
	show: boolean = false;
    display :string='';
      constructor(private http: HttpClient, private profilService: ProfilService) {
		this.user = JSON.parse(localStorage.getItem('currentUser') || '[]');
		this.userID = this.user.user.id;
		console.log(this.userID);
		this.token = this.user.token;
		this.userName = (this.user.user.login);

	}

	ngOnInit() {
    this.friendlist= this.profilService.searchData(this.userID, this.token);
	  	this.friendlist.subscribe((res:any) => {
    
         this.friendlist= res 
         console.log(this.friendlist,'my requests')
        });

		this.profilService.getDemands(this.user.token).subscribe((res) => {
			this.onDemands = res;

		});

		this.profilService.getMyDemands(this.user.token).subscribe((res) => {
			this.onMyDemands = res;

		});

	}

	click(id: number, token: number) {
		this.profilService.removeFriend(id, token).subscribe((res) => { this.ngOnInit(); });

	}

	switch() {
		this.show = this.show ? false : true;
	}

	response(id: number, rep: boolean) {
		rep ? this.profilService.AddAFriend(id, this.user.token).subscribe((res) => { this.ngOnInit(); }) : this.profilService.removeFriend(id, this.user.token).subscribe((res) => { this.ngOnInit(); });
		this.show= false;
	}

	searchFriend(token: number) {
		console.log(this.onDemands)
		console.log(this.onMyDemands)
		console.log(this.friendlist)
		console.log(token);
		console.log(this.searchTerm);
		this.profilService.SearchAFriend(this.searchTerm, token).subscribe((res:any) => { this.friendSearch = res['users'] });
	}
	addFriend(id: number, token: number) {
		console.log(id);
		console.log(token);
		this.profilService.AddAFriend(id, token).subscribe((res) => {
			this.ngOnInit();
		});
	}

}
