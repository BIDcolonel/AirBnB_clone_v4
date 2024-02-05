$(document).ready(function () {
  const amenitiesNames = [];
  const amenitiesIds = [];

  $('input:checkbox').change(
    function () {
      if ($(this).is(':checked')) {
        const dataID = ($(this).parent().parent().attr('data-id'));
        const name = ($(this).parents('li').attr('data-name'));
        amenitiesIds.push(dataID);
        amenitiesNames.push(name);
      } else {
        amenitiesIds.pop();
        amenitiesNames.pop();
        console.log(amenitiesNames);
      }
      if (amenitiesNames.length === 0) {
        $('.amenities h4').html('&nbsp;');
      } else {
        $('.amenities h4').text(amenitiesNames.join(', '));
      }
    });
});
