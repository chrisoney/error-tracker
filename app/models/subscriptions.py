from .db import db

subscriptions = db.Table(
    "subscriptions",
    db.Column(
        "user_id", 
        db.Integer, 
        db.ForeignKey("users.id"), 
        primary_key=True
    ),
    db.Column(
        "module_id", 
        db.Integer, 
        db.ForeignKey("modules.id"), 
        primary_key=True
    )
)