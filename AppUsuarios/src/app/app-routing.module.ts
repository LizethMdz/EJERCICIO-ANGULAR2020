import { DispositivoComponent } from './components/dispositivo/dispositivo.component';
import { ImagenComponent } from './components/imagen/imagen.component';
import { VideoComponent } from './components/video/video.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponenteUnoComponent } from './components/exercises/componenteuno.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'exercises',
    component: ComponenteUnoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'video',
    component: VideoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'imagen',
    component: ImagenComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dispositivo',
    component: DispositivoComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
