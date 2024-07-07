from flask import Flask, render_template, request, jsonify
import re

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/check_password', methods=['POST'])
def check_password():
    data = request.json
    password = data['password']

    length_criteria = len(password) >= 8
    upper_criteria = re.search(r'[A-Z]', password) is not None
    lower_criteria = re.search(r'[a-z]', password) is not None
    number_criteria = re.search(r'\d', password) is not None
    special_criteria = re.search(r'[@$!%*?&#]', password) is not None

    strength = {
        'length': length_criteria,
        'uppercase': upper_criteria,
        'lowercase': lower_criteria,
        'numbers': number_criteria,
        'special': special_criteria
    }

    strength_level = sum(strength.values())

    return jsonify({
        'strength': strength,
        'strength_level': strength_level
    })

if __name__ == '__main__':
    app.run(debug=True)
