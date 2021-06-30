import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDTckNBflAmW1XzvNn1EgEPTKJEHHMRh8Y",
    authDomain: "yeezy-odds.firebaseapp.com",
    projectId: "yeezy-odds",
    storageBucket: "yeezy-odds.appspot.com",
    messagingSenderId: "1045317345742",
    appId: "1:1045317345742:web:8b2db721b87238fb3c8b9f",
    measurementId: "G-T47VZX1T34"
  };

  firebase.initializeApp(config);

  const database = firebase.database();

  export { database as default };


  // database.ref('Brand/Yeezy')
  // .once('value')
  // .then((snapshot) => {
  // 	const val = snapshot.val();
  // 	console.log(val);
  // }).catch((e) => {
  // 	console.log('Error fetchjing data', e);
  // });

//This will get you stock number for a specific 
// const ref = database.ref("brand/yeezy/500-high-sumac");
// ref.orderByChild("size").equalTo(4).on("child_added", function(snapshot) {
//   console.log(snapshot.val().stock)
// });

// export default (model, size) => {
// 	const path = `brand/yeezy/${model}`;
// 	const ref = database.ref(path);
// ref.orderByChild("size").equalTo(size).on("child_added", function(snapshot) {
//   console.log(snapshot.val().stock)
// });
// }
