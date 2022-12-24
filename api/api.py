import json
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from sqlalchemy.dialects.postgresql import JSON
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager
from datetime import datetime, timedelta, timezone
api = Flask(__name__)
CORS(api)
api.config.from_pyfile('/Users/israelos/unbend_config.py')

db = SQLAlchemy(api)
jwt = JWTManager(api)

# migrate = Migrate(app, db)


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    img_url = db.Column(db.String(250), nullable=True)

    # many_to_user_relation = relationship("TABLE_CLASS_NAME", back_populates="user")

    def __init__(self, name=None, email=None, password=None, img_url=None):
        self.email = email
        self.password = password
        self.name = name

    def __repr__(self):
        return '<User %r>' % self.name


with api.app_context():
    db.create_all()

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
    access_token = create_access_token(identity=email)
    return {
        'access_token': access_token
        }


@api.route('/login/', methods=["POST"])
def login_user():
    req = request.json
    email = req["email"]
    password = req["password"]
    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({'error': "User does not exists."}), 401
    if not check_password_hash(user.password, password):
        return jsonify({'error': "Incorrect Password/Email."}), 401
    access_token = create_access_token(identity=email)
    return {
        'access_token': access_token
    }

@api.route("/logout/", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@api.route('/profile/')
@jwt_required()
def user_profile():
    response_body = {
        "name": "Nagato",
        "about" :"Hello! I'm a full stack developer that loves python and javascript"
    }
    return response_body

if __name__ == '__main__':
    api.run(debug=True)
