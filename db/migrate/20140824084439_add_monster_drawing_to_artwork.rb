class AddMonsterDrawingToArtwork < ActiveRecord::Migration
  def self.up
    add_attachment :artworks, :monsterdrawing
  end

  def self.down
    remove_attachment :artworks, :monsterdrawing
  end
end
