import {Component, OnInit} from 'angular2/core';

import {Router, Route, RouteConfig, RouterOutlet, ROUTER_DIRECTIVES} from 'angular2/router';
import {Main} from './main/main';
import {AddCourse} from './add/course';
import {AddLesson} from './add/lesson';
import {AddOrganization} from './add/organization';
import {EditLesson} from './edit/lesson';
import {EditCourse} from './edit/course';
import {EditOrganization} from './edit/organization';



@Component({
	selector: 'admin',
	templateUrl: '/components/admin/admin.html',
	directives: [ROUTER_DIRECTIVES, RouterOutlet]

})

@RouteConfig([
	new Route({ path: '/main', component: Main, name: 'AdminMain', useAsDefault:true }),
	new Route({ path: '/add/course', component: AddCourse, name: 'AdminAddCourse' }),
	new Route({ path: '/add/lesson', component: AddLesson, name: 'AdminAddLesson' }),
	new Route({ path: '/add/organization', component: AddOrganization, name: 'AdminAddOrganization' }),
	new Route({ path: '/edit/course', component: EditCourse, name: 'AdminEditCourse' }),
	new Route({ path: '/edit/lesson', component: EditLesson, name: 'AdminEditLesson' }),
	new Route({ path: '/edit/organization', component: EditOrganization, name: 'AdminEditOrganization' }),
	// new Route({ path: '/student/...', component: Admin, name: 'Student' }),
])

export class Admin {
	constructor() {

	}
	
}