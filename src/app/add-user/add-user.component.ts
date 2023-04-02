import { Component } from '@angular/core';
import { User } from '../models/user.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {MatSnackBar} from '@angular/material/snack-bar';
import { getAuth, createUserWithEmailAndPassword  } from "firebase/auth";
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})


export class AddUserComponent {
  createUserloading = false;
  checked = false;
  indeterminate = false;
  disabled = false;
  user: User = new User({});
 


constructor(
 public firestore: AngularFirestore,
 private _snackBar: MatSnackBar
){}


ngOnInit(){
 
}
  
test(b){
 console.log(b.value)
 b.value = '';
}


newUser(password, userForm){
  this.createUserloading = true;

  const auth = getAuth();
  createUserWithEmailAndPassword(auth, this.user.mail, password.value)
  .then((userCredential) => {
    
    this.addNewUserToFirebase(userCredential.user.uid, userForm)
})
this.createUserloading = false;
this.openSnackBar()
  password.value = '';
 }

 addNewUserToFirebase(userID, userForm){
  this.user.uid = userID;
  
  this.firestore
  .collection('users')
  .add(
    this.user.toJSON()
  ) 

  userForm.reset()
  
 }

openSnackBar() {
  this._snackBar.open('the user is added!', 'OK', {
    duration: 4000, // Dauer von 2 Sekunden
  });
}


}
