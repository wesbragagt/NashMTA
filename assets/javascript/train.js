// CLOCK, time today 
setInterval(function() {
    var today = moment().format("hh:mm:ss a");
    $("#current-time").text((today));
}, 1000);



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

  

  database.ref().push({
    trainName: newTrain.name,
    destination: newTrain.destination,
    time: newTrain.time,
    frequency: newTrain.frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });
});

// Now populate the page with data from firebase

database.ref().on(
    "child_added",
    function(childSnapshot) {
      // console.log(childSnapshot.val().trainName);
      // console.log(childSnapshot.val().destination);
      // console.log(childSnapshot.val().time);
      // console.log(childSnapshot.val().frequency);
      
      var snapVal = childSnapshot.val();
      
      var firstArrive = moment(snapVal.time, "hh:mm").format("hh:mm");
      var now = moment().format("hh:mm");
      var minAway;
  
      
      
      
      // every time the train has not yet passed
      while (moment().unix() > moment(snapVal.time, "hh:mm").unix()){
        //   alert("works");
        snapVal.time = moment(snapVal.time, "hh:mm").add(snapVal.frequency, "m");
        minAway = moment(snapVal.time, "hh:mm").diff(moment(), "m");
         }

    // console.log(moment(snapVal.time, "hh:mm").add(snapVal.frequency, "m").format("hh:mm a"));
        
    // while(moment(snapVal.time, "hh:mm").unix() <= moment().unix()){
    //     snapVal.time = ;
        
    // }

    //   if(moment(now, "hh:mm").unix() >= moment(snapVal.time, "hh:mm").unix()){
    //     //   alert("works")
    //       snapVal = moment(snapVal.time, "hh:mm").add(snapVal.frequency, "m").format("hh:mm a");
    //   }
  
      // every time the train has passed
    //   if (moment(now,"hh:mm").unix() >= moment(firstArrive, "hh:mm").unix()){
    //       snapVal.time = moment(snapVal.time, "hh:mm").add(snapVal.frequency, "m");
          
    //   }
  
      
      var trainDom = {
        name: snapVal.trainName,
        destination: snapVal.destination,
        time: moment(snapVal.time, "hh:mm").format("hh:mm a"),
        frequency: snapVal.frequency,
        minAway: minAway
      };
  
      var newTr = $("<tr>");
  
      // loop through the object and populate the dom with table rows
      $.each(trainDom, function(key, value) {
        $(newTr).append("<td>" + value + "</td>");
      });
  
      $(".train-data").append(newTr);
    },
    function(errorObject) {
      alert(errorObject.data);
    }
  );
