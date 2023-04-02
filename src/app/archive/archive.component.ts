import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent {
  searchedYear = null
  archiv = []
  archivFormated = []
  allYears = []
constructor(
  public firestore: AngularFirestore,
){
  
}

ngOnInit(){
   this.loadArchiv()
}

loadArchiv(){
  this.archiv = [];
  this.firestore
  .collection('archiv')
  .valueChanges({idField: 'archivIdName'})
  .subscribe((archiv: any) => {
    this.archiv = archiv;
    this.formatedDateArchiv()
  })
}


formatedDateArchiv(){
  this.archivFormated = []
  this.archiv.forEach(task => {
    const taskDate = new Date(task.date)
    const formattedDate = `${taskDate.getMonth() + 1}.${taskDate.getDate()}.${taskDate.getFullYear()}`;
    const year = taskDate.getFullYear()
    const existingTaskIndex = this.archivFormated.findIndex(t => t.archivIdName === task.archivIdName);
    if (existingTaskIndex === -1) {
      this.archivFormated.push({...task, formattedDate, year});
    } else {
      this.archivFormated[existingTaskIndex] = {...task, formattedDate, year};
    }
  })
  this.checkAllYears()
  console.log(this.archivFormated)
}

checkAllYears(){
  const uniqueYears = new Set<number>();

this.archivFormated.forEach(task => {
  const year = task.year;
  if (!uniqueYears.has(year)) {
    uniqueYears.add(year);
  }
});

this.allYears = Array.from(uniqueYears);
this.allYears.sort((a, b) => a - b);
console.log(this.allYears);
}


searchTasksByYear(year){
  this.searchedYear = year
}


searchAllTask(){
  this.searchedYear = null;
}

}
