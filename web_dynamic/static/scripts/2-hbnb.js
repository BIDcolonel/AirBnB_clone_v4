$(document).ready(() => {
    const amenityIds = {};
    $('input[type="checkbox"]').on('change', function () {
      const amenityId = $(this).data('id');
      const amenityName = $(this).data('name');

      if ($(this).is(':checked')) {
        amenityIds[amenityId] = amenityName;
      } else {
        delete amenityIds[amenityId];
      }

      let amenityList = Object.values(amenityIds).join(', ');
      const longueurMax = 35;
      if (amenityList.length > longueurMax) {
        amenityList = `${amenityList.substring(0, longueurMax)}...`;
      }
      $('.amenities > h4').text(amenityList);
    });
  });

  $(document).ready(() => {
    $.ajax({
        url: 'http://0.0.0.0:5000/api/v1/status/',
        success(response) {
            if (response.status === 'OK') {
                $('#api_status').addClass('available');
            } else {
                $('#api_status').removeClass('available');
            }
        },
        error(error) {
            console.error('Error fetching API status', error);
        },
    });
  });
