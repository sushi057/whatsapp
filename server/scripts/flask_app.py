from flask import Flask, request, jsonify
import pickle
import sys

app = Flask(__name__)

args = sys.argv[1]
# Load the model
with open(
    r"D:\Code\Full Stack\freelancing\whatsapp\server\scripts\phishing.pkl", "rb"
) as model_file:
    model = pickle.load(model_file)


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    link = data["link"]
    # prediction = model.predict([link])[0]
    prediction = model.predict([args])
    print(prediction)
    return jsonify({"prediction": prediction})


if __name__ == "__main__":
    app.run(debug=True)
