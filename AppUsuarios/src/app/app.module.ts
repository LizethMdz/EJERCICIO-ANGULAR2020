import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ComponenteUnoComponent } from './components/exercises/componenteuno.component';
import { LoginComponent } from './pages/login/login.component';

// Modulo
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SidebarService } from './services/sidebar.service';
import { VideoComponent } from './components/video/video.component';
import { ImagenComponent } from './components/imagen/imagen.component';
import { DispositivoComponent } from './components/dispositivo/dispositivo.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    ComponenteUnoComponent,
    LoginComponent,
    VideoComponent,
    ImagenComponent,
    DispositivoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [AuthService, SidebarService],
  bootstrap: [AppComponent],
})
export class AppModule {}
