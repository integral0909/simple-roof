class RoofsController < ApplicationController
  def show
    @coordinates = Geocoder.search(params[:id]).first.coordinates
    @roof        = Roof.new
  end

  def create
    @roof = Roof.new(roof_params)
    respond_to do |format|
      format.js
    end
  end

  private

  def roof_params
    params.require(:roof).permit(:name, :email, :address, :latitude, :longitude, :area, :estimation)
  end
end
