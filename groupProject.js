$(document).ready(function() {
  $("#search").on("click",function(search){
      var searchTerm = $("#searchTerm").val();
      var url1 = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+searchTerm+"&format=json&callback=?";
      $.ajax({
          url: url1,
          type: 'GET',
          contentType: "application/json; charset=utf-8",
          async: false,
          dataType: "json",
          success: function(data, status, jqXHR) {
              console.log(data);
              $(".cardInformation").html();                           
              $(".cardInformation").prepend(data[1][0]+data[2][0]);
              $(".list-group-item").html();
              $(".link a").attr("href", data[3][0])
              
          }
      });
      var API_KEY = '9020108-050b7e5675dcdeec71c928ead';
      var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(searchTerm);
      $.getJSON(URL, function(data){
          if (parseInt(data.totalHits) > 0)
          $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
          else
          console.log('No hits');
          console.log(data);
          $(".cardImg").attr("src", data.hits[0].previewURL)
         
      });
  });
});
 
 
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBKDO_BGRk1EVjsvzPt_89-ZLTRkYlMvwM",
    authDomain: "groupproject-417be.firebaseapp.com",
    databaseURL: "https://groupproject-417be.firebaseio.com",
    projectId: "groupproject-417be",
    storageBucket: "groupproject-417be.appspot.com",
    messagingSenderId: "66042039765"
  };
  firebase.initializeApp(config);

  var dataRef = firebase.database();

  // Initial Values
  var recentSearch = "";

  // Capture Button Click
  $("#search").on("click", function(event) {
    event.preventDefault();
    //console.log("buttonclicked")
    recentSearch = $("#searchTerm").val().trim();

    dataRef.ref().push({
        recentSearch: recentSearch

    });
});

dataRef.ref().on("child_added", function(childSnapshot) {
    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().recentSearch);

    // Add each train's data into the table
  $("#timeTable > tbody").append("<tr><td>" + recentSearch); 

// Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);

  });