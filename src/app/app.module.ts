import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SummaryComponent } from './summary/summary.component';
import { BoardComponent } from './board/board.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ContactsComponent } from './contacts/contacts.component';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { AddUserComponent } from './add-user/add-user.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { DetailTaskComponent } from './detail-task/detail-task.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { ImprintComponent } from './imprint/imprint.component';
import { ArchiveComponent } from './archive/archive.component';
@NgModule({
  declarations: [
    AppComponent,
    SummaryComponent,
    BoardComponent,
    AddTaskComponent,
    ContactsComponent,
    AddUserComponent,
    DetailTaskComponent,
    PrivacypolicyComponent,
    ImprintComponent,
    ArchiveComponent,
  ],
  imports: [
    MatIconModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    DragDropModule,
    MatProgressBarModule,
    MatChipsModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,    
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatInputModule,
    MatToolbarModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
