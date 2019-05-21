import firebase from 'firebase';
// Required for side-effects
import 'firebase/firestore';

// Initialize Cloud Firestore + auth through Firebase
firebase.initializeApp({
    apiKey: 'TODO: Add apiKey',
    authDomain: 'TODO: Add authDomain',
    projectId: 'TODO: add projectId'
});