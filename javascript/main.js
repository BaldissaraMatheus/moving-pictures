$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let searchText = ($('#searchText').val());
    
    clearCards();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(input) {
  $.ajax({
    method: 'GET',
    url: `http://www.omdbapi.com/?s=${input}&page=1&apikey=${key}`,
    dataType: 'json'
    
  }).done((data) => {
    $.each(data.Search, (i) => { 
      const movie = data.Search[i];
      
      $.get('includes/card.inc.html', (html) => {
       $('#result').append(html);
       $('#card-content').text(movie.Title).removeAttr('id');
       $('#card-image').attr('src', movie.Poster).removeAttr('id');
       $('#details-button').attr('onClick', `movieSelected("${movie.imdbID}")`).removeAttr('id');
      });      
    });  
  });
}

function clearCards() {
  $('#result').html('');
}

function movieSelected(id) {
  sessionStorage.setItem('movieId', id);
  window.location = 'details.html';
  return false;
}

function getMovie() {
  const movieId = sessionStorage.getItem('movieId');

  $.ajax({
    method: 'GET',
    url: `http://www.omdbapi.com/?i=${movieId}&apikey=${key}`,
    dataType: 'json'

  }).done((movie) => {
    $.get('includes/details.inc.html', (html) => {     
      $('#movie-details').append(html);
      $('#poster').attr('src', movie.Poster);
      $('#title').text(movie.Title);
      $('#genre').text(movie.Genre);
      $('#year').text(movie.Year);
      $('#rated').text(movie.Rated);      
      $('#director').text(movie.Director);
      $('#actors').text(movie.Actors);   
      $('#rating').text(movie.imdbRating);                
     });
  });  
}