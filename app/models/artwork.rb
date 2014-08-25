class Artwork < ActiveRecord::Base
  has_attached_file :monsterdrawing, styles: {
    thumb: '100x100>',
    square: '200x200#',
    medium: '800x400>'
  }

  # Validate the attached image is image/jpg, image/png, etc
  validates_attachment_content_type :monsterdrawing, :content_type => /\Aimage\/.*\Z/
end
