import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';
import { EmailVerifiedGuard } from './guards/email-verified.guard';

const routes: Routes = [
  
  {
    path: 'registration',
    loadChildren: () => import('./pages/registration/registration.module').then( m => m.RegistrationPageModule),
    
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'sesiones',
    loadChildren: () => import('./pages/sesiones/sesiones.module').then( m => m.SesionesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'wallet',
    loadChildren: () => import('./pages/wallet/wallet.module').then( m => m.WalletPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'notificaciones',
    loadChildren: () => import('./pages/notificaciones/notificaciones.module').then( m => m.NotificacionesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'ayuda',
    loadChildren: () => import('./pages/ayuda/ayuda.module').then( m => m.AyudaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'agrega-tarjeta',
    loadChildren: () => import('./pages/agrega-tarjeta/agrega-tarjeta.module').then( m => m.AgregaTarjetaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'califica-llamada',
    loadChildren: () => import('./pages/califica-llamada/califica-llamada.module').then( m => m.CalificaLlamadaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'sessiones',
    loadChildren: () => import('./pages/sessiones/sessiones.module').then( m => m.SessionesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./pages/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'editar-perfil',
    loadChildren: () => import('./pages/editar-perfil/editar-perfil.module').then( m => m.EditarPerfilPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  },
  {
    path: 'records',
    loadChildren: () => import('./pages/records/records.module').then( m => m.RecordsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'call-detail/:id',
    loadChildren: () => import('./pages/call-detail/call-detail.module').then( m => m.CallDetailPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'calls',
    loadChildren: () => import('./pages/calls/calls.module').then( m => m.CallsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'commissions',
    loadChildren: () => import('./pages/commissions/commissions.module').then( m => m.CommissionsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'commissions-calls',
    loadChildren: () => import('./pages/commissions-calls/commissions-calls.module').then( m => m.CommissionsCallsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'commissions-referrals',
    loadChildren: () => import('./pages/commissions-referrals/commissions-referrals.module').then( m => m.CommissionsReferralsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil-options',
    loadChildren: () => import('./pages/perfil-options/perfil-options.module').then( m => m.PerfilOptionsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil-bank',
    loadChildren: () => import('./pages/perfil-bank/perfil-bank.module').then( m => m.PerfilBankPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil-password',
    loadChildren: () => import('./pages/perfil-password/perfil-password.module').then( m => m.PerfilPasswordPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil-suspend',
    loadChildren: () => import('./pages/perfil-suspend/perfil-suspend.module').then( m => m.PerfilSuspendPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil-delete',
    loadChildren: () => import('./pages/perfil-delete/perfil-delete.module').then( m => m.PerfilDeletePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'detalle-llamada/:id',
    loadChildren: () => import('./pages/detalle-llamada/detalle-llamada.module').then( m => m.DetalleLlamadaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'wallet-pagos',
    loadChildren: () => import('./pages/wallet-pagos/wallet-pagos.module').then( m => m.WalletPagosPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'wallet-tarjetas',
    loadChildren: () => import('./pages/wallet-tarjetas/wallet-tarjetas.module').then( m => m.WalletTarjetasPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'plans',
    loadChildren: () => import('./pages/plans/plans.module').then( m => m.PlansPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'referral-detail/:id',
    loadChildren: () => import('./pages/referral-detail/referral-detail.module').then( m => m.ReferralDetailPageModule)
  },
  {
    path: 'agrega-plan',
    loadChildren: () => import('./pages/agrega-plan/agrega-plan.module').then( m => m.AgregaPlanPageModule)
  },
  {
    path: 'agrega-plan-modal',
    loadChildren: () => import('./pages/agrega-plan-modal/agrega-plan-modal.module').then( m => m.AgregaPlanModalPageModule)
  },
  {
    path: 'ayuda-factura',
    loadChildren: () => import('./pages/ayuda-factura/ayuda-factura.module').then( m => m.AyudaFacturaPageModule)
  },
  {
    path: 'ayuda-soporte',
    loadChildren: () => import('./pages/ayuda-soporte/ayuda-soporte.module').then( m => m.AyudaSoportePageModule)
  },
  {
    path: 'add-plans',
    loadChildren: () => import('./pages/add-plans/add-plans.module').then( m => m.AddPlansPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'call-rate',
    loadChildren: () => import('./pages/call-rate/call-rate.module').then( m => m.CallRatePageModule)
  },  {
    path: 'plan-edit',
    loadChildren: () => import('./pages/plan-edit/plan-edit.module').then( m => m.PlanEditPageModule)
  },













];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
