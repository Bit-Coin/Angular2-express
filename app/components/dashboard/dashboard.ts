import {Component, OnInit} from 'angular2/core';
import {CanActivate} from 'angular2/router';

import {Session} from '../../services/session';

@Component({
	selector: 'dashboard',
	templateUrl: '/components/dashboard/dashboard.html',
	providers: [Session]
})
export class Dashboard implements OnInit {
	constructor(private _session: Session) {
	}

	ngOnInit() {
	}
}