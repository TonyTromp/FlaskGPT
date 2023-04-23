# FlaskGPT template

Based on the tutoriol following https://medium.com/codingthesmartway-com-blog/how-to-create-an-ai-powered-python-web-app-with-flask-and-gpt-4-api-907dcffd1221

Added to this concept is Microphone input using Webkit and Text-To-Speech.

# Running the easy way:

1. edit the docker-compose.yaml file and add your OPENAI_API_KEY
2. build the docker image using:
```
docker-compose build
```
3. run the image using:
```
docker-compose up
```

## Development
Create and activate Python virtual Env (using Python 3.9)
```
# Linux
py39=$(which python3.9)
${py39} -m venv venv

# Windows
<path_to_python_bin>/python3.9 -m venv venv

source venv/bin/activate

# Install dependancies
pip install -r requirements.txt

# SET OPENAI KEY
export OPENAI_API_KEY="<MY_KEY>"

# Run it
cd src
python app.py
```
