from flask import Blueprint,request, jsonify
from email_validator import validate_email, EmailNotValidError
from ..extensions import db
from ..models import User
from flask_login import login_user, login_required, current_user, logout_user

bp = Blueprint('auth', __name__)

@bp.post('/signup')
def signup():
  data = request.get_json()
  username = data.get('username')
  password = data.get('password')
  email = data.get('email')
  nickname = data.get('nickname')

  if not username or not password or not email:
    return jsonify({'ok' : False, 'message' : '아이디, 비번, 이메일은 필수 입력' }), 400
  
  try:
    validate_email(email)
  except EmailNotValidError as e:
    return jsonify({'ok' : False, 'message' : str(e) }), 400
  except Exception:
    return jsonify({'ok' : False, 'message' : '알 수 없는 오류 발생!' }), 400
  
  user = User(username = username, email = email , nickname = nickname)
  user.set_password(password)

  db.session.add(user)

  try:
    db.session.commit()
  except:
    db.session.rollback()
    return jsonify({ 'ok' : False, 'message' : '이미 등록된 아이디, 이메일'})
  
  return jsonify({ 'ok' : True, 'message' : '회원 가입 완료', 'user' : user.to_dict() }), 200

@bp.post('/login')
def login():
  data = request.get_json()
  username = data.get('username')
  password = data.get('password')

  if not username or not password:
    return jsonify({'ok' : False, 'message' : '아이디와 비번을 입력하시오.'}), 400
  
  user = db.session.query(User).filter(User.username == username).first()

  if not user or not user.check_password(password):
    return jsonify({'ok' : False , 'message' : '아이디 또는 비밀번호가 틀렸습니다'}), 400

  login_user(user)
  return jsonify({'ok' : True , 'message' : '로그인 성공', 'user': user.to_dict() }), 200

@bp.get('/me')
def me():
  if current_user.is_authenticated:
    return jsonify({'ok' : True, 'user': current_user.to_dict() }), 200
  return jsonify({'ok' : False, 'user' : None}), 400
      
@bp.post('/logout')
@login_required
def logout():
  logout_user()
  return jsonify({'ok': True, 'message' : '로그아웃 성공'}), 200


