import React, { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import './style.css'
import { Row, Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { Authentication_Context } from '../../Context/userContext'
import { HiHome, HiCollection } from 'react-icons/hi'
import { BsFillBarChartFill } from 'react-icons/bs'
import { MdFavorite } from 'react-icons/md'
//import { Logout } from '../../AdditionalFunction/user'
//non login   user sidebar
function Side_Bar_Non_LOgin_User (props) {
  return (
    <ul>
      <li>
        <NavLink to='/'>Home</NavLink>
      </li>
    </ul>
  )
}

function SideBar (props) {
  const Auth = useContext(Authentication_Context)

  const Logout = () => {
    localStorage.clear()
    Auth.log_out()
    alert('do u want to log out')
  }
  function Side_Bar_LOgin_User (props) {
    return (
      <ul>
        <li>
          <NavLink to='/'>
            Home <HiHome />{' '}
          </NavLink>
        </li>
        <li>
          <NavLink to='/newblog'>New Blog</NavLink>
        </li>
        <li>
          <NavLink to='/charts'>
            Blog Chart <BsFillBarChartFill />{' '}
          </NavLink>
        </li>
        <li>
          <NavLink to='/my-blog'>
            {' '}
            My Blog <HiCollection />{' '}
          </NavLink>
        </li>
        <li>
          <NavLink to='/favourite'>
            Favourites <MdFavorite />{' '}
          </NavLink>
        </li>
        <li>
          <button onClick={() => Logout()}>Logout</button>
        </li>
      </ul>
    )
  }
  return (
    <Row>
      <Col md={{ span: 2 }} className='sidebar'>
        {Auth.state.authenticate
          ? Side_Bar_LOgin_User()
          : Side_Bar_Non_LOgin_User()}
      </Col>
      <Col md={{ span: 10 }} style={{ marginLeft: 'auto' }}>
        {props.children}
      </Col>
    </Row>
  )
}

export default SideBar
