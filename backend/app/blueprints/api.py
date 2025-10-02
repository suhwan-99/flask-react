from flask import Blueprint, request, jsonify
from ..extensions import model

import pandas as pd

bp = Blueprint('api', __name__)

@bp.post('/recommend')
def recommend_food():
  data = request.get_json()
  X = pd.DataFrame([data])
  proba = model.predict_proba(X)[0]
  classes = model.named_steps['knn'].classes_
  # proba를 역순으로 상위 3개 가져오기
  order = proba.argsort()[::-1][:3]
  top3 = [ { 'label' : classes[i] } for i in order ]
  return jsonify({'ok': True, 'top3' : top3})