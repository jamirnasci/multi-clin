from datetime import timedelta
from flask import Flask
from flask_cors import CORS
from controller.ConsultasController import consu_bp
from controller.LoginController import login_bp
from flask_jwt_extended import JWTManager

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = 'kdadk20k398dj2jdj'
app.config["JWT_TOKEN_LOCATION"] = "cookies"
app.config["JWT_COOKIE_SECURE"] = False
app.config["JWT_COOKIE_CSRF_PROTECT"] = False
app.config["JWT_ACCESS_COOKIE_PATH"] = "/"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=5)

jwt = JWTManager(app)

app.register_blueprint(login_bp)
app.register_blueprint(consu_bp)

if __name__ == '__main__':
    app.run(debug=True)