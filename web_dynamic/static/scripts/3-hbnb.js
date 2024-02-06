$(document).ready(() => {
  const amenityIds = {};

  $('input[type="checkbox"]').on('change', function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if (this.checked) {
      amenityIds[amenityId] = amenityName;
    } else {
      delete amenityIds[amenityId];
    }

    let amenityList = Object.values(amenityIds).join(', ');
    const maxLength = 37;

    if (amenityList.length > maxLength) {
      amenityList = `${amenityList.substring(0, maxLength)}...`;
    }

    $('.amenities h4').text(amenityList);
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: (response) => {
      const placesSection = $('.places');
      placesSection.empty();

      response.forEach(place => {
        const articleTag = $('<article>').append($('<h2>').text(place.name));
        articleTag.append($('<div>').addClass('price_by_night').text(`$${place.price_by_night}`));
        articleTag.append($('<div>').addClass('information').append($('<div>').addClass('max_guest').text(`${place.max_guest} Guests`)).append($('<div>').addClass('number_rooms').text(`${place.number_rooms} Rooms`)).append($('<div>').addClass('number_bathrooms').text(`${place.number_bathrooms} Bathrooms`)));
        articleTag.append($('<div>').addClass('user').append($('<b>').text('Owner:')).append(` ${place.user.first_name} ${place.user.last_name}`));
        articleTag.append($('<div>').addClass('description').text(place.description));
        placesSection.append(articleTag);
      });
    },
    error: (error) => {
      console.error('Error fetching places data', error);
    }
  });

  $.get('http://0.0.0.0:5001/api/v1/status/')
    .then(response => {
      const apiStatus = $('#api_status');
      apiStatus.toggleClass('available', response.status === 'OK');
    })
    .catch(error => {
      console.error('Error fetching API status', error);
    });
});
