import {Component, OnInit, Input, Output, EventEmitter} from 'angular2/core';
import {Session} from '../../../services/session';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {CanActivate} from 'angular2/router';
import {StudentService} from '../../../services/student';

@Component({
	selector: 'student-text',
	templateUrl: '/components/student/questiontext/student.html',
	providers: [Session, StudentService],
	directives: [ROUTER_DIRECTIVES],
})
export class QuestionText implements OnInit {

	courseList: any = [];
	
	
	@Input() content: any;
	@Input() lessonname: string;
	@Input() index: number;

	@Output() gotoNextContent=new EventEmitter();
	@Output() gotoPreviousContent=new EventEmitter();

	constructor(private _session: Session, private _studentService: StudentService, private _router: Router) {

		this._session.setItem('editORadd', JSON.stringify({flag: false}));

	}

	ngOnInit(){

	}	

	gotoNext(){
		this.gotoNextContent.emit({});
	}
	gotoPrevious(){
		this.gotoPreviousContent.emit({});	
	}
}

