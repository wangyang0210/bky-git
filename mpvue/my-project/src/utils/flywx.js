import Fly from 'flyio'
var fly = new Fly
    //配置请求地址
fly.config.baseURL = "http://dati-api.ecdpower.net/api/"

fly.interceptors.request.use((request) => {
    wx.showLoading({
        title: "加载中",
        mask: true
    })

    return request
})

fly.interceptors.response.use((response) => {
        wx.hideLoading()
        return response.data
    },
    (err) => {
        console.log(err)
        wx.hideLoading()
        if (err) {
            return "请求失败"
        }
    }
)

export default fly