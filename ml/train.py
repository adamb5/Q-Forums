import numpy as np
import torch
from torch.utils.data import Dataset
from transformers import BertTokenizer, BertForSequenceClassification, Trainer, TrainingArguments
from sklearn.metrics import accuracy_score, precision_recall_fscore_support
import boto3
import argparse
 
class StackOverflowDataset(Dataset):
    def __init__(self, encodings, labels):
        self.encodings = encodings
        self.labels = labels
 
    def __getitem__(self, idx):
        item = {key: torch.tensor(val[idx]) for key, val in self.encodings.items()}
        item['label'] = torch.tensor(self.labels[idx])
        return item
 
    def __len__(self):
        return len(self.labels)
 
def compute_metrics(pred):
    labels = pred.label_ids
    preds = pred.predictions.argmax(-1)
    precision, recall, f1, _ = precision_recall_fscore_support(labels, preds, average='macro')
    accuracy = accuracy_score(labels, preds)
    return {
        'accuracy': accuracy,
        'precision': precision,
        'recall': recall,
        'f1': f1
    }

def download_from_s3(bucket_name, s3_key, local_path): 
    s3 = boto3.client("s3")
    s3.download_file(bucket_name, s3_key, local_path)

def upload_to_s3(bucket_name, local_path, s3_key):     
    s3 = boto3.client('s3') 
    s3.upload_file(local_path, bucket_name, s3_key)

if __name__ == "__main__":
 
    parser = argparse.ArgumentParser()
    parser.add_argument('--epochs', type=int, default=4)
    parser.add_argument('--train_batch_size', type=int, default=8)
    parser.add_argument('--eval_batch_size', type=int, default=16)
    parser.add_argument('--learning_rate', type=float, default=2e-5)
    args = parser.parse_args()
 
    # Load tokenized data from S3
    bucket_name = args.bucket_name     
    # Download tokenized data from S3    
    download_from_s3(bucket_name, 'data/train_encodings.npz', 'train_encodings.npz')    
    download_from_s3(bucket_name, 'data/val_encodings.npz', 'val_encodings.npz')     
    download_from_s3(bucket_name, 'data/train_labels.npz', 'train_labels.npz') 
    download_from_s3(bucket_name, 'data/val_labels.npz', 'val_labels.npz')
 
 
    train_encodings = np.load('train_encodings.npz')
    val_encodings = np.load('val_encodings.npz')
    train_labels = np.load('train_labels.npz')['labels']
    val_labels = np.load('val_labels.npz')['labels']
 
    train_dataset = StackOverflowDataset(train_encodings, train_labels)
    val_dataset = StackOverflowDataset(val_encodings, val_labels)

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
 
    # Model
    model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=3)
    model.to(device)
 
    training_args = TrainingArguments(
        output_dir='/opt/ml/model',
        num_train_epochs=args.epochs,
        per_device_train_batch_size=args.train_batch_size,
        per_device_eval_batch_size=args.eval_batch_size,
        learning_rate=args.learning_rate,
        evaluation_strategy='steps',
        eval_steps=50,
        save_steps=100,
        warmup_steps=100,
        weight_decay=0.01,
        logging_dir='/opt/ml/output/logs',
        logging_steps=10,
        load_best_model_at_end=True
    )
 
    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=train_dataset,
        eval_dataset=val_dataset,
        compute_metrics=compute_metrics
    )
 
    trainer.train()
    model_path ="/opt/ml/model"
    trainer.save_model(model_path)
    tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
    tokenizer.save_pretrained(model_path)

    upload_to_s3(bucket_name, f"{model_path}/pytorch_model.bin", "path/to/s3/pytorch_model.bin")     
    upload_to_s3(bucket_name, f"{model_path}/config.json", "path/to/s3/config.json")     
    upload_to_s3(bucket_name, f"{model_path}/vocab.txt", "path/to/s3/vocab.txt")