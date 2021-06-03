from flask.cli import AppGroup
from .users import seed_users, undo_users
from .modules import seed_modules, undo_modules
from .errors import seed_errors, undo_errors
from .images import seed_images, undo_images
from .answers import seed_answers, undo_answers
from .messages import seed_messages, undo_messages
from .follows import seed_follows, undo_follows

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_modules()
    seed_users()
    seed_errors()
    seed_images()
    seed_answers()
    seed_messages()
    seed_follows()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_modules()
    undo_users()
    undo_errors()
    undo_images()
    undo_answers()
    undo_messages()
    undo_follows()
    # Add other undo functions here
