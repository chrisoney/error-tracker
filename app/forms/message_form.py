from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField
from wtforms.validators import DataRequired


class MessageForm(FlaskForm):
    body = TextAreaField('body', [DataRequired()])
    sender_id = IntegerField('sender_id', [DataRequired()])
    recipient_id = IntegerField('recipient_id', [DataRequired()])