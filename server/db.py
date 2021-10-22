#連線到mongodb，且存資料到mongodb的範例程式

from pymongo import MongoClient
import hashlib
import certifi
ca = certifi.where()

def get_database():
    # 對mongoDB連線
    client = MongoClient(
        "mongodb+srv://ricky:eric033014@user.f8q8g.mongodb.net/user?retryWrites=true&w=majority",
        tlsCAFile=ca
    )
    # 進入igassist這個schema
    db = client['igassist']
    return db

if __name__ == "__main__":    
    db = get_database()
    # rst = db['posts'].find({
    #     "acn" : "xuzihuan",
    #     "content":{"$regex":".*戰鬥*"}
    # })
    # for item in rst:
    #     print(item['content'])
    # db['user'].insert_one({
    #     'acn':'abcd1234',
    #     'passwd': hashlib.md5('abcd1234'.encode('utf-8')).hexdigest(),
    #     'username': 'xiao hua'
    # })