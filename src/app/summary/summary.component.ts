import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RouterLink } from '@angular/router';
import { AppComponent } from '../app.component';
import { currentUser } from '../models/currentUser.class';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {

  explanation = '';


highTask = [];
day;
greeting;
allTasks;
toDoTasks = [];
inProgressTasks = [];
awaitFeedbackTasks = [];
doneTasks = []
tasksWithFormattedDate = [];

  constructor(
    private firestore: AngularFirestore,
    public Start: AppComponent,
    public dialog: MatDialog,
  ){}

  ngOnInit(){
     this.getTime()
     this.getTasks()
      
  }

  getTime(){
    const currentTime = new Date();
    const currentDay = currentTime.getDay();
    const currentHours = currentTime.getHours();
  this.getDay(currentDay) 
  this.getDayTime(currentHours)}


  getDay(currentDay){
    switch (currentDay) {
      case 0:
        this.day = "Sunday";
        break;
      case 1:
        this.day = "Monday";
        break;
      case 2:
        this.day = "Tuesday";
        break;
      case 3:
        this.day = "Wednesday";
        break;
      case 4:
        this.day = "Thursday";
        break;
      case 5:
        this.day = "Friday";
        break;
      case 6:
        this.day = "Saturday";
    }
  }


  getDayTime(currentHours){
    if (currentHours < 12) {
      this.greeting = "morning";
    } else if (currentHours < 18) {
      this.greeting = "afternoon";
    } else {
      this.greeting = "evening";
    }
  }

  test(){
    console.log(this.highTask)
      
  }

  getTasks(){
    this.firestore
  .collection('tasks')
  .valueChanges({idField: 'customIdName'})
  .subscribe((allTasks:any) => {
    this.allTasks = allTasks;
    this.formatedTask();
  },
  )
  }

 

  formatedTask(){
    this.allTasks.forEach(task => {
      const taskDate = new Date(task.date);
      const formattedDate = `${taskDate.getMonth() + 1}.${taskDate.getDate()}.${taskDate.getFullYear()}`;
      this.tasksWithFormattedDate.push({...task, formattedDate});
      this.toDoTasks = this.tasksWithFormattedDate.filter(task => task.progress === 'toDo')
      this.inProgressTasks = this.tasksWithFormattedDate.filter(task => task.progress === 'inProgress')
      this.awaitFeedbackTasks   = this.tasksWithFormattedDate.filter(task => task.progress === 'awaitFeedback')
      this.doneTasks = this.tasksWithFormattedDate.filter(task => task.progress === 'done')
      this.dueDayTask()
    });
  }

dueDayTask(){
  this.tasksWithFormattedDate.forEach(element => {
    if(element.progress !== 'done' && element.prio === 'high' && element.category === this.Start.currentUser.department){
      if(this.highTask.indexOf(element) === -1)
      { this.highTask.push(element);}
       
      }
    })
  }


}
