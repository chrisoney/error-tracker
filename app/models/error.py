from .db import db
from .image import Image

class Error(db.Model):
  __tablename__ = 'errors'

  id = db.Column(db.Integer, primary_key = True)
  title = db.Column(db.String(255), nullable = False)
  description = db.Column(db.Text, nullable = False)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  module_id = db.Column(db.Integer, db.ForeignKey('modules.id'), nullable=False)

  user = db.relationship(
    "User", 
    back_populates="errors"
  )
  module = db.relationship(
    "Module", 
    back_populates="errors"
  )
  answers = db.relationship(
    "Answer", 
    back_populates="error"
  )

  images = db.relationship(
    'Image',
     primaryjoin="and_(Image.parent_type=='error', foreign(Image.parent_id)==Error.id)",
     lazy="dynamic"
  )

  def to_dict(self):
    return {
      "id": self.id,
      "title": self.title,
      "description": self.description,
      "user": self.user.to_dict(),
      "module": self.module.to_dict(),
      "images": [image.url for image in self.images],
      "answer_count": len(self.answers)
    }
