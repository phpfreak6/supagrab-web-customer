import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Err404Component } from "./common/err404/err404.component";
import { HomeComponent } from './modules/frontend/home/home.component';

import { BackendComponent } from "./layout/backend/backend.component";
import { FrontendComponent } from "./layout/frontend/frontend.component";
import { AuthGuard } from './services/guard/auth.guard';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	},
	{
		path: '',
		component: BackendComponent,
		children: [
			{
				path: '',
				loadChildren: () => import('./modules/backend/backend.module').then(module => module.BackendModule),
				canActivate: [AuthGuard]
			}
		]
	},
	{
		path: '',
		component: FrontendComponent,
		children: [
			{
				path: '',
				loadChildren: () => import('./modules/frontend/frontend.module').then(module => module.FrontendModule)
			}
		]
	},
	{
		path: '**',
		component: Err404Component
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
