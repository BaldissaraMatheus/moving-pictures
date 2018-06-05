$(document).ready(() => {
  /*
  $('#searchForm').on('submit', (e) => {
    let searchText = console.log($('#searchText').val());
    
    getMovies(searchText);
    e.preventDefault();
  });
  */
  let searchResult = 'raw';

  $.ajax({
    method: 'GET',
    url: `http://www.omdbapi.com/?t=${searchResult}&apikey=${key}`,
    dataType: 'json'
  }).done((data) => {   
    const title = data.Title;
    const plot = data.Plot;
    const poster = data.Poster;

    $.get('includes/card.inc.html', (data) => {
      $('#result').append(data);
      $('#card-title').text(title).removeAttr('id');
      $('#card-content').text(plot).removeAttr('id');
      $('#card-image').attr('src', poster).removeAttr('id');
     });
    /*
    $.each(data, (movie, i) => {
      console.log(movie.Title);
      $.get('includes/card.inc.html', (data) => {
       $('#result').append(data);
       $('#card-title').text(movie.Title).removeAttr('id');
       //$('#card-content').text(movie.Year).removeAttr('id');
      });
    });  
  */   
  });
});

function getMovies(text) {

}