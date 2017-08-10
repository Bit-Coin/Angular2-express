import {Component} from 'angular2/core';
import {Session} from '../../../services/session';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {CanActivate} from 'angular2/router';
import {AdminService} from '../../../services/admin';
import {LessonContent} from './content';
import {FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators} from 'angular2/common';

@Component({
	selector: 'admin-add-lesson',
	templateUrl: '/components/admin/add/lesson.html',
	providers: [Session,AdminService],
	directives: [ROUTER_DIRECTIVES,FORM_DIRECTIVES,LessonContent]
})

export class AddLesson {

	lessonForm: ControlGroup;
	lessonname: Control;
	lessondescription: Control;
	lesson_id: string;
	submitAttempt: boolean = false;
	lessonData: any = [];
	contents: any = [];

	constructor(private _session: Session, private _adminService: AdminService, private builder: FormBuilder, private _router: Router) {
		this.newInit(false);
	}

	manageContent(value){
		this.contents = value; //JSON.parse(this._session.getItem('Content'));		
	}

	cancel(){
		this._session.setItem('Lesson_new', {});
		this._session.setItem('Content', []);
		this._router.navigate(['AdminAddCourse']);
	}

	SubmitLesson(form: any) {
		this.submitAttempt = true;
		if(this.lessonForm.valid){
			this.handleData(form);	
			this._router.navigate(['AdminAddCourse']);
		}
	}

	addNextLesson(form: any){
		this.submitAttempt = true;
		if(this.lessonForm.valid){

			this.handleData(form);	

			let data = [{
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

			let data1 = {
				lesson_id: (Date.now()).toString(),
				lessonname: '',
				lessondescription: '',
				content: data
			}
			this._session.setItem('Lesson_new', JSON.stringify(data1));
			this._session.setItem('Content', JSON.stringify(data));
			this.newInit(true);
		}	
	}

	private handleData(form: any) : void{
		let contentData = JSON.parse(this._session.getItem('Content'));
		console.log(contentData);
		contentData = contentData.filter(function(obj){
			let updated = true;
			if(obj.videoOrQuestion){
				if(obj.videoLabel != "" && obj.videoEmbedCode != "") updated = false;
			}else{
				switch (obj.singleOrMulti) {
					case false:
						if(obj.question != "" ) updated = false; 
						break;
					case true:
						if(obj.question == "" || obj.answerA == "" || obj.answerB == "" || obj.answerC == "" || obj.trueNumber == 0 ) {
							console.log("true");
							updated = true;
						}else{
							console.log("false");
							updated = false;
						}
						break;				
					default:
						updated = true;					
						break;
				}
			}
			if(!updated) return obj; 
		})

		let lesson = {
			lesson_id: this.lesson_id,
			lessonname: this.lessonForm.controls['lessonname'].value,
			lessondescription: this.lessonForm.controls['lessondescription'].value,
			content: contentData
		}
		console.log(lesson)
		this.submitAttempt = false;
		let course = JSON.parse(this._session.getItem('Course')), lessons_copy = [], update_lesson = false, lesson_original = [];
		lesson_original = course.lesson;
		console.log('course original');
		console.log(course);

		lesson_original.forEach(function(obj){
			if(obj.lesson_id == lesson.lesson_id){
				update_lesson = true;
				lessons_copy.push(lesson);
			}else{
				lessons_copy.push(obj);
			}
		});
		if(!update_lesson){
			lessons_copy.push(lesson);	
		}	
		course.lesson = lessons_copy;	
		console.log('course after');
		console.log(course)
		this._session.setItem('Course', JSON.stringify(course));
	}

	private newInit(flag: boolean) : void {
		this.lessonData = JSON.parse(this._session.getItem('Lesson_new'));
		this.lesson_id = this.lessonData.lesson_id;
		this.contents = JSON.parse(this._session.getItem('Content')); //this.lessonData.content;
		if(!flag){
			this.lessonname = new Control(this.lessonData.lessonname, Validators.required);
			this.lessondescription = new Control(this.lessonData.lessondescription, Validators.required);

			this.lessonForm = this.builder.group({
				lessonname: this.lessonname,
				lessondescription: this.lessondescription,			
			})
		}else{
			(<Control>this.lessonForm.controls['lessonname']).updateValue(this.lessonData.lessonname);
			(<Control>this.lessonForm.controls['lessondescription']).updateValue(this.lessonData.lessondescription);
		}	
	}
}