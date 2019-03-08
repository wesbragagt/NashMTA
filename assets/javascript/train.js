// FIREBASE SETUP
var config = {
  apiKey: "AIzaSyB_GT3xo5NCtU9LsVOmTEzpKQLQtX0PTso",
  authDomain: "trainscheduler-466af.firebaseapp.com",
  databaseURL: "https://trainscheduler-466af.firebaseio.com",
  projectId: "trainscheduler-466af",
  storageBucket: "trainscheduler-466af.appspot.com",
  messagingSenderId: "788946265515"
};
firebase.initializeApp(config);

var database = firebase.database();

var newTrain = {
  name: "",
  destination: "",
  time: "",
  frequency: 0
};

// ON CLICK SUBMIT BUTTON
$("#train-submit").on("click", function(event) {
  event.preventDefault();

  newTrain.name = $("#train-name-input")
    .val()
    .trim();
  newTrain.destination = $("#destination-input")
    .val()
    .trim();
  newTrain.time = $("#first-train-input").val();
  newTrain.frequency = $("#frequency").val();

  console.log("---------------------------");

  database.ref().push({
    trainName: newTrain.name,
    destination: newTrain.destination,
    time: newTrain.time,
    frequency: newTrain.frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });
});

// Now populate the page with data from firebase

database.ref().on("child_added", function(childSnapshot) {
  //   console.log(childSnapshot.val().trainName);
  //   console.log(childSnapshot.val().destination);
  //   console.log(childSnapshot.val().time);
  //   console.log(childSnapshot.val().frequency);

  var trainDom = {
    name: childSnapshot.val().trainName,
    destination: childSnapshot.val().destination,
    time: childSnapshot.val().time,
    frequency: childSnapshot.val().frequency
  };

  var newTr = $("<tr>");

  // loop through the object and populate the dom with table rows
  $.each(trainDom, function(key, value) {
    console.log(value);

    $(newTr).append("<td>" + value + "</td>");
  });

  $(".train-data").append(newTr);
});
