// import axios from 'axios'
import request from '@/utils/request'
import {
	getNewStr
} from '../assets/js/public'

export function login(userInfo) {
	console.log(userInfo)
	return request({
		url: getNewStr + '/client/5c919a305443fa0a30d13ca9',
		method: 'post',
		data: userInfo,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}