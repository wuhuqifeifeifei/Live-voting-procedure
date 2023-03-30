import asyncio
import zlib
from aiowebsocket.converses import AioWebSocket
import json

class spider():
    def __init__(self, room_id,stop_flag):
        self.remote = 'ws://broadcastlv.chat.bilibili.com:2244/sub'
        self.roomid = str(room_id)  # input("输入房间号：")
        self.data_raw = '000000{headerLen}0010000100000007000000017b22726f6f6d6964223a{roomid}7d'
        self.data_raw = self.data_raw.format(headerLen=hex(27 + len(self.roomid))[2:],roomid=''.join(map(lambda x: hex(ord(x))[2:], list(self.roomid))))
        self.Hashmap = dict()#记录uid和投票对象
        #self.ans = { '{n}'.format(n = num):0 for num in range(1,20 + 1) }#记录每名选手的票数
        #记录每名选手的票数
        self.ans = {
            '章湘粤':0,
            '雷昌昊':0,
            '曾健一':0,
            '段欢宸':0,
            '张馨鑫':0,
            '哈力木拉提·艾力、王奕番':0,
            '何佩恩':0,
            '王梓源':0,
            '王正一':0,
            '马胜楠':0,
            '赵华':0,
            '万大千':0,
            '赖可颖':0,
            '王彦澄':0,
            '李伟铭':0,
            '凌越恒':0,
            '玛迪娜·叶尔卡提':0,
            '朱寳麗':0,
            '戴领':0,
            '杨方杰':0
        }
        self.stop_flag = stop_flag

    async def startup(self):
        async with AioWebSocket(self.remote) as aws:
            converse = aws.manipulator
            await converse.send(bytes.fromhex(self.data_raw))
            tasks = [self.receDM(converse), self.sendHeartBeat(converse)]
            await asyncio.wait(tasks)

    hb = '00 00 00 10 00 10 00 01  00 00 00 02 00 00 00 01'

    async def sendHeartBeat(self, websocket):
        while not self.stop_flag.is_set():
            await asyncio.sleep(30)
            await websocket.send(bytes.fromhex(self.hb))
            # print('[Notice] Sent HeartBeat.')

    async def receDM(self, websocket):
        while not self.stop_flag.is_set():
            recv_text = await websocket.receive()

            if recv_text == None:
                recv_text = b'\x00\x00\x00\x1a\x00\x10\x00\x01\x00\x00\x00\x08\x00\x00\x00\x01{"code":0}'

            self.printDM(recv_text)
        # 进行选项统计
        '''
        投票方式有以下3种：
        1、投给+数字+号
        2、数字+号+数字+号我爱你
        3、数字+号+数字+号你最棒
        '''
    def analyze_danmu(self, uid,uname, text):
        text = text
        uid = uid
        uname = uname
        if str(uid) not in self.Hashmap:
            self.Hashmap[str(uid)] = list()
        if text == '哈力木拉提·艾力' or text == '王奕番' or text == '哈力木拉提艾力、王奕番' or text == '哈力木拉提艾力' or text == '哈力木拉提.艾力、王奕番' or text == '哈力木拉提.艾力':
            text = '哈力木拉提·艾力、王奕番'
        elif text == '玛迪娜叶尔卡提' or text == '玛迪娜.叶尔卡提':
            text = '玛迪娜·叶尔卡提'
        elif text == '朱宝丽': 
            text = '朱寳麗'
        if text in self.ans:
            if text in self.Hashmap[str(uid)]:
                return
            else:
                self.ans[text] += 1
                self.Hashmap[str(uid)].append(text)
                with open('log.txt','a+',encoding='utf-8') as f:
                    f.write(str(uid)+'\t'+str(uname)+'\t'+text+'选手'+'\n'+str(uname)+':'+str(uid)+'\t'+str(self.Hashmap[str(uid)])+'\n'+'\n')
                with open('data.txt','a+',encoding='utf-8') as file:
                    file.write(str(self.ans)+'\n')
                return
        '''
        for i in range(1,20+1):
            if text.find(str(i)) == -1:
                continue
            else:
                if i >= 1 and i <= 9:
                    index = text.find(str(i))
                    if (text[index - 2:index] == '投给' and text[index + 1] == '号') or str(text[index + 1:index + 7]) == str('号{num}号我爱你'.format(num=i)) or str(text[index + 1:index + 7]) == str('号{num}号你最棒'.format(num=i)):
                        if i not in self.Hashmap[str(uid)]:
                            ans[str(i)] += 1
                            self.Hashmap[str(uid)].append(i)
                            print(self.Hashmap)
                            with open('log.txt','a+',encoding='utf-8') as f:
                                f.write(str(uid)+'\t'+str(uname)+'\t'+str(i)+'号'+'\n'+str(uname)+':'+str(self.Hashmap)+'\n'+'\n')
                            with open('data.txt','a+',encoding='utf-8') as file:
                                file.write(str(self.ans)+'\n')
                            return
                        else:
                            continue
                if i >= 10 and i <= 20:
                    index = text.find(str(i))
                    if (text[index - 2:index] == '投给' and text[index + 2] == '号') or str(text[index + 2:index + 9]) == str('号{num}号我爱你'.format(num=i)) or str(text[index + 2:index + 9]) == str('号{num}号你最棒'.format(num=i)):
                        if i not in self.Hashmap[str(uid)]:
                            ans[str(i)] += 1
                            self.Hashmap[str(uid)].append(i)
                            print(self.Hashmap)
                            with open('log.txt','a+',encoding='utf-8') as f:
                                f.write(str(uid)+'\t'+str(uname)+'\t'+str(i)+'号'+'\n'+str(uname)+':'+str(self.Hashmap)+'\n'+'\n')
                            with open('data.txt','a+',encoding='utf-8') as file:
                                file.write(str(self.ans)+'\n')
                            return
                        else:
                            continue
        '''
    # 将数据包传入：
    def printDM(self, data):
        # 获取数据包的长度，版本和操作类型
        packetLen = int(data[:4].hex(), 16)
        ver = int(data[6:8].hex(), 16)
        op = int(data[8:12].hex(), 16)

        # 有的时候可能会两个数据包连在一起发过来，所以利用前面的数据包长度判断，
        if (len(data) > packetLen):
            self.printDM(data[packetLen:])
            data = data[:packetLen]

        # 有时会发送过来 zlib 压缩的数据包，这个时候要去解压。
        if (ver == 2):
            data = zlib.decompress(data[16:])
            self.printDM(data)
            return

        # ver 为1的时候为进入房间后或心跳包服务器的回应。op 为3的时候为房间的人气值。
        if (ver == 1):
            if (op == 3):
                # print('[RENQI]  {}'.format(int(data[16:].hex(), 16)))
                pass
            return

        # ver 不为2也不为1目前就只能是0了，也就是普通的 json 数据。
        # op 为5意味着这是通知消息，cmd 基本就那几个了。
        if (op == 5):
            try:
                jd = json.loads(data[16:].decode('utf-8', errors='ignore'))
                if (jd['cmd'] == 'DANMU_MSG'):
                    #print('[DANMU] ', jd['info'][2], ': ', jd['info'][1])  # jd['info'][1]是弹幕内容   jd['info'][2][0]是uid   jd['info'][2][1]是昵称
                    uid = jd['info'][2][0]
                    uname = jd['info'][2][1]
                    text = jd['info'][1]
                    self.analyze_danmu(uid,uname, text)
                    #打印当前投票情况
                    #print(self.ans)
                elif (jd['cmd'] == 'SEND_GIFT'):
                    # print('[GITT]', jd['data']['uname'], ' ', jd['data']['action'], ' ', jd['data']['num'], 'x',
                    # jd['data']['giftName'])
                    pass
                elif (jd['cmd'] == 'LIVE'):
                    # print('[Notice] LIVE Start!')
                    pass
                elif (jd['cmd'] == 'PREPARING'):
                    # print('[Notice] LIVE Ended!')
                    pass
                else:
                    # print('[OTHER] ', jd['cmd'])
                    pass
            except Exception as e:
                pass

    def running(self):
        try:
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
            loop.run_until_complete(self.startup())
        except Exception as e:
            print("quite")


if __name__ == '__main__':
    roomId = 26397089
    danmu = spider(roomId)
    danmu.running()