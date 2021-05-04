importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-messaging.js');
 
firebase.initializeApp({
    apiKey: 'AIzaSyDMYnacJ3gs_gGJSneXdb5xgMFW7VvmP78',
    authDomain: 'ejemplocrud-e7eb1.firebaseapp.com',
    databaseURL: 'ejemplocrud-e7eb1-default-rtdb.firebaseio.com/',
    projectId: 'ejemplocrud-e7eb1',
    storageBucket: 'ejemplocrud-e7eb1.appspot.com',
    appId: "1:673679995766:web:23f456325f057888330057",
    messagingSenderId: '673679995766'
});
 
const messaging = firebase.messaging();