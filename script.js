function getMovies() {
    $('#movie-list').html("")
    $.ajax({
        'url': 'http://omdbapi.com',
        'type': 'get',
        'dataType': 'json',
        'data': {
            'apikey': 'a7d1eac',
            's': $('#search-input').val()
        },
        success: function(result) {
            if(result.Response == 'True') {
                let movies = result.Search
                

                $.each(movies, function(i, data) {
                    $('#movie-list').append(
                    `<div class="col-md-4">
                            <div class="card">
                            <img src=`+ data.Poster +` class="card-img-top">
                            <div class="card-body">
                            <h5 class="card-title">`+ data.Title +`</h5>
                            <p class="card-muted">`+ data.Year +`</p>
                            <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal" class="text-decoration-none see-detail" data-id=`+ data.imdbID +`>See Detail</a>
                            </div>
                        </div>
                    </div>`
                  )
                  $('#search-input').val('')
                })
            } else {
                $('#movie-list').html('<h2 class="text-danger text-center">'+ result.Error +'</h2>')
            }
        }
    })
}

$('#search-button').on('click', function () {
    getMovies()
})

$('#search-input').on('keyup', function(e) {
    if(e.keyCode == 13) {
        getMovies()
    }
})

$('#movie-list').on('click', '.see-detail', function() {
    $.ajax({
        'url': 'http://omdbapi.com',
        'type': 'get',
        'dataType': 'json',
        'data': {
            'apikey': 'a7d1eac',
            'i': $(this).data('id')
        },
        success: function(result) {
            if(result.Response == 'True') {
                $('.modal-title').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                            <img src=`+ result.Poster +` class="img-fluid">
                            </div>

                            <div class="col-md-8">
                                <h2>`+ result.Title +`</h2>
                                <hr>
                                <p class="text-muted">`+ result.Year +`</p>
                                <p>Director: `+ result.Director +`</p>
                                <p>Actors: `+ result.Actors +`</p>
                                <p>Plot: `+ result.Plot +`</p>
                            </div>
                        </div>
                    </div>
                `)
            }
        }
    })
})