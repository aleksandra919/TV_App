

export const getShowsByKey = key => {
    return fetch(
        `http://api.tvmaze.com/search/shows?q=${key}`
    )
    .then(response =>  response.json())
}

export const getShowsById = id => {
    return fetch(
        `http://api.tvmaze.com/shows/shows/${id}/embed=cast`
    )
    .then(response => response.json())
}