import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './add-task/add-task.component';
import { AddUserComponent } from './add-user/add-user.component';
import { BoardComponent } from './board/board.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { SummaryComponent } from './summary/summary.component';
import { ArchiveComponent } from './archive/archive.component';

const routes: Routes = [
  { path: 'addTask', component: AddTaskComponent },
  { path: 'board', component: BoardComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'summary', component: SummaryComponent },
  { path: 'addUser', component: AddUserComponent },
  { path: 'imprint', component: ImprintComponent },
  { path: 'privacypolice', component: PrivacypolicyComponent },
  { path: 'archive', component: ArchiveComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
