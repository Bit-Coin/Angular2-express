import {Component} from 'angular2/core';
import {Router, Route, RouteConfig, RouterOutlet, ROUTER_DIRECTIVES} from 'angular2/router';

// import {AuthenticatedRouterOutlet} from './directives/authenticated-router-outlet';
import {Home} from './components/home/home';
import {Login} from './components/login/login';
import {Dashboard} from './components/dashboard/dashboard';
import {SignUp} from './components/signup/signup';
import {Forgetpwd} from './components/forgetpwd/forgetpwd';


@Component({
	selector: 'my-app',
	templateUrl: './app.html',
	directives: [RouterOutlet,ROUTER_DIRECTIVES]
})
@RouteConfig([
	new Route({ path: '/login', component: Login, name: 'Login', useAsDefault:true }),
	new Route({ path: '/dashboard', component: Dashboard, name: 'Dashboard' }),
	new Route({ path: '/home/...', component: Home, name: 'Home' }),
	new Route({ path: '/signup', component: SignUp, name: 'SignUp' }),
	new Route({ path: '/forgetpwd', component: Forgetpwd, name: 'Forgetpwd' })
])
export class AppComponent{

}