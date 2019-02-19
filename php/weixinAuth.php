<?php
class weiXin
{
    public function get_wx_auth()
    {
            $user_source = input('user_source/d', 0);
            $code = input('code');
            $type = input('type', 'info', 'trim');
            $isCallback = input('isCallBack', '0', 'intval');
            $is_base = input('is_base/d', 0);

        if ($is_base == 1) {
            $user_source = 0;
        }
        if (!$code) {
            $this->apiReturn(0, '非法code请求');
        }

            $wechat = new wechatOp($code, $user_source);

        if ($isCallback == 1) {
            $wechat = new wechatOp($code, $user_source);
            $userInfo = $wechat->getUserInfo();

            if (!$userInfo) {
                $this->apiReturn(0, '微信第三方授权失败', $userInfo);
            }

            $userInfo = array_change_key_case($userInfo, CASE_LOWER);
            $this->apiReturn(1, '微信授权成功', $userInfo);
        } else {
            if ($type == "base_info") {
                $userInfo = $wechat->getUserInfo();

                if (!$userInfo) {
                    $this->apiReturn(0, '微信授权失败', $userInfo);
                }

                $this->apiReturn(1, '微信授权成功', $userInfo);
            } else {
                $token = $wechat->getUserAccessToken($is_base);

                if (!$token) {
                    $this->apiReturn(0, '已经获取过了无需再次获取');
                }

                $this->apiReturn(1, '获取数据成功', $token);
            }
        }
    }
}
