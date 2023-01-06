import React, { Component } from 'react'
import {Icon} from 'antd'

import ss from './img/ss.jpg'

export default class Content extends Component {
  render() {
    return (
      <div className='content'>
        <div className='contentDiv'>
          <img src={ss} alt=""/>
          <div>
            <Icon type="star" theme="filled" className='starIcon'/>
            
          </div>
          
        </div>
      </div>
    )
  }
}
