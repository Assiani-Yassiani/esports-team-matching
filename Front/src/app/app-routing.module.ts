import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ResumeComponent } from './resume/resume.component';
import { Home2Component } from './home2/home2.component';
import { ProfilComponent } from './profil/profil.component';
import { TeamComponent } from './team/team.component';
import { MultigamingComponent } from './multigaming/multigaming.component';
import { SerchplayerComponent } from './serchplayer/serchplayer.component';
import { TeamprofileComponent } from './teamprofile/teamprofile.component';
import { MultigamingprofileComponent } from './multigamingprofile/multigamingprofile.component';
import { UpResumeComponent } from './up-resume/up-resume.component';
import { UpTeamComponent } from './up-team/up-team.component';

import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './gard/auth.guard';
import { UpMultiComponent } from './up-multi/up-multi.component';
import { SerchmultiComponent } from './serchmulti/serchmulti.component';
import { SerchteamComponent } from './serchteam/serchteam.component';
import { CreateOffreComponent } from './create-offre/create-offre.component';
import { TeamrecrutmentComponent } from './teamrecrutment/teamrecrutment.component';
import { TeamprofileserchComponent } from './teamprofileserch/teamprofileserch.component';
import { UpdateoffreComponent } from './service/updateoffre/updateoffre.component';
import { OffreProfileComponent } from './offre-profile/offre-profile.component';
import { ProfileoffreserchComponent } from './profileoffreserch/profileoffreserch.component';
import { ResumeserchComponent } from './resumeserch/resumeserch.component';
import { TeamrecrutemnentComponent } from './teamrecrutemnent/teamrecrutemnent.component';


export const routes: Routes = [
  { path: 'e', component: HomeComponent },
  { path: 'resume', component: ResumeComponent, canActivate: [AuthGuard] },
  { path: '', component: Home2Component, },
  { path: 'profil', component: ProfilComponent, },
  { path: 'team', component: TeamComponent, canActivate: [AuthGuard] },
  { path: 'multi', component: MultigamingComponent, canActivate: [AuthGuard] },
  { path: 'serch_player', component: SerchplayerComponent },

  { path: 'teamprofil', component: TeamprofileComponent },
  { path: 'multiprifil', component: MultigamingprofileComponent },
  { path: 'up_resume', component: UpResumeComponent },
  { path: 'up_multi', component: UpMultiComponent },
  { path: 'up_team', component: UpTeamComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'serchmulti', component: SerchmultiComponent, },
  { path: 'serch_team', component: SerchteamComponent },
  { path: 'create_offre', component: CreateOffreComponent },
  { path: 'team-recrutement', component: TeamrecrutmentComponent },
  { path: 'profile_teame', component: TeamprofileserchComponent },
  { path: 'update_offre', component: UpdateoffreComponent },
  { path: 'see', component: OffreProfileComponent },
  { path: 'profil_offre', component: ProfileoffreserchComponent },
  { path: 'resume_serch', component: ResumeserchComponent },
  { path: 'resume_recrutement', component: TeamrecrutemnentComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
