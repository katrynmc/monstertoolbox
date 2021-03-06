class Artwork < ActiveRecord::Base
  has_attached_file :monsterdrawing, styles: {
    thumb: '100x100>',
    square: '400x400#',
    medium: '900x500>'
  }

  # Validate the attached image is image/jpg, image/png, etc
  validates_attachment_content_type :monsterdrawing, :content_type => /\Aimage\/.*\Z/
end
