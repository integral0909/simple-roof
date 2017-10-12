roofs = {}

roofs.init = function() {
  this.$form  = $('#roofs-form')
  this.$input = $('#roofs-autocomplete')

  this.listenSubmit()
  this.initAutocomplete()
}

roofs.initAutocomplete = function() {
  this.autocomplete = new google.maps.places.Autocomplete(this.$input[0])
  this.autocomplete.addListener('place_changed', roofs.fillInAddress)
}

roofs.listenSubmit = function() {
  roofs.$form.submit(function() {
    if (roofs.place) {
      window.location.href = '/roofs/' + roofs.place
    }

    return false
  })
}

roofs.fillInAddress = function() {
  var place = roofs.autocomplete.getPlace()
  var geo   = place.geometry

  if (geo) {
    roofs.place = roofs.$input.val()
  }
}
