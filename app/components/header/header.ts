import {Component} from 'angular2/core';
import {Session} from '../../services/session';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {AuthService} from '../../services/authentication';

@Component({
	selector: 'my-header',
	templateUrl: '/components/header/header.html',
	providers: [Session,AuthService],
	directives: [ROUTER_DIRECTIVES]
})


export class Header {
	username: string = "";

	constructor(private _session: Session, private router:Router) {
		this.username = _session.getCurrentUsername();
	}

	doLogout(){
		this.router.navigate(['Login'])
	}
}