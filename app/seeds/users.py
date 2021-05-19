from werkzeug.security import generate_password_hash
from app.models import db, User, Module

# Adds a demo user, you can add other users here if you want
def seed_users():

    chris = User(username='Chris', email='chris@aa.io',
                password='password')
    jesse = User(username='Jesse', email='jesse@aa.io',
                password='password')
    jm = User(username='JM', email='jm@aa.io',
                password='password')
    senyo = User(username='Senyo', email='senyo@aa.io',
                password='password')
    olivia = User(username='Olivia', email='olivia@aa.io',
                password='password')
    alec = User(username='Alec', email='alec@aa.io',
                password='password')
    derek = User(username='Derek', email='derek@aa.io',
                password='password')
    warren = User(username='Warren', email='warren@aa.io',
                password='password')
    rihana = User(username='Rihana', email='rihana@aa.io',
                password='password')
    
    four = Module.query.filter_by(name='Module 4').first()
    seven = Module.query.filter_by(name='Module 7').first()

    four.users.append(alec)
    four.users.append(derek)
    four.users.append(warren)
    four.users.append(rihana)

    seven.users.append(chris)
    seven.users.append(jesse)
    seven.users.append(jm)
    seven.users.append(senyo)
    seven.users.append(olivia)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users CASCADE;')
    db.session.commit()
