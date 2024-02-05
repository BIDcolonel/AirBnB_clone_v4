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

  $.get('http://0.0.0.0:5001/api/v1/status/')
    .then(response => {
        const apiStatus = $('#api_status');
        apiStatus.toggleClass('available', response.status === 'OK');
    })
    .catch(error => {
        console.error('Error fetching API status', error);
    });
});
