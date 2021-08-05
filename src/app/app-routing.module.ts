import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanLoad } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';
import { EmailVerifiedGuard } from './guards/email-verified.guard';

const routes: Routes = [
  
  {
    path: 'registration',
    loadChildren: () => import('./pages/registration/registration.module').then( m => m.RegistrationPageModule),
    canLoad: [AutoLoginGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canLoad: [AutoLoginGuard]
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'sesiones',
    loadChildren: () => import('./pages/sesiones/sesiones.module').then( m => m.SesionesPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'wallet',
    loadChildren: () => import('./pages/wallet/wallet.module').then( m => m.WalletPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'notificaciones',
    loadChildren: () => import('./pages/notificaciones/notificaciones.module').then( m => m.NotificacionesPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'ayuda',
    loadChildren: () => import('./pages/ayuda/ayuda.module').then( m => m.AyudaPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'agrega-tarjeta',
    loadChildren: () => import('./pages/agrega-tarjeta/agrega-tarjeta.module').then( m => m.AgregaTarjetaPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'califica-llamada',
    loadChildren: () => import('./pages/califica-llamada/califica-llamada.module').then( m => m.CalificaLlamadaPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'sessiones',
    loadChildren: () => import('./pages/sessiones/sessiones.module').then( m => m.SessionesPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./pages/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'editar-perfil',
    loadChildren: () => import('./pages/editar-perfil/editar-perfil.module').then( m => m.EditarPerfilPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'records',
    loadChildren: () => import('./pages/records/records.module').then( m => m.RecordsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'call-detail/:id',
    loadChildren: () => import('./pages/call-detail/call-detail.module').then( m => m.CallDetailPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'calls',
    loadChildren: () => import('./pages/calls/calls.module').then( m => m.CallsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'commissions',
    loadChildren: () => import('./pages/commissions/commissions.module').then( m => m.CommissionsPageModule),
    canLoad: [AuthGuard]
  },  {
    path: 'commissions-calls',
    loadChildren: () => import('./pages/commissions-calls/commissions-calls.module').then( m => m.CommissionsCallsPageModule)
  },
  {
    path: 'commissions-referrals',
    loadChildren: () => import('./pages/commissions-referrals/commissions-referrals.module').then( m => m.CommissionsReferralsPageModule)
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
