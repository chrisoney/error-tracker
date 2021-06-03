from .db import db

follows = db.Table(
    "follows", 
    db.Column("follower_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"))
)