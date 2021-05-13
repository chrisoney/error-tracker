from .db import db

class Message(db.Model):
  __tablename__ = 'messages'

  id = db.Column(db.Integer, primary_key = True)
  body = db.Column(db.Text, nullable = False)
  unread = db.Column(db.Boolean, default=True, nullable = False)
  sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  recipient_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

  sender = db.relationship(
    "User",
    foreign_keys=[sender_id],
    back_populates="messages_sent"
  )

  recipient = db.relationship(
    "User",
    foreign_keys=[recipient_id],
    back_populates="messages_recieved"
  )

  def to_dict(self):
    return {
      "id": self.id,
      "body": self.body,
      "unread": self.unread,
      "sender_id": self.sender_id,
      "recipient_id": self.recipient_id,
      "sender_username": self.sender.username,
      "recipient_username": self.recipient.username,
    }

