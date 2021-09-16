from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
import  db
import hashlib
app = FastAPI()
igDB = db.get_database()

class User(BaseModel):
    acn: str
    passwd: str
    username:str



@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/users/")
async def save_user(user: User):
    try:
        data = {}
        data['acn'] = user.acn
        data['passwd'] = hashlib.md5(user.passwd.encode('utf-8')).hexdigest()
        data['username'] = user.username
        igDB['user'].insert_one(data)
        return {'status':'ok'}
    except:
        return {'status':'error'}

if __name__ == '__main__':
    try:
        uvicorn.run(app, host="127.0.0.1", port=8088)
    except:
        print('error')