from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from Spider import spider
import threading
import uvicorn

# 初始化
app = FastAPI()
room_id = 685026           # room_id = input("请输入房间号：")
stop_flag = threading.Event()
danmu = spider(room_id, stop_flag)
data = {}

# 解决跨域问题
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=['*']
)


@app.get("/start")
async def start():
    """Crawler start"""
    global danmu
    danmu_thread = threading.Thread(target=danmu.running)
    danmu_thread.start()
    # while True:
    #     print(danmu.ans)
    #     time.sleep(2)


@app.get("/getData")
async def get_data():
    """Get data"""
    global data
    global danmu
    global stop_flag
    stop_flag.set()
    data = danmu.ans
    stop_flag.clear()
    danmu_thread = threading.Thread(target=danmu.running)
    danmu_thread.start()
    return data


@app.get("/pause")
async def pause():
    """Crawler pause"""
    global danmu
    global stop_flag
    stop_flag.set()
    return {"msg": "crawler paused!"}


@app.get("/resume")
async def resume():
    """Crawler resume"""
    global danmu
    global stop_flag
    stop_flag.clear()
    danmu_thread = threading.Thread(target=danmu.running)
    danmu_thread.start()
    return {"msg": "crawler resumed!"}


@app.get("/reset")
async def reset():
    """_Process_ reset"""
    global danmu
    global stop_flag
    global data
    stop_flag.set()
    data = {}
    danmu.Hashmap = {}
    danmu.ans = {
        '章湘粤': 0,
        '雷昌昊': 0,
        '曾健一': 0,
        '段欢宸': 0,
        '张馨鑫': 0,
        '王奕番': 0,
        '何佩恩': 0,
        '王梓源': 0,
        '王正一': 0,
        '马胜楠': 0,
        '赵华': 0,
        '万大千': 0,
        '赖可颖': 0,
        '王彦澄': 0,
        '李伟铭': 0,
        '凌越恒': 0,
        '玛迪娜': 0,
        '朱寳麗': 0,
        '戴领': 0,
        '杨方杰': 0
    }
    return {"msg": "process reset"}

if __name__ == '__main__':
    uvicorn.run(app, port=4000)
