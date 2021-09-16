from pymongo import MongoClient
import hashlib

def get_database():
    client = MongoClient("mongodb+srv://ricky:eric033014@user.f8q8g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    db = client['igassist']
    return db
    
# This is added so that many files can reuse the function get_database()
if __name__ == "__main__":    
    # Get the database
    db = get_database()
    db['user'].insert_one({
        'acn':'abcd1234',
        'passwd': hashlib.md5('abcd1234'.encode('utf-8')).hexdigest(),
        'username': 'xiao ming'
    })