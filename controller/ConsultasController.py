from flask import Blueprint, request, render_template, redirect, url_for
from flask_jwt_extended import jwt_required

consu_bp = Blueprint('consultas', __name__)

@consu_bp.route('/consultas')
@jwt_required()
def consultas():
    return render_template('consultas.html')
