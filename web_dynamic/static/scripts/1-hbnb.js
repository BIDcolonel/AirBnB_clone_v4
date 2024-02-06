$(document).ready(function () {
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
    const maxLength = 35;
    if (amenityList.length > maxLength) {
      amenityList = amenityList.substring(0, maxLength) + '...';
    }
    $('.amenities h4').text(amenityList);
  });
});
