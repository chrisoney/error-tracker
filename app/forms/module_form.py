from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class ModuleForm(FlaskForm):
    name = StringField('name', [DataRequired()])
