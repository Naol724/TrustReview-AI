from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# Load model + vectorizer with error handling
try:
    model = pickle.load(open("model.pkl", "rb"))
    vectorizer = pickle.load(open("vectorizer.pkl", "rb"))
    print("✅ Model and vectorizer loaded successfully")
except Exception as e:
    print(f" Error loading model/vectorizer: {e}")
    model = None
    vectorizer = None

@app.route('/')
def home():
    return jsonify({"message": "Fake Review Detection API is Running"})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Check if model is loaded
        if model is None or vectorizer is None:
            return jsonify({
                "error": "Model not loaded properly"
            }), 500

        # Get JSON data
        data = request.get_json()
        if not data:
            return jsonify({
                "error": "No JSON data received"
            }), 400

        # Get review text
        review = data.get('review')
        if not review:
            return jsonify({
                "error": "Review text is required"
            }), 400

        if not isinstance(review, str):
            return jsonify({
                "error": "Review must be a string"
            }), 400

        if len(review.strip()) == 0:
            return jsonify({
                "error": "Review cannot be empty"
            }), 400

        # Convert text to vector
        review_vec = vectorizer.transform([review])

        # Get prediction
        prediction = model.predict(review_vec)[0]
        
        # Get prediction probability for confidence
        prediction_proba = model.predict_proba(review_vec)[0]
        confidence = max(prediction_proba) * 100

        # Convert prediction to expected format
        if prediction == 1:
            result = "Fake"
        else:
            result = "Real"

        print(f" Review: {review[:50]}...")
        print(f" Prediction: {result} (Confidence: {confidence:.1f}%)")

        return jsonify({
            "prediction": result,
            "confidence": round(confidence, 1)
        })

    except Exception as e:
        print(f" Prediction error: {e}")
        return jsonify({
            "error": f"Internal server error: {str(e)}"
        }), 500

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)