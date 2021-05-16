from .db import db
from .image import Image

class Answer(db.Model):
  __tablename__ = 'answers'

  id = db.Column(db.Integer, primary_key = True)
  description = db.Column(db.Text, nullable = False)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  error_id = db.Column(db.Integer, db.ForeignKey('errors.id'), nullable=False)

  user = db.relationship(
    "User", 
    back_populates="answers"
  )
  error = db.relationship(
    "Error", 
    back_populates="answers"
  )

  images = db.relationship(
    'Image',
     primaryjoin="and_(Image.parent_type=='answer', foreign(Image.parent_id)==Answer.id)"
  )

  def to_dict(self):
    return {
      "id": self.id,
      "description": self.description,
      "user": self.user.to_dict(),
      "error": self.error.to_dict(),
      "images": [image.url for image in self.images]
    }