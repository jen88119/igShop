#網路伺服器用來處理任何地方（瀏覽器擴充元件）發來的請求

from certifi import contents
from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
import  db
import hashlib
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
@app.post("/users/")
# User是定義對/users/這個路徑發送post請求時需要帶什麼參數，有哪些參數要帶請看12行。
async def save_user(user: User):
    try:
        # 將資料整理成dict
        data = {}
        data['acn'] = user.acn
        data['passwd'] = hashlib.md5(user.passwd.encode('utf-8')).hexdigest()
        data['username'] = user.username
        # 將整理成dict的資料存進user這張table
        igDB['user'].insert_one(data)
        return {'status':'ok'}
    except:
        return {'status':'error'}

# 發送請求時一定要帶這些參數，不能多也不能少
class Data(BaseModel):
    url: str
    content: str
    author:str

#當使用者對http://127.0.0.1:8088/users/發起post請求時，透過下面function處理
@app.post("/users/")
# User是定義對/users/這個路徑發送post請求時需要帶什麼參數，有哪些參數要帶請看12行。
async def save_data(data: Data):
    try:
        # 將資料整理成dict
        d = {}
        d['url'] = data.url
        d['content'] = data.content
        d['author'] = data.author
        # 將整理成dict的資料存進posts這張table
        igDB['posts'].insert_one(d)
        return {'status':'ok'}
    except:
        return {'status':'error'}

if __name__ == '__main__':
    try:
        # 開一個伺服器在127.0.0.1:8088,用瀏覽器在網址欄打上http://127.0.0.1:8088可以檢查是否成功啟動
        uvicorn.run(app, host="127.0.0.1", port=8088)
    except:
        print('error')