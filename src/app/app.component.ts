import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth";
import { Router } from '@angular/router';
import { currentUser } from './models/currentUser.class';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  initials;
  currenUserID;
  title = 'join-angular';
  currentUser: currentUser = new currentUser;
  isLogin = false;
  userID = ''; // zum release leer
  constructor(
    private firestore: AngularFirestore,
    public router: Router,
    private _snackBar: MatSnackBar,
  ){}
  ngOnInit(){
     // zum release keine funktion
  }

  login2(email, password){
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
  this.userID = userCredential.user.uid 
    this.isLogin = true;

    this.determineTheCurrentUser()
    
    // Signed in 

    // ...
  })
  .catch((error) => {
    this.openSnackBar()
  });
  }

  logout(){
    this.isLogin = true;
    this.userID = '';
    this.initials = '';
    this.currenUserID = '';
    this.router.navigate(['']);
  }


  determineTheCurrentUser(){

    this.firestore
    .collection('users')
    .valueChanges({idField: 'customIdName'})
    .subscribe((allUsers:any) => {
      this.currentUser = allUsers.find((user)=> user.uid === this.userID)
      this.initials = this.currentUser.firstName.charAt(0) + this.currentUser.lastName.charAt(0);
 },
    )

      

    this.router.navigate(["summary"])


  }

  test(){
    console.log(this.currentUser)
  }

  openSnackBar() {
    this._snackBar.open('Wrong password or email!', 'OK', {
      duration: 4000, // Dauer von 2 Sekunden
    });
  }

  isResponsivScreen(){
    return window.innerWidth < 700;
  }
  
}
