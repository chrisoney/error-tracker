from .db import db

class Error(db.Model):
  __tablename__ = 'errors'

  id = db.Column(db.Integer, primary_key = True)
  title = db.Column(db.String(80), nullable = False, unique = True)
  description = db.Column(db.Text, nullable = False, unique = True)
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

  def to_dict(self):
    return {
      "id": self.id,
      "title": self.title,
      "user": self.user.to_dict(),
      "module": self.module.to_dict()
    }
