from .db import db
from sqlalchemy.dialects.postgresql import ENUM

class Image(db.Model):
    __tablename__ = "images"

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String, nullable=False)
    parent_id = db.Column(db.Integer, nullable=False)
    parent_type = db.Column(ENUM('error', 'answer', name='parent_types', create_type=False), nullable=False)
    

    def to_dict(self):
        return {
            "id": self.id,
            "url": self.url,
            "parent_id": self.parent_id,
            "parent_type": self.parent_type
        }
