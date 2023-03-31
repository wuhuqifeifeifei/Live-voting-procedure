import { Axios } from './request'
//爬虫开始计票
export function Start() {
    return Axios.get('/start')
}
//爬虫暂停计票
export function Stop() {
    return Axios.get('/pause')
}
//爬虫继续计票
export function Resume() {
    return Axios.get('/resume')
}
//重置投票
export function Reset() {
    return Axios.get('/reset')
}
//获取票数字典
export function getData() {
    return Axios.get('/getData', { param: {} })
}