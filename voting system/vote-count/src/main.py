from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
import random
from starlette.requests import Request

app = FastAPI()
app.add_middleware(
    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=False,

    allow_methods=['*']
)


@app.get("/sta")
async def sta():
    print('value')
    return {'value': random.randint(0, 1)}


@app.post('/name')
async def upload(name: str = str(random.randint(0, 20))):
    print(name)
    return {'name': name}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, port=4000)
