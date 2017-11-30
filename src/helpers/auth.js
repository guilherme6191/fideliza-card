import { db, firebaseAuth } from '../config/constants';

export function auth(email, pw) {
  return firebaseAuth()
    .createUserWithEmailAndPassword(email, pw)
    .then(saveUser);
}

export function logout() {
  return firebaseAuth().signOut();
}

export function login(email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw);
}

export function resetPassword(email) {
  return firebaseAuth().sendPasswordResetEmail(email);
}

export function saveAuthState(user) {
  localStorage.setItem('username', user.name);
  localStorage.setItem('userUid', user.uid);
}

export function clearAuthState() {
  localStorage.removeItem('username');
  localStorage.removeItem('userUid');
}

export function saveUser(user) {
  debugger;
  return db
    .collection(`users`)
    .add({
      email: user.email,
      uid: user.uid,
      commercial: true
    })
    .then(docRef => {
      debugger;
      console.log(docRef);
    })
    .catch(function(error) {
      console.error('Error adding document: ', error);
    });
}
