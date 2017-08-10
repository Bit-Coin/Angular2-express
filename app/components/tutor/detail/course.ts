import {Component} from 'angular2/core';
import {Session} from '../../../services/session';
import {ROUTER_DIRECTIVES,Router} from 'angular2/router';
import {CanActivate} from 'angular2/router';
import {TutorService} from '../../../services/tutor';

@Component({
	selector: 'tutor-detail-course',
	templateUrl: '/components/tutor/detail/course.html',
	providers: [Session, TutorService],
	directives: [ROUTER_DIRECTIVES]
})
export class DetailTutorCourse {

	course: any;
	studentList: any;


	constructor(private _session: Session, private _tutorService: TutorService,  private _router: Router) {
		this.course = JSON.parse(this._session.getItem('TutorCourse'));
		
		this._tutorService.getStudentsByCourseId(this.course.course_id, this._session.getCurrentId()).subscribe((res)=>{
			this.studentList = res;
		})
	}


	gotoTutorMain(){
		this._router.navigate(['TutorMain']);
	}

	doLogin(form: any) {
		// this._session.login(form.username, form.password);
	}
	getCourseName(){
		return this.titleCase(this.course.coursetitle);
	}

	getComplete(flag){
		return flag? 'Yes' : 'No';
	}

	private titleCase(str: string) : string {
	 	return str.split(' ').map(function(val){ 
	    	return val.charAt(0).toUpperCase() + val.substr(1).toLowerCase();
	  	}).join(' ');
	}
}