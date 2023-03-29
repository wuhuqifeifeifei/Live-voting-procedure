'''
这是一个获取ans的示例
'''

import threading
from Spider import spider
import time

'''
`danmu.running()` 是一个阻塞函数，它会一直运行直到程序结束或者出现异常。
因此，当你调用 `danmu.running()` 时，程序就会一直运行在这个函数中，
无法返回到主程序中去，导致你无法访问 `ans`。
解决的办法便是在访问'ans'之前停止这个程序，使其返回主程序中，
调用完毕之后再重启这个程序。
这里引入多线程threading的方法来进行这个操作
'''

roomId = 26397089

# 创建一个标志位，用于控制循环的结束
stop_flag = threading.Event()

# 在主程序中调用 spider 类，并传入标志位
danmu = spider(roomId, stop_flag)
while True:
    # 启动 danmu 的运行
    danmu_thread = threading.Thread(target=danmu.running)
    danmu_thread.start()

    # 在主程序中可以随时修改标志位，结束循环
    stop_flag.set()#结束
    print(danmu.ans)#获取ans
    stop_flag.clear()#开始
    time.sleep(2)#控制读取时间