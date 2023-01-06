import React, { Component } from 'react'

import Footer from './Footer'
import Nav from './Nav'
import Content from './Content'
import './style/style.css'

export default class FrontMember extends Component {
  render() {
    return (
        <div>
            <Nav/>
            <Content/>
            <Footer/>
        </div>
    )
  }
}
