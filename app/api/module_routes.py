from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Module

module_routes = Blueprint('modules', __name__)


@module_routes.route('/')
@login_required
def modules():
    modules = Module.query.all()
    return {"modules": [module.to_dict() for module in modules]}


@module_routes.route('/<int:id>')
@login_required
def module(id):
    module = Module.query.get(id)
    return module.to_dict()
