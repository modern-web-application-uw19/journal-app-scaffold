import firebase from 'firebase';
// Required for side-effects
import 'firebase/firestore';

// Initialize Cloud Firestore + auth through Firebase
firebase.initializeApp({
    apiKey: 'TODO: Add API Key',
    authDomain: 'TODO: Add authDomain',
    projectId: 'TODO: Add projectId'
});
