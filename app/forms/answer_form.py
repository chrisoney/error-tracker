from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length


class AnswerForm(FlaskForm):
    description = TextAreaField('description', [DataRequired()])
    user_id = IntegerField('user_id', [DataRequired()])
    error_id = IntegerField('error_id', [DataRequired()])