import json
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship, backref
from flask_migrate import Migrate
from flask_cors import CORS
from sqlalchemy.dialects.postgresql import JSON
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager, current_user
api = Flask(__name__)
CORS(api)
api.config.from_pyfile('/Users/israelos/unbend_config.py')

db = SQLAlchemy(api)
jwt = JWTManager(api)
migrate = Migrate(api, db) 


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(350), unique=True)
    password = db.Column(db.String(100), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    default_work = db.Column(db.Integer, nullable=False, default=25)
    default_break = db.Column(db.Integer, nullable=False, default=5)
    exercises = relationship("Exercise", secondary="exercises_for_users")
    # time_per_exercise = db.Column(db.Integer, nullable=False, default=1)



class Exercise(db.Model):
    __tablename__ = "exercises"
    name = db.Column(db.String(100), primary_key=True)
    description = db.Column(db.String(350), nullable=False)
    users = relationship("User", secondary="exercises_for_users")


class ExerciseForUser(db.Model):
    __tablename__ = 'exercises_for_users'
    id = db.Column(db.Integer, primary_key=True) 
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    exercise_name = db.Column(db.String(100), db.ForeignKey('exercises.name'))
    user = relationship(User, backref=backref("exercises_for_users", cascade="all, delete-orphan"))
    exercise = relationship(Exercise, backref=backref("exercises_for_users", cascade="all, delete-orphan"))


with api.app_context():
    db.create_all()

@jwt.user_identity_loader
def user_identity_lookup(user):
    return user

@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(id=identity).first()

@api.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response

@api.route('/register/', methods=["POST"])
def register_user():
    req = request.json
    if req["password"] != req["passwordConfirm"]:
         return jsonify({'error': "Passwords Miss Match."}), 409
    email = req["email"]
    print(email)
    password = generate_password_hash(req["password"], salt_length=8)
    name = req["name"]
    user_exists = User.query.filter_by(email=email).first() is not None
    if user_exists:
        return jsonify({'error': "User already exists."}), 409
    new_user = User(email=email, password=password, name=name)
    db.session.add(new_user)
    db.session.commit()
    access_token = create_access_token(identity=new_user.id)
    return {
        'access_token': access_token
        }


@api.route('/login/', methods=["POST"])
def login_user():
    req = request.json
    email = req["email"]
    password = req["password"]
    user = User.query.filter_by(email=email).first()
    if user is None or not check_password_hash(user.password, password):
        return jsonify({'error': "Incorrect Email/Password."}), 401
    access_token = create_access_token(identity=user.id)
    return {
        'access_token': access_token
    }

@api.route("/logout/", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@api.route('/confirm-pass/', methods=["POST"])
@jwt_required()
def confirm_pass():
    req = request.json
    password = req["password"]
    return jsonify(check_password_hash(current_user.password, password))


@api.route('/profile/')
@jwt_required()
def user_profile():
    return jsonify(
        name=current_user.name,
        email=current_user.email,
        default_work=current_user.default_work,
        default_break=current_user.default_break,
    )

# @api.route('/change-pass/', "PATCH")
# @jwt_required()
# def change_password():
#     return jsonify(
#         name=current_user.name,
#         email=current_user.email,
#     )
# @api.route('/change-email/', methods=["PATCH"])
# @jwt_required()
# def change_email():
#     return jsonify(
#         name=current_user.name,
#         email=current_user.email,
#     )
# @api.route('/change-work/', methods=["PATCH"])
# @jwt_required()
# def change_default_work():
#     return jsonify(
#         name=current_user.name,
#         email=current_user.email,
#     )
# @api.route('/change-break/', methods=["PATCH"])
# @jwt_required()
# def change_default_break():
#     return jsonify(
#         name=current_user.name,
#         email=current_user.email,
#     )
# @api.route('/hide-exercise-from-user/', methods=["DELETE"])
# @jwt_required()
# def hide_exercise_from_user():
#     return jsonify(
#         name=current_user.name,
#         email=current_user.email,
#     )

# @api.route('/delete-user/', methods=["DELETE"])
# @jwt_required()
# def delete_user():
#     return jsonify(
#         name=current_user.name,
#         email=current_user.email,
#     )
if __name__ == '__main__':
    api.run(debug=True)
