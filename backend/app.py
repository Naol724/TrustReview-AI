from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load model + vectorizer
model = pickle.load(open("model.pkl", "rb"))
vectorizer = pickle.load(open("vectorizer.pkl", "rb"))

@app.route('/')
def home():
    return "Fake Review Detection API is Running"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    review = data['review']

    # Convert text to vector
    review_vec = vectorizer.transform([review])

    # Prediction
    prediction = model.predict(review_vec)[0]

    if prediction == 1:
        result = "Fake Review"
    else:
        result = "Real Review"

    return jsonify({"prediction": result})

if __name__ == "__main__":
    app.run(debug=True)