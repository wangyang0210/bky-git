export default {
    user: {
        loign: "/user/login", //登录
        loignOut: "/user/loginOut", //获取退出登录
        uploadAvatar: "/user/uploadAvatar", //更新头像
        updateInfo: "/user/updateInfo", //更新个人资料
        sumsend: "/user/sumsend", //获取验证码
        getCore: "/user/get_core", //获取钥匙
        invite: "/invite/index", //邀请列表
        help_friend: "/invite/help_friend", //邀请好友助力
        is_follows: "/user/is_follows", //是否关注公众号
        getMoney: "/user/getMoney", //获取我当前金额
        toKey: "/user/true_to_live",
        boxList: "/user/box_list",
        contact: "/user/contact",
        inviteInfo: "/invite/index",
        pay: "/key/getPayInfo",
        loginWx: "/user/loginByWx?redirect=",
        addressAdd: "/Address/add",
        addressUpdate: '/Address/edit',
        addressDelete: "/Address/delete",
        addressList: "/Address/index",
        addressChange: "/Address/switchAddress",
    },
    app: {
        index: '/index/index', //
        upload: "/user/qiniuUpload", //上传文件
        base64Upload: "/user/base64Upload", //base64图片上传
    },
    api: {
        liveinfo: "/live/get_liveinfo", //返回登录成功以后用户的信息
        specialInfo: "/live/get_specialInfo", //获取直播场次信息
        questionInfo: "/live/get_question", //获取题库错误
        endAnswer: "/live/answer", //请求当前时间
        answerResult: "/live/answer_result", //获取答题结果
        enter: "/live/game_enter", //报名
        getNewid: "/api/getNewid", //获取最新的一场活动
        rank: "/live/getRank", //获取排行榜
        useKey: "/live/use_true_key",
        gift: "/gift/record",
        getValidateCode: "/user/sumsend", //获取短信验证码
        validateCode: "/user/get_sms", //验证短信验证码
        getUserInfo: "/live/get_liveinfo", //获取登录用户信息
        getWxQrcode: "/user/get_code", //获取微信公众号关注二维码图片url,

        // add by seekei
        getAllGames: '/Live/index', //首页游戏列表
        getOneGame: '/Live/game_detail', //游戏详情
        joinGame: '/Live/game_enter', //报名参与游戏
        getQuestion: '/Live/get_question', //获取问题
        answerQuestion: '/Live/answer', //回答问题
        giftDetail: '/Gift/enter_info', //参与场次信息
        getGift: '/Gift/get_prize', //领奖
        prizeList: "/Gift/prize_index", //奖品列表
        getPrizeList: '/Gift/prize_info', //获取当天所有活动中奖名单
        getPrizeDraw: '/Live/code_detail', //获取该商品的拥有抽奖资格的用户
        getAttendList: '/Gift/attend_list', //获取参与人列表
        getPrizeUser: '/Gift/prizeList', //获取历史获奖用户列表
        contactUs: '/User/contact', //联系我们
        drawPrize: '/UserPrize/add_prize', //用户发起抽奖
        upload: '/UserPrize/upload'

    },
    wx: {
        getSign: '/weixin/getSign', //获取签名
        // getOpenId: '/weixin/getSign',
        auth: '/weixin/auth', //微信回调
        get_wx_auth: "/weixin/get_wx_auth", //获取微信登录
    }
}