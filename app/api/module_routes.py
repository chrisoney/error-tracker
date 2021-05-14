from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Module, db
from app.forms import ModuleForm

module_routes = Blueprint('modules', __name__)

@module_routes.route('/')
@login_required
def modules():
    """
    Queries for and returns all modules
    """
    modules = Module.query.all()
    return {"modules": [module.to_dict() for module in modules]}


@module_routes.route('/', methods=['POST'])
@login_required
def add_new():
    """
    Adds a new module
    """
    form = ModuleForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        module = Module( name=form.data['name'] )
        db.session.add(module)
        db.session.commit()
        return { "module": module.to_dict() }
    return {'errors': form.errors}, 400

@module_routes.route('/<int:id>')
@login_required
def get_module(id):
    """
    Get a single module's information
    """
    module = Module.query.get(id)
    return module.to_dict()

@module_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_module(id):
    """
    Edit the name of a module
    """
    form = ModuleForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        module = Module.query.get(id)
        module.name = form.data['name']
        db.session.add(module)
        db.session.commit()
        return { "module": module.to_dict() }
    return {'errors': form.errors}, 400

@module_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_module(id):
    """
    Delete a module
    """
    module = Module.query.get(id)
    db.session.delete(module)
    db.session.commit()
    return {'deleted': id}
