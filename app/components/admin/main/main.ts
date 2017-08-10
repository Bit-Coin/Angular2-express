import {Component, OnInit} from 'angular2/core';
import {Session} from '../../../services/session';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {CanActivate} from 'angular2/router';
import {AdminService} from '../../../services/admin';

@Component({
	selector: 'admin-main',
	templateUrl: '/components/admin/main/main.html',
	providers: [Session, AdminService],
	directives: [ROUTER_DIRECTIVES],
})
export class Main implements OnInit {

	courseList: any = [];
	orgList: any = [];
	coursesData: any = [];
	lessonsData: any = [];
	contentsData: any = [];
	selectOrg: any = [];


	constructor(private _session: Session, private _adminService: AdminService, private _router: Router) {
		// var admin_id = this._session.getCurrentId(), role=this._session.getCurrentRole();
		
		// if(admin_id == '' || parseInt(role) != 0){
		// 	this._router.navigate(['Login']);
		// }
		this._adminService.getAllOrgs().subscribe((res)=>{
			this.orgList = res;	
		})
	}

	editCourse(course: any){
		var lessons = [];
		console.log(course.course_id);
		this._adminService.getEditCourses(course.course_id).subscribe((res) => {
			this._session.setItem('editORadd', JSON.stringify({flag: true}));
			this._session.setItem('Course', JSON.stringify(res));
			this._router.navigate(['AdminAddCourse']);
		})
	}

	gotoEdit(org: any){
		this._session.setItem('org', JSON.stringify(org));
		this._router.navigate(['AdminEditOrganization']);
	}

	ngOnInit(){
		this._adminService.getAllCourses().subscribe((res) => {  
			this.courseList = res;
		});
	}

	gotoAddCourse(){
		var data = {
			course_id: Date.now(),
			coursetitle: '',
			coursedescription: '',
			lesson: [],
		}
		this._session.setItem('editORadd', JSON.stringify({flag: false}));
		this._session.setItem('Course', JSON.stringify(data));

		this._router.navigate(['AdminAddCourse']);
	}

	removeOrg(){
		if(this.selectOrg.length == 0) return false;

		this._adminService.removeOrgById(this.selectOrg).subscribe((res)=>{
			this.selectOrg.map(function(id){
				this.orgList = this.orgList.filter(function(org){
					return org.id != id;
				})
			})
		})

	}

	checkOrganization(event, object){
		console.log(event.currentTarget.checked);

		if(event.currentTarget.checked){
			this.selectOrg.push(object.id);
		}else{
			this.selectOrg = this.selectOrg.filter(function(o){
				return o != object.id;
			})
		}
		console.log(this.selectOrg);
	}

}