
$('.delete').click(function(event) {
  event.preventDefault();
  var target = $(event.target);
  var id = target.data('id');
  makeRequest('DELETE', './snacks/' + id)
)};
