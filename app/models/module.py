from .db import db
from .subscription import subscriptions

class Module(db.Model):
  __tablename__ = 'modules'

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(40), nullable = False, unique = True)

  users = db.relationship(
    "User", 
    secondary=subscriptions, 
    back_populates="modules"
  )

  errors = db.relationship(
    "Error",
    back_populates="module"
  )

  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
    }
