const host = 'http://dati-api.ecdpower.net/api/';

function request(url, method, data, header = {}) {
    wx.showLoading({
        title: '加载中'
    })
    return new Promise((resolve, reject) => {
        wx.request({
            url: host + url,
            method: method,
            data: data,
            headers: {
                'content-type': 'application/json' // 默认转为json格式
            },
            success: function(res) {
                wx.hideLoading();
                resolve(res.data)
            },
            fail: function(error) {
                wx.hideLoading();
                reject(err)
            },
            complete: function() {
                wx.hideLoading();
            }
        })
    })
}

function get(obj) {
    return request(obj.url, 'GET', obj.data)
}

function post(obj) {
    return request(obj.url, 'POST', obj.data)
}

export default {
    request,
    get,
    post
}