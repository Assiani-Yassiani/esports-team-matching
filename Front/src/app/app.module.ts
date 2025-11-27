import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';




import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field'; // Import MatFormFieldModule
import { MatInputModule } from '@angular/material/input'; // Import MatInputModule
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPseudoCheckboxModule, provideNativeDateAdapter } from '@angular/material/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HomeComponent } from './home/home.component'; // Import schemas
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { NgxOtpInputModule } from 'ngx-otp-input';
import { LayoutsModule } from './layouts/layouts.module';
import { ResumeComponent } from './resume/resume.component';
import { MatButtonModule } from '@angular/material/button';
import { DropdownModule } from 'primeng/dropdown';
import { Home2Component } from './home2/home2.component';
import { Resume2Component } from './resume2/resume2.component';
import { ProfilComponent } from './profil/profil.component';
import { TeamComponent } from './team/team.component';
import { MultigamingComponent } from './multigaming/multigaming.component';
import { SerchplayerComponent } from './serchplayer/serchplayer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';

import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { RouterModule, provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app-routing.module';
import { TeamprofileComponent } from './teamprofile/teamprofile.component';
import { MultigamingprofileComponent } from './multigamingprofile/multigamingprofile.component';
import { UpResumeComponent } from './up-resume/up-resume.component';
import { UpTeamComponent } from './up-team/up-team.component';

import { AdminComponent } from './admin/admin.component';
import { UpMultiComponent } from './up-multi/up-multi.component';
import { SerchteamComponent } from './serchteam/serchteam.component';
import { SerchmultiComponent } from './serchmulti/serchmulti.component';
import { OffreComponent } from './offre/offre.component';
import { CreateOffreComponent } from './create-offre/create-offre.component';
import { TeamrecrutmentComponent } from './teamrecrutment/teamrecrutment.component';
import { OffreProfileComponent } from './offre-profile/offre-profile.component';
import { TeamprofileserchComponent } from './teamprofileserch/teamprofileserch.component';
import { UpdateoffreComponent } from './service/updateoffre/updateoffre.component';
import { ProfileoffreserchComponent } from './profileoffreserch/profileoffreserch.component';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { Alert2Component } from './alert2/alert2.component';
import { ApplicationComponent } from './application/application.component';
import { ResumeserchComponent } from './resumeserch/resumeserch.component';
import { Alert3Component } from './alert3/alert3.component';
import { Alert4Component } from './alert4/alert4.component';
import { TeamrecrutemnentComponent } from './teamrecrutemnent/teamrecrutemnent.component';
import { DiscordComponent } from './discord/discord.component';
import { TeamappComponent } from './teamapp/teamapp.component';
import { ResumeappComponent } from './resumeapp/resumeapp.component';




@NgModule({
  declarations: [


    AppComponent,

    HomeComponent,
    ResumeComponent,
    Home2Component,
    Resume2Component,
    ProfilComponent,
    TeamComponent,
    MultigamingComponent,
    SerchplayerComponent,
    TeamprofileComponent,
    MultigamingprofileComponent,
    UpResumeComponent,
    UpTeamComponent,

    AdminComponent,
    UpMultiComponent,
    SerchteamComponent,
    SerchmultiComponent,
    OffreComponent,
    CreateOffreComponent,
    TeamrecrutmentComponent,
    OffreProfileComponent,
    TeamprofileserchComponent,
    UpdateoffreComponent,
    ProfileoffreserchComponent,
    AlertModalComponent,
    Alert2Component,
    ApplicationComponent,
    ResumeserchComponent,
    Alert3Component,
    Alert4Component,
    TeamrecrutemnentComponent,
    DiscordComponent,
    TeamappComponent,
    ResumeappComponent,



  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    CheckboxModule,

    ButtonModule,
    MultiSelectModule,

    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,

    MatInputModule,
    MatPseudoCheckboxModule,
    MatFormFieldModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    LayoutsModule,
    FullCalendarModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule, // Add MatFormFieldModule to imports
    MatInputModule, // Add MatInputModule to imports
    ReactiveFormsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxOtpInputModule,
    BrowserModule,
    DropdownModule,
    MatButtonModule,
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    provideRouter(routes, withComponentInputBinding())
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA], // Add schemas to NgModule
  bootstrap: [AppComponent]
})
export class AppModule { }
