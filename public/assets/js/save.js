jQuery(document).ready(function($){

// Grab the articles as a json
$.getJSON("/saved", function(data) {
  for (var i = 0; i < data.length; i++) {
  $("#articles").append(
      "<div class='col-sm-12'><div class='card'><div class='card-body'><a class='title-link' href='" + data[i].link +"'><h5>" 
      + data[i].title + "</h5></a><hr><p class='card-text'>" + data[i].summary
      + "</p><button data-id='" + data[i]._id + "' class='note-btn btn btn-sm' data-toggle='modal' data-target='#myModal';'>Note</button><button id='delete-btn' data-id='" 
      + data[i]._id + "' class='btn btn-sm'>Delete</button></div></div></div>"
    );
}
  console.log(data);
});

$(document).on("click", ".note-btn", function() {
  $(".modal-title").empty();
  $(".input").empty();
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    .done(function(data) {
      console.log(data);

      $(".modal-title").append("<h5>" + data.title + "</h5>");
      $(".input").append("<textarea id='bodyinput' name='body'></textarea>");
      $(".input").append("<button data-id='" + data._id + "' id='savenote' class='btn btn-primary btn-sm';'data-dismiss='modal'>Save Note</button>");
      if (data.note) {
        $("#bodyinput").val(data.note.body);
      }
    });
});

$(document).on("click", "#save-note", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $("#titleinput").val(),
      body: $("#bodyinput").val()
    }
  })
    .then(function(data) {
      console.log(data);
      $("#notes").empty();
    });
  $("#titleinput").val("");
  $("#bodyinput").val("");
});


$(document).on("click", "#delete-btn", function() {
  var thisId = $(this).attr("data-id");
  console.log(thisId);
  $.ajax({
    method: "PUT",
    url: "/delete/" + thisId,
   
  })
  .done(function(data) {
      console.log(data);
      location.reload();
  });
});
});