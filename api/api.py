from flask import Flask, request, jsonify
from flask_login import UserMixin, LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from sqlalchemy.dialects.postgresql import JSON
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)
app.config.from_pyfile('/Users/israelos/unbend_config.py')

db = SQLAlchemy(app)


# migrate = Migrate(app, db)


class User(UserMixin, db.Model):
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


with app.app_context():
    db.create_all()


@app.route('/register/', methods=["GET", "POST"])
def register_user():
    if request.method == "POST":
        req = request.json
        email = req["email"]
        password = generate_password_hash(req["password"], salt_length=8)
        name = req["name"]
        new_user = User(email=email, password=password, name=name)
        db.session.add(new_user)
        db.session.commit()
        return req


@app.route('/login/', methods=["GET", "POST"])
def login_user():
    if request.method == "POST":
        req = request.json
        email = req["email"]
        user = User.query.filter_by(email=email).first()
        password = req["password"]
        if not check_password_hash(user.password, password):
            return "wrong pass"
        return req


if __name__ == '__main__':
    app.run(debug=True)
