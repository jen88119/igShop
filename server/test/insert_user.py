import  requests
import  json

if __name__=='__main__':
    my_data = {
        'acn':'aaaa123',
        'passwd':'eric0330',
        'username':'rickyy'
    }
    r = requests.post('http://127.0.0.1:8088/users', data = json.dumps(my_data))
    print(r.text)