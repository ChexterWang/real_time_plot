from flask import Flask, jsonify
from datetime import datetime as dt
from random import randint as rand
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True)

@app.route("/", methods=['GET'])
@cross_origin(supports_credentials=True)
def get_data():
    timestamp = dt.now().timestamp()
    current = rand(1, 10)
    voltage = rand(1, 10)
    return jsonify({
        "current": current,
        "voltage": voltage,
        "timestamp": timestamp,
    })

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=9000, debug=True)