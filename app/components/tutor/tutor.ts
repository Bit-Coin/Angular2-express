import {Component, OnInit} from 'angular2/core';

import {Router, Route, RouteConfig, RouterOutlet, ROUTER_DIRECTIVES} from 'angular2/router';
import {TutorMain} from './main/main';
import {AddTutorStudent} from './add/student';
import {DetailTutorStudent} from './detail/student';
import {DetailTutorCourse} from './detail/course';


@Component({
	selector: 'tutor',
	templateUrl: '/components/admin/admin.html',
	directives: [ROUTER_DIRECTIVES, RouterOutlet]
})

@RouteConfig([
	new Route({ path: '/main', component: TutorMain, name: 'TutorMain', useAsDefault:true }),
	new Route({ path: '/add/student', component: AddTutorStudent,  name: 'AddTutorStudent'}),
	new Route({ path: '/detail/student', component: DetailTutorStudent, name: 'DetailTutorStudent' }),
	new Route({ path: '/detail/course', component: DetailTutorCourse, name: 'DetailTutorCourse' }),
])

export class Tutor {
	constructor() {

	}
	
}