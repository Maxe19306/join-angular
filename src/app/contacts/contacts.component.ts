import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
constructor(public firestore: AngularFirestore){}

allUsers = [];

ngOnInit(){
  this.loadAllUsers()

  
}


loadAllUsers(){
  
  this.firestore
  .collection('users')
  .valueChanges()
  .subscribe((user)=>
  this.allUsers = user,
  )
 
 
}

}
