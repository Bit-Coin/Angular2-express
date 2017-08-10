import {Component} from 'angular2/core';
import {Session} from '../../../services/session';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {CanActivate} from 'angular2/router';
import {AdminService} from '../../../services/admin';
import {FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators} from 'angular2/common';


@Component({
	selector: 'admin-add-course',
	templateUrl: '/components/admin/add/course.html',
	providers: [Session, AdminService],
	directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES]
})

export class AddCourse {
	
	courseForm: ControlGroup;
	coursetitle: Control;
	coursedescription: Control;
	submitAttempt: boolean = false;
	courseData: any  = {};
	lessonData: any  = [];

	constructor(private _session: Session, private _adminService: AdminService, private builder: FormBuilder, private _router: Router) {
		this.courseData = JSON.parse(this._session.getItem('Course'));
		console.log("original");
		console.log(this.courseData);
		this.coursetitle = new Control(this.courseData.coursetitle, Validators.required);
		this.coursedescription = new Control(this.courseData.coursedescription, Validators.required);
		this.lessonData = this.courseData.lesson;

		this.courseForm = builder.group({
			coursetitle: this.coursetitle,
			coursedescription: this.coursedescription,			
		});
	}

	cancel(){
		this._session.setItem('Course', {});
		this._router.navigate(['AdminMain']);
	}

	getVideoCount(lesson){
		let count = 0;
		lesson.content.forEach(function(obj){
			if(obj.videoOrQuestion) count++;
		})
		return count;
	}

	gotoEditLesson(lesson){
		this._session.setItem('Lesson_new', JSON.stringify(lesson));
		this._session.setItem('Content', JSON.stringify(lesson.content));
		this._router.navigate(['AdminAddLesson']);
	}

	addLesson(form: any){
		var data2 = {
			course_id: this.courseData.course_id,
			coursetitle: this.courseForm.controls["coursetitle"].value,
			coursedescription: this.courseForm.controls["coursedescription"].value,
			lesson: this.courseData.lesson, 
		} 

		var data = [{
			_content_id: (Date.now()).toString(),
			videoOrQuestion: true,
			videoLabel: '',
			videoEmbedCode: '',
			singleOrMulti: false,
			question: '',
			answerA: '',
			answerB: '',
			answerC: '',
			trueNumber: '',
		}];

		var data1 = {
			lesson_id: (Date.now()).toString(),
			lessonname: '',
			lessondescription: '',
			content: data
		} 

		this._session.setItem('Course', JSON.stringify(data2));
		this._session.setItem('Lesson_new', JSON.stringify(data1));
		this._session.setItem('Content', JSON.stringify(data));
		this._router.navigate(['AdminAddLesson']);
	}

	SubmitCourse(form: any) {
		var submitAttempt = true;
		var editORadd = JSON.parse(this._session.getItem('editORadd'));
		if(this.courseForm.valid){
			var data = JSON.parse(this._session.getItem('Course'));
			
			data.coursetitle = form.coursetitle;
			data.coursedescription = form.coursedescription;
			console.log(data);


			this._adminService.addCourse(data, editORadd.flag)
				.subscribe((res) => {
					if(res.success){
						this._session.setItem('Course', {});
						this._session.setItem('Lesson_new', {});
						this._session.setItem('Content', {});
						this._router.navigate(['AdminMain']);
					}else{
						console.log("fail");
					}
				})
		}
	}
}