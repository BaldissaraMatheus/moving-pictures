$(document).ready(() => {
  
  $('#searchForm').on('submit', (e) => {
    let searchText = console.log($('#searchText').val());
    
    clearCards();
    getMovies(searchText);
    e.preventDefault();
  });
  
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
      $('#card-content').text(title).removeAttr('id');
      $('#card-image').attr('src', poster).removeAttr('id');
     });
  });
});

function getMovies(input) {
  $.ajax({
    method: 'GET',
    url: `http://www.omdbapi.com/?s=${input}&page=1&apikey=${key}`,
    dataType: 'json'
    
  }).done((data) => {
    console.log(data);
    $.each(data.Search, (i) => { 
      const movie = data.Search[i];
      
      $.get('includes/card.inc.html', (html) => {
       $('#result').append(html);
       $('#card-content').text(movie.Title).removeAttr('id');
       $('#card-image').attr('src', movie.Poster).removeAttr('id');
      });
      
    });  
  }).fail(()=> {
    console.log('erro');
  });
}

function clearCards() {
  $('#result').html('');
}