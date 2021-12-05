#網路伺服器用來處理任何地方（瀏覽器擴充元件）發來的請求

from certifi import contents
from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
import  db
import hashlib
import json
from typing import List
from fastapi.responses import PlainTextResponse
from pymongo.write_concern import WriteConcern
app = FastAPI()#取得服務器

# 跟db連線
igDB = db.get_database()

# 發送請求時一定要帶這些參數，不能多也不能少
class User(BaseModel):
    acn: str
    passwd: str
    username:str


@app.get("/") # 指定 api 路徑 (get方法)
def read_root():
    return {"Hello": "World"}


#當使用者對http://127.0.0.1:8088/users/發起post請求時，透過下面function處理
@app.get("/user/save")
# User是定義對/users/這個路徑發送post請求時需要帶什麼參數，有哪些參數要帶請看12行。
async def save_user(acn: str,owner: str):
    # try:
        # 將資料整理成dict
        data = {}
        data['acn'] = acn
        data['owner'] = owner
        key = "{} {}".format(acn,owner)
        data['_id'] = hashlib.md5(key.encode('utf-8')).hexdigest()
        # 將整理成dict的資料存進user這張table
        igDB['user'].insert_one(data)
        return {'status':'ok'}
    # except:
    #     return {'status':'error'}
@app.get("/user/del")
async def del_user(acn: str,owner: str):
    # try:
        # 將資料整理成dict
        data = {}
        key = "{} {}".format(acn,owner)
        data['_id'] = hashlib.md5(key.encode('utf-8')).hexdigest()
        # 將整理成dict的資料存進user這張table
        igDB['user'].delete_one(data)
        return {'status':'ok'}

class Post(BaseModel):
    acn: str
    url: str
    id: str
    author_id: str
    author: str
    content: str
    comment_cnt: int
    like_cnt: int
    created_time: int
    img: str
    height: int
    width: int
    ptype: str
    view_cnt: int

# 發送請求時一定要帶這些參數，不能多也不能少
class Data(BaseModel):
    posts: List[Post]

@app.post("/data/save")
async def save_data(p: Data):
    # try:
        # 將資料整理成dict
        rst = []
        for data in p.posts:
            d = {}
            d['acn'] = data.acn
            d['url'] = data.url
            d['_id'] = data.id
            d['author_id'] = data.author_id
            d['author'] = data.author
            d['content'] = data.content
            d['comment_cnt'] = data.comment_cnt
            d['like_cnt'] = data.like_cnt
            d['created_time'] = data.created_time
            d['img'] = data.img
            d['height'] = data.height
            d['width'] = data.width
            d['ptype'] = data.ptype
            d['view_cnt'] = data.view_cnt
            rst.append(d)
            # 將整理成dict的資料存進posts這張table
        igDB['posts'].with_options(write_concern=WriteConcern(w=0)).insert_many(rst)
        # igDB['posts'].ensureIndex({'content':'text'})
        return {'status':'ok'}
    # except:
    #     return {'status':'error'}

@app.get("/data/query",response_class=PlainTextResponse)
async def query_data(key_word: str,user: str):
    rst = igDB['posts'].find({
        "acn" : user,
        "content":{"$regex":".*{}*".format(key_word)}
    })
    ret = []
    for item in rst:
        data = {}
        data['content'] = item['content']
        data['author'] = item['author']
        data['created_time'] = item['created_time']
        data['like_cnt'] = item['like_cnt']
        data['comment_cnt'] = item['comment_cnt']
        data['url'] = item['url']
        data['img'] = item['img']
        data['height'] = item['height']
        data['width'] = item['width']
        ret.append(data)
    return json.dumps(ret)
@app.get("/user/query",response_class=PlainTextResponse)
async def query_data(user: str):
    rst = igDB['user'].find({
        "owner" : user,
    })
    ret = []
    for item in rst:
        data = {}
        data['owner'] = item['owner']
        data['acn'] = item['acn']
        ret.append(data)
    return json.dumps(ret)

if __name__ == '__main__':
    # try:
        # 開一個伺服器在127.0.0.1:8088,用瀏覽器在網址欄打上http://127.0.0.1:8088可以檢查是否成功啟動
        uvicorn.run("server:app", host="127.0.0.1", port=8088,workers=4)
    # except:
    #     print('error')