class RoofsController < ApplicationController
  def show
    @coordinates = Geocoder.search(params[:id]).first.coordinates
  end
end
