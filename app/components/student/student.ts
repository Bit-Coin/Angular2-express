import {Component, OnInit} from 'angular2/core';

import {Router, Route, RouteConfig, RouterOutlet, ROUTER_DIRECTIVES} from 'angular2/router';
import {StudentMain} from './main/main';
import {StudentLesson} from './lesson/student';
import {QuestionText} from './questiontext/student';
import {QuestionChoice} from './questionchoice/student';
import {StudentVideo} from './video/student';
import {SelectedContent} from './selected/student';
import {LessonResult} from './result/student';
import {CourseResult} from './result/course';

@Component({
	selector: 'student',
	templateUrl: '/components/admin/admin.html',
	directives: [ROUTER_DIRECTIVES, RouterOutlet]
})

@RouteConfig([
	new Route({ path: '/main', component: StudentMain, name: 'StudentCourse', useAsDefault:true }),
	new Route({ path: '/lesson', component: StudentLesson,  name: 'StudentLesson'}),
	new Route({ path: '/selected', component: SelectedContent,  name: 'SelectedContent'}),
	new Route({ path: '/text', component: QuestionText, name: 'QuestionText' }),
	new Route({ path: '/choice', component: QuestionChoice, name: 'QuestionChoice' }),
	new Route({ path: '/video', component: StudentVideo, name: 'StudentVideo' }),
	new Route({ path: '/lesson-result', component: LessonResult, name: 'LessonResult' }),
	new Route({ path: '/course-result', component: CourseResult, name: 'CourseResult' }),
])

export class Student {
	constructor() {

	}
	
}