import { Routes } from '@angular/router';
import { authGuard } from './services/auth/auth.guard';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule),canActivate: [authGuard]},
    { path: '**', redirectTo: '/login' }
];
