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

    L.gridLayer.googleMutant({
        type:    'satellite',
        maxZoom: 23
    }).addTo(mymap)

    mymap.on('click', roofs.addMarker.bind(this))
  }
}

roofs.addMarker = function(event) {
  var newMarker = new L.marker(event.latlng, {
    draggable: 'true',
    icon: L.divIcon({
      className:  'leaflet-mouse-marker',
      iconAnchor: [6, 6],
      iconSize:   [12, 12]
    })
  })

  //this.markerList.push(newMarker)
  //this.drawPoly(this.markerList)

  return this
}

$(function() {
  roofs.initMap()
});
