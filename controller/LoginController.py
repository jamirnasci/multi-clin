from flask import Blueprint, request, render_template, redirect, url_for
from flask_jwt_extended import create_access_token, set_access_cookies

login_bp = Blueprint('login', __name__)

@login_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        if email == 'jamir@gmail.com':
            if password == '123':
                token = create_access_token(identity='1', additional_claims={'username': 'jamir'})                
                res = redirect(url_for('consultas.consultas'))
                set_access_cookies(res, token)
                return res
        else:
            return redirect(url_for('login.login'))
    return render_template('login.html')