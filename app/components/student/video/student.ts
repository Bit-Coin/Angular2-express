import {Component, OnInit, Input, Output, EventEmitter} from 'angular2/core';
import {Session} from '../../../services/session';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {CanActivate} from 'angular2/router';
import {StudentService} from '../../../services/student';

@Component({
	selector: 'student-video',
	templateUrl: '/components/student/video/student.html',
	providers: [Session, StudentService],
	directives: [ROUTER_DIRECTIVES],
})
export class StudentVideo {

	@Input() content: any;
	@Input() lessonname: string;
	@Input() index: number;
	@Input() total: number;
	
	@Output() gotoNextContent=new EventEmitter();
	@Output() gotoPreviousContent=new EventEmitter();

	constructor(private _session: Session, private _studentService: StudentService, private _router: Router) {

	}

	gotoNext(){
		this.gotoNextContent.emit({});
	}
	gotoPrevious(){
		this.gotoPreviousContent.emit({});	
	}
	getEmbedUrl(){
		let videoNumber = this.content.videoEmbedCode.replace(/\D/g, '');
		return 'https://player.vimeo.com/video/' + videoNumber;
	}
	getIndex(){
		return this.index + 1;
	}
}

