import { Component} from '@angular/core';
import { Task } from '../models/task.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  createTaskloading = false;
   
  date: Date;
  task : Task = new Task({})
  constructor(
    public Start: AppComponent,
    public firestore: AngularFirestore,
    private _snackBar: MatSnackBar
   ){}

   createNewTask(taskForm){
    this.createTaskloading = true;
    this.task.taskowner = this.Start.currentUser.firstName + ' ' + this.Start.currentUser.lastName;
    this.task.date = this.date.getTime() 
    this.firestore
    .collection('tasks')
    .add(
      this.task.toJSON()
    ) 
    this.openSnackBar()
    taskForm.reset()
    this.createTaskloading = false;
  
   }


   openSnackBar() {
    this._snackBar.open('the task is added!', 'OK', {
      duration: 4000, // Dauer von 2 Sekunden
    });
  }




}
