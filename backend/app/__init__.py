from flask import Flask, jsonify
from .extensions import db, migrate, login_manager, cors
from .config import Config
from .models import User
from flask_login import login_required

def create_app():
  app = Flask(__name__)
  app.config.from_object(Config)
  db.init_app(app)
  migrate.init_app(app, db)
  cors.init_app(app, origins=app.config['CORS_ORIGINS'], supports_credentials=True)
  login_manager.init_app(app)

  from .blueprints.auth import bp as auth_bp
  from .blueprints.post import bp as post_bp
  from .blueprints.api import bp as api_bp

  app.register_blueprint(auth_bp, url_prefix='/auth')
  app.register_blueprint(post_bp, url_prefix='/post')
  app.register_blueprint(api_bp, url_prefix='/api')

  
  @login_manager.user_loader
  def load_user(user_id):
    return User.query.get(user_id)
  
  # 로그인을 안 한 사용자가 접근 했을때 실행할 함수
  @login_manager.unauthorized_handler
  def unauthorized():
    return jsonify({ 'ok' : False, 'message': '인증되지 않은 사용자'}),401

  @app.route('/check')
  def check():
    return {'ok' : True}

  @app.route('/check2')
  @login_required
  def check2():
    return {'ok' : True}
  

  return app