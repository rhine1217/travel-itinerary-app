$('#place-search').on('click', e => {
    e.preventDefault();
    const tripId = window.location.href.split('/').slice(-1)[0] 
    const queryStr = $('form').serialize().split('&')
    const dataToSend = {
        tripId,
        keyword: queryStr[0].split('=')[1],
        placeType: queryStr[1].split('=')[1],
    }

    console.log(dataToSend) // to remove

    fetch('/places/search', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data) // to remove
        renderSearchResults(data)
    })
    .catch(error => {
        console.error('Error:', error)
    })
})

$('.checkbox').on('click', e => {
    e.preventDefault();
    $checkbox = $(e.target.closest('.checkbox'))
    toggleChecked($checkbox)
})

/* Helper Functions */

function renderSearchResults(data) {
    data.places.forEach(result => {

        let typeStr = ''

        result.types.forEach(type => {
            type = type.replace(/_/g, " ")
            typeStr += `<span class="badge badge-pill badge-primary">${type}</span>&nbsp;`
        })

        result.placeUrl = `https://www.google.com/maps/search/?api=1&query=${result.geometry.location.lat},${result.geometry.location.lng}&query_place_id=${result.place_id}`

        const renderStr = `

        <div class="row place-search-result" id="${result.place_id}">
            <div class="col-2 d-flex justify-content-end">
                <div class="checkbox place-not-checked">
                    <i class="bi bi-circle"></i>
                </div>
                <i class="bi bi-geo-alt-fill place-icon"></i>
            </div>
            <div class="col-6">
                <a href="${result.placeUrl}" target="_blank" class="place-link"><div>${result.name}</div></a>
                <div class="place-types">${typeStr}</div>
                <div>${result.formatted_address}</div>
            </div>
        </div>
        `

        $('#search-results').append(renderStr)
        $(`#${result.place_id}`).on('click', e => {
            e.preventDefault();
            $checkbox = $(e.target.find('.checkbox'))
            toggleChecked($checkbox)
        })

    })
}

function toggleChecked($checkbox) {

    $checkbox.toggleClass('place-not-checked')
    $checkbox.toggleClass('place-checked')
    $checkbox.empty()
    if ($checkbox.hasClass('place-checked')) {
        $checkbox.append('<i class="bi bi-check-circle"></i>')
    } else if ($checkbox.hasClass('place-not-checked')) {
        $checkbox.append('<i class="bi bi-circle"></i>')
    }
}