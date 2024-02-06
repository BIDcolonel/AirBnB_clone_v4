$(document).ready(() => {
  const amenityIds = {};

  function updateAmenitiesList () {
    $('input[type="checkbox"]').on('change', function () {
      const amenityId = $(this).data('id');
      const amenityName = $(this).data('name');

      if (this.checked) {
        amenityIds[amenityId] = amenityName;
      } else {
        delete amenityIds[amenityId];
      }

      let amenityList = Object.values(amenityIds).join(', ');
      const maxLength = 35;

      if (amenityList.length > maxLength) {
        amenityList = `${amenityList.substring(0, maxLength)}...`;
      }

      $('.amenities h4').text(amenityList);
    });
  }

  function fetchPlaces () {
    $.post({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: Object.keys(amenityIds) })
    })
      .then((response) => {
        response.forEach((place) => {
          const article = $('<article>');
          article.html(`
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">$${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">
              ${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}
            </div>
            <div class="number_rooms">
              ${place.number_rooms} Bedroom${
            place.number_rooms !== 1 ? 's' : ''
          }
            </div>
            <div class="number_bathrooms">
              ${place.number_bathrooms} Bathroom${
            place.number_bathrooms !== 1 ? 's' : ''
          }
            </div>
          </div>
          <div class="description">${place.description}</div>`);
          $('section.places').append(article);
        });
      })
      .catch((error) => {
        console.error('Error fetching places:', error);
      });
  }

  function fetchAPIStatus () {
    $.get('http://0.0.0.0:5001/api/v1/status/')
      .then((response) => {
        const apiStatus = $('#api_status');
        apiStatus.toggleClass('available', response.status === 'OK');
      })
      .catch((error) => {
        console.error('Error fetching API status', error);
      });
  }

  updateAmenitiesList();
  fetchPlaces();
  fetchAPIStatus();

  $('button').click(() => {
    $('section.places').empty();
    fetchPlaces();
  });
});
