jQuery(document).ready(function($){

// Grab the articles as a json
$.getJSON("/articles", function(data) {
  for (var i = 0; i < 10; i++) {

     $("#articles").append("<div class='col-sm-12' style='margin-bottom:60px;'><div class='card'><div class='card-body'><a class='title-link' href='" + data[i].link +"'><h5>" 
     + data[i].title + "</h5></a><hr><p class='card-text'>" + data[i].summary + "</p><button id='save-btn' data-id='" 
     + data[i]._id + "' class='btn btn-outline-primary btn-sm'>Save Article</button></div></div></div>"
    );
}

  console.log(data);
});

$(document).on("click", ".fetch-btn", function() {
 
  $.ajax({
    method: "GET",
    url: "/scrape"
  })
    .done(function(data) {
      location.reload();
    });
});

$(document).on("click", ".delete-btn", function() {
  

  for (var i = 0; i < 10; i++) {
  $.ajax({
    method: "PUT",
    url: "/delete/" + i,
  
  })
``
  
  .done(function(data) {
      console.log(data);
      location.reload();
  });
  }
});


$(document).on("click", "#save-btn", function() {
  $(this).addClass("disabled");
  var thisId = $(this).attr("data-id");
  console.log(thisId);

  $.ajax({
    method: "PUT",
    url: "/saved/" + thisId,
   
  })
  
  .done(function(data) {
      console.log(data);
  });
});

});
