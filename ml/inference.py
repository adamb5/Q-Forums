from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import BertTokenizer, BertForSequenceClassification
import torch
import json

app = Flask(__name__)
CORS(app)

# Load model and tokenizer from the directory
model_dir = './model'
model = BertForSequenceClassification.from_pretrained(model_dir)
tokenizer = BertTokenizer.from_pretrained(model_dir)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    inputs = tokenizer(data['text'], truncation=True, padding=True, return_tensors='pt')
    with torch.no_grad():
        outputs = model(**inputs)
        predicted_class = torch.argmax(outputs.logits, dim=1).item()
    label_map = {0: 'vulnerability', 1: 'bug', 2: 'question'}
    prediction = label_map.get(predicted_class, 'unknown')
    return jsonify({'prediction': prediction})

# def transform_fn(model, request_body, content_type, accept):
#     input_data = json.loads(request_body)
#     result = predict_fn(input_data, model)
#     return result

if __name__ == '__main__':
    app.run(port=5001)