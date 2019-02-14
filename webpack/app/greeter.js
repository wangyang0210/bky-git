/*
* @Author: wyy
* @Date:   2019-02-13 11:58:05
* @Email:  2752154874@qq.com
* @Last Modified by:   wyy
* @Last Modified time: 2019-02-14 10:14:10
*/
import React, {Component} from 'react'
import config from './greet.json'; //因为是单一入口所以要使用import,url或require引入,这里之前使用require是没问题的

class Greeter extends Component{
  render() {
    return (
      <div>
        {config.greetText}
      </div>
    );
  }
}

export default Greeter
