
from pymongo import MongoClient
import hashlib

from dotenv import load_dotenv
import os
load_dotenv()



# client = MongoClient("mongodb://localhost:27017/")
# db = client['authdb']
# users = db['users']


mongo_uri = os.getenv("MONGO_URI")
db_name = os.getenv("MONGO_DB_NAME")
collection_name = os.getenv("MONGO_COLLECTION_NAME")

# Connect to MongoDB using environment variables
client = MongoClient(mongo_uri)
db = client[db_name]
users = db[collection_name]




def hash_password(password):
    return hashlib.sha256(password.encode('utf-8')).hexdigest()
