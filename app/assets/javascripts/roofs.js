roofs = {}

roofs.init = function() {
  this.$form  = $('#roofs-form')
  this.$input = $('#roofs-autocomplete')

  this.listenSubmit()
  this.initAutocomplete()
}

roofs.listenSubmit = function() {
  roofs.$form.submit(function() {
    if (roofs.place) {
      window.location.href = '/roofs/' + roofs.place
    }

    return false
  })
}

roofs.initAutocomplete = function() {
  this.autocomplete = new google.maps.places.Autocomplete(this.$input[0])
  this.autocomplete.addListener('place_changed', roofs.fillInAddress)
}

roofs.fillInAddress = function() {
  var place = roofs.autocomplete.getPlace()
  var geo   = place.geometry

  if (geo) {
    roofs.place = roofs.$input.val()
  }
}

roofs.initMap = function() {
  $map = $('#roofs-map')
  if ($map.length) {
    var mymap = new L.Map($map[0], {
      center: new L.LatLng($map.data('lat'), $map.data('lng')),
      zoom:   19
    })
    var roads = L.gridLayer.googleMutant({
        type:    'satellite',
        maxZoom: 23
    }).addTo(mymap);
  }
}

$(function() {
  roofs.initMap()
});
