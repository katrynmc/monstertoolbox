class ArtworksController < ApplicationController

  def index
    @artworks = Artwork.order(created_at: :desc)
  end

  def show
    @artwork = Artwork.find(params[:id])
  end

  def new
    @artwork = Artwork.new
  end

  def create
    @artwork = Artwork.new(artwork_params)

    if @artwork.save
      redirect_to @artwork, notice: 'Your drawing was successfully saved.'
     else
      render Rails.application.routes.recognize_path(request.referer)[:action]
    end
  end

  private

  def artwork_params
    params.require(:artwork).permit(:monsterdrawing, :name, :artist)
  end
end

