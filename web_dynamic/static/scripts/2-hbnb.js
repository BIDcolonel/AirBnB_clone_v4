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
      url: 'http://0.0.0.0:5001/api/v1/status/',
      success(response) {
          const apiStatus = $('#api_status');
          if (response.status === 'OK') {
              apiStatus.addClass('available');
          } else {
              apiStatus.removeClass('available');
          }
      },
      error(error) {
          console.error('Error fetching API status', error);
      },
  });
});
