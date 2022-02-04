import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardviewComponent } from './cardview/cardview.component';
import { UsergraphicalviewComponent } from './usergraphicalview/usergraphicalview.component';
import { ListComponent } from './users/list.component';

import { AuthGuard } from './_helpers';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);

const routes: Routes = [
    { path : '', component: ListComponent,canActivate: [AuthGuard]},
    { path : 'card', component: CardviewComponent,canActivate: [AuthGuard]},
    { path : 'graph', component: UsergraphicalviewComponent,canActivate: [AuthGuard]},
     { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }