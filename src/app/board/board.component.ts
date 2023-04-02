import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { async } from '@firebase/util';
import { Task } from '../models/task.class';
import {MatDialog} from '@angular/material/dialog';
import { ContactsComponent } from '../contacts/contacts.component';
import { DetailTaskComponent } from '../detail-task/detail-task.component';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
allTasks = [];
toDoTasks = [];
inProgressTasks = [];
awaitFeedbackTasks = [];
doneTasks = []
tasksWithFormattedDate = [];
task : Task = new Task({})
constructor(
  public Start: AppComponent,
  public firestore: AngularFirestore,
  public dialog: MatDialog
){

}

async ngOnInit(){
  await this.loadAllTasks()
 
  
}

async loadAllTasks(){
  console.log('dsffds')
  this.allTasks = [];
  this.firestore
  .collection('tasks')
  .valueChanges({idField: 'customIdName'})
  .subscribe((allTasks:any) => {
    this.allTasks = allTasks;
    this.formatedTask();
  },
  )
}

formatedTask() {
  this.tasksWithFormattedDate = [];
  this.allTasks.forEach(task => {
    const taskDate = new Date(task.date);
    const formattedDate = `${taskDate.getMonth() + 1}.${taskDate.getDate()}.${taskDate.getFullYear()}`;
    const existingTaskIndex = this.tasksWithFormattedDate.findIndex(t => t.customIdName === task.customIdName);
    
    if (existingTaskIndex === -1) {
      this.tasksWithFormattedDate.push({...task, formattedDate});
    } else {
      this.tasksWithFormattedDate[existingTaskIndex] = {...task, formattedDate};
    }
  });
  this.addTasksToProgressTasks()


}


addTasksToProgressTasks(){
  this.toDoTasks = this.tasksWithFormattedDate.filter(task => task.progress === 'toDo')
  this.inProgressTasks = this.tasksWithFormattedDate.filter(task => task.progress === 'inProgress')
  this.awaitFeedbackTasks = this.tasksWithFormattedDate.filter(task => task.progress === 'awaitFeedback')
  this.doneTasks = this.tasksWithFormattedDate.filter(task => task.progress === 'done')
}

drop(event: CdkDragDrop<string[]>, progress) {
  console.log(event)
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
  }
  this.updateTask(event.container.data[0], progress)
}


updateTask(task , progress){
  const IDNumnber = task.customIdName

  // Entfernen Sie die beiden Felder, bevor Sie das Objekt an Firebase senden
  delete task.formattedDate;
  delete task.customIdName;

  // Jetzt können Sie das Objekt an Firebase senden
  
  this.firestore
  .collection('tasks')
  .doc(IDNumnber)
  .update({
    progress : progress
  })
 }


 openDialog(item) {
 this.dialog.open(DetailTaskComponent,
    {data: item});
}



}



