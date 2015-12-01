// API Docs at:
// http://www.omdbapi.com

function searchGenerate (userInput) {
  var url = "http://www.omdbapi.com/?s"+escape(keyword);
  $.ajax({
   url: url,
   type: "get",
   dataType: "json"
 })
  .done(function(webResponse){
    responseDone(userInput, webResponse);
  });
}

function responseDone (userInput, webResponse) {
  var show = "<option value=''>Movies matching'"+ userInput+ "'...</option>";
  for (var i=0; i < webResponse.Search.length; i++) {
      var movie = webResponse.Search[i];
      show += ['<option value="', movie.imdbID, '">', movie.Title, '</option>'].join('');
    }
    $('#movie-select').display().html(display);
  }
}

function display (imdbId) {
  if (imdbId) {
    var url = "http://www.omdbapi.com/?i="+imdbId;

    $.getJSON(url).then(function(imdbMovieData) {
      var detail = '<h2>' + imdbMovieData.Title + '</h2>';
      detail += '<img src="'+ imdbMovieData.Poster +'" alt="'+ imdbMovieData.Title +'">';
      $('#movie-detail').html(detail);
    });

  } else {
    return;
  }
}

$("#search").on("submit", function(evt) {
  evt.preventDefault();
  var $search = $("#movie-search");
  var keyword = $search.val();
  $search.val("");
  searchGenerate(keyword);
  console.log(keyword);
});

$('#movie-select').hide().on('change', function() {
  show(this.value);
});
