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
  $map                = $('#roofs-map')
  this.markers        = []
  this.calculatedPoly = null

  if ($map.length) {
    this.myMap = new L.Map($map[0], {
      center: new L.LatLng($map.data('lat'), $map.data('lng')),
      zoom:   20
    })

    L.gridLayer.googleMutant({
        type:    'satellite',
        maxZoom: 23
    }).addTo(this.myMap)

    this.myMap.on('click', roofs.addMarker.bind(this))
  }
}

roofs.addMarker = function(event) {
  var marker = new L.marker(event.latlng, {
    draggable: 'true',
    icon: L.divIcon({
      className:  'leaflet-mouse-marker',
      iconAnchor: [6, 6],
      iconSize:   [12, 12]
    })
  }).on('dragend', function(event){
    var marker   = event.target
    var position = marker.getLatLng()
    marker.setLatLng(new L.LatLng(position.lat, position.lng), { draggable:'true' })
    roofs.drawPoly()
  }).addTo(roofs.myMap)

  roofs.markers.push(marker)
  roofs.drawPoly()

  return this
}

roofs.drawPoly = function() {
  var coordinates = roofs.markers.map(function(value, index){ return [value.getLatLng().lat, value.getLatLng().lng] })
  var polygones   = coordinates.concat([new L.LatLng(coordinates[0][0], coordinates[0][1])])

  if (this.calculatedPoly !== null) { this.calculatedPoly.removeFrom(roofs.myMap) }
  this.calculatedPoly = L.polyline(polygones, { 'fill': true }).addTo(roofs.myMap)
}

$(function() {
  roofs.initMap()
});
