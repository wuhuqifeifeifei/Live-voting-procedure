import { Axios } from './request'
//爬虫开始计票
export function Start() {
    return Axios.get('/start')
}
//爬虫结束计票
export function Stop() {
    return Axios.get('/pause')
}
//获取票数字典
export function getData() {
    return Axios.get('/getData', { param: {} })
}