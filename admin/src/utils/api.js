import { Axios } from './request'
//爬虫开始计票
export function Start() {
    return Axios.post('/start')
}
//爬虫结束计票
export function Stop() {
    return Axios.post('/stop')
}
//获取票数字典
export function getData() {
    return Axios.post('/get-data', { param: {} })
}