// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyA6FtAME0xv8SSkRGRoIjcWi2uAox6XcXs",
    authDomain: "innovpsost.firebaseapp.com",
    databaseURL: "https://innovpsost-default-rtdb.firebaseio.com",
    projectId: "innovpsost",
    storageBucket: "innovpsost.firebasestorage.app",
    messagingSenderId: "618291713684",
    appId: "1:618291713684:web:b7d661a0c6d634dc5e8681"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database
const database = getDatabase(app);

export { database };