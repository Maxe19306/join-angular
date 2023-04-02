import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-detail-task',
  templateUrl: './detail-task.component.html',
  styleUrls: ['./detail-task.component.scss']
})
export class DetailTaskComponent {
  seeTeamMember = false;
  allUsers = []
  TeamMember = []
 constructor(
  public firestore: AngularFirestore,
  public dialogRef: MatDialogRef<DetailTaskComponent>,
  @Inject (MAT_DIALOG_DATA) public data: any
 ){}


 ngOnInit(){
  this.firestore
  .collection('users')
  .valueChanges({idField: 'customIdName'})
  .subscribe((allUsers:any) => {
    this.allUsers = allUsers;
    console.log(this.allUsers)
    this.test()
  },
  )
 
 }
 

 viewTeamMember(){
  this.seeTeamMember = true;
 }

 lessTeamMember(){
  this.seeTeamMember = false;
 }


 test(){
 this.TeamMember = this.allUsers.filter(user => user.department === this.data.category)
 console.log(this.TeamMember)
 }


 moveTaskToArchive(doc){
  this.deleteTask(doc)
  this.addTaskToArchive(doc)
  this.dialogRef.close()
  }


  deleteTask(doc){
    this.firestore
  .collection('tasks')
  .doc(doc.customIdName)
  .delete()
  }

  addTaskToArchive(doc){
    delete doc.formattedDate;
    delete doc.customIdName;
    delete doc.progress
   
    this.firestore.
    collection('archiv')
    .add(doc)
  }

}
