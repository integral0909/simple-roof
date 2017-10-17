class RoofsController < ApplicationController
  def show
    coords = Geocoder.search(params[:id]).first.coordinates
    @roof  = Roof.new(address: params[:id], latitude: coords[0], longitude: coords[1])
  end

  def create
    @roof = Roof.new(roof_params)
    respond_to do |format|
      if @roof.save
        format.js { RoofMailer.estimation(@roof).deliver_now }
      else
        format.js
      end
    end
  end

  private

  def roof_params
    params.require(:roof).permit(:name, :email, :address, :phone, :latitude, :longitude, :area, :slope, :estimation)
  end
end
