import json, os
from flask import Flask, render_template, request, jsonify, send_from_directory
import openai
from openai.error import RateLimitError

app = Flask(__name__)
openai.api_key = os.getenv("OPENAI_API_KEY")
openai.organization = os.getenv("OPENAI_ORGANIZATION")
gpt_model="gpt-4"
gpt_model="gpt-3.5-turbo-0301"
#gpt_model="gpt-3.5-turbo"

@app.route('/')
def index():
    return render_template('index.html', model=gpt_model)

@app.route('/img/<path:path>')
def send_report(path):
    return send_from_directory('img', path)

@app.route('/gpt', methods=['GET', 'POST'])
def gpt():
    user_input = request.args.get('user_input') if request.method == 'GET' else request.form['user_input']
    messages = [
        {"role": "user", "content": user_input}
    ]

    try:
        response = openai.ChatCompletion.create(
            model= gpt_model,
            messages=messages
        )
        content = response.choices[0].message["content"]
    except RateLimitError:
        content = "The server is experiencing a high volume of requests. Please try again later."

    return jsonify(content=content)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)