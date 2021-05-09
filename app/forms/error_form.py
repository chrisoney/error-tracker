from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired


class ErrorForm(FlaskForm):
    title = StringField('title', [DataRequired()])
    description = TextAreaField('description', [DataRequired()])
    user_id = IntegerField('user_id', [DataRequired()])
    module_id = IntegerField('module_id', [DataRequired()])