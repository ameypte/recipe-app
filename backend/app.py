from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
import json

#import custom function

from chef import text_summary

app = Flask(__name__) 
CORS(app)

@app.route('/chef', methods=['POST'])
def summarize_text():
    text = request.json['text']
    isNew = request.json['isNew']
    response = text_summary(text, isNew)
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True, port=5000)