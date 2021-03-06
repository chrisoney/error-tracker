from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .subscription import subscriptions
from .follow import follows
from .message import Message

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(40), nullable = False, unique = True)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String(255), nullable = False)

  modules = db.relationship(
    "Module", 
    secondary=subscriptions, 
    back_populates="users"
  )

  follows = db.relationship(
        "User", 
        secondary=follows,
        primaryjoin=(follows.c.follower_id == id),
        secondaryjoin=(follows.c.user_id == id),
        backref=db.backref("followers", lazy="dynamic"),
        lazy="dynamic"
    )

  errors = db.relationship(
    "Error", 
    back_populates="user"
  )
  answers = db.relationship(
    "Answer", 
    back_populates="user"
  )

  messages_sent = db.relationship(
    "Message",
    foreign_keys=[Message.sender_id],
    back_populates="sender"
  )
  messages_recieved = db.relationship(
    "Message",
    foreign_keys=[Message.recipient_id],
    back_populates="recipient"
  )

  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)


  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email,
      "error_ids": [error.id for error in self.errors],
      "answer_ids": [answer.id for answer in self.answers],
      "subscribed_modules": [module.to_dict() for module in self.modules],
    }
