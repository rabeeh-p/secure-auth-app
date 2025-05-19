
from pymongo import MongoClient
import hashlib

client = MongoClient("mongodb://localhost:27017/")
db = client['authdb']
users = db['users']

def hash_password(password):
    return hashlib.sha256(password.encode('utf-8')).hexdigest()
