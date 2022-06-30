import React, { useState } from 'react'
import logo from '../../images/blogger.png'
import blogger from '../../images/blog.png'
import Modal from 'react-bootstrap/Modal'
import { Container, Row, Col } from 'react-bootstrap'
import MatierialInput from '../../MUI/element'
import { useContext } from 'react'
import axios from '../../HELPER/axios'
import { AiFillSetting } from 'react-icons/ai'
import { Authentication_Context } from '../../Context/userContext'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Link } from 'react-router-dom'
import SpinnerLoading from '../../spinner'
import Message from '../../message'

const InitialState = {
  email: '',
  password: ''
}
const Validation_Schema = yup.object().shape({
  email: yup
    .string()
    .email('not an email type')
    .required('email is required'),
  password: yup
    .string()
    .required('required')
    .min(4, 'minimum 4 character')
})
function Navbar () {
  const [showLogin, setLogin] = useState(false)
  const [reset, setReset] = useState(false)

  const handleShow = () => setLogin(true)
  const { state, login_req, login_success, login_fail, Reset } = useContext(
    Authentication_Context
  )
  const { authenticate, authenticating, error } = state
  const handleClose = () => {
    setLogin(false)
    setReset(true)
    Reset()
  }
  console.log(authenticate)
  //login
  const Login = async values => {
    login_req()

    try {
      console.log(Authentication_Context.Consumer)
      const res = await axios.post('/users/signin', values)
      if (res.status == 200) {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user', res.data.user.firstName)
        localStorage.setItem('id', res.data.user._id)
        login_success({ token: res.data.token, user: res.data.user._id })
        setLogin(false)
        console.log(state)
      }
    } catch (error) {
      login_fail(error.response.data.message)
    }
  }

  const formik = useFormik({
    initialValues: InitialState,
    validationSchema: Validation_Schema,
    onSubmit: values => {
      Login(values)
    }
  })
  console.log(state)
  return (
    <div className='sticky-top'>
      {/* Modal */}
      <Modal show={showLogin} onHide={handleClose} size={'lg'}>
        <Modal.Header closeButton>
          <Modal.Title>Login to</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <form onSubmit={formik.handleSubmit}>
              <Row>
                <Col
                  md={{ span: 5 }}
                  className='left bg-primary'
                  style={{ height: '15rem' }}
                >
                  <div
                    className='image container d-flex'
                    style={{ margin: '2rem 0' }}
                  >
                    <img
                      src={blogger}
                      alt='blog image'
                      style={{
                        width: '8rem',
                        height: '8rem',
                        justifyContent: 'stretch'
                      }}
                    ></img>
                    <div
                      style={{
                        color: 'white',
                        fontWeight: '700',
                        margin: '1.5rem 0'
                      }}
                    >
                      <p className='d-inline'> write Something</p>
                      <p>Right places</p>
                    </div>
                  </div>
                </Col>
                <Col md={{ span: 7 }} className='right'>
                  <MatierialInput
                    name='email'
                    type='text'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={!reset ? formik.values.email : ''}
                    placeholder=' Email  ( adarshk0027@gmail.com ) -> checking'
                  />
                  {formik.touched && formik.errors.email && (
                    <div className='text-danger'>{formik.errors.email}</div>
                  )}
                  {authenticating && <SpinnerLoading />}
                  <MatierialInput
                    name='password'
                    type='password'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    placeholder='Password  (1234567)  -> checking'
                  />

                  {formik.touched && formik.errors.password && (
                    <div className='text-danger'>{formik.errors.password}</div>
                  )}
                  <button
                    type={'submit'}
                    className='rounded bg-primary  w-50 mt-2'
                  >
                    Login
                  </button>
                  <a href='' className='mx-3'>
                    forgot?
                  </a>
                  <a href="/signup" className='mx-3'>
                    register?
                  </a>
                </Col>
              </Row>
            </form>
          </Container>
        </Modal.Body>
        {error && <Message error={error} />}
      </Modal>
      {/* modal end */}
      <nav className='navbar navbar-expand-sm navbar-light bg-light'>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse navbar-collapse'
          data-target='#navbarTogglerDemo01'
          aria-controls='navbarTogglerDemo01'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarTogglerDemo01'>
          <div
            className='imge-container'
            style={{ width: '4rem', height: '4rem' }}
          >
            <img
              src={logo}
              alt='logo'
              style={{ width: '3rem', height: '3rem' }}
            ></img>
          </div>
          <div>
            <span>
              <small className='text-info'>blogger</small>
            </span>
          </div>

          <ul
            className='navbar-nav mr-auto mt-2 mt-lg-0 mx-5 '
            style={{ display: 'flex', justifyContent: 'space-around' }}
          >
            <li className='nav-item active'>
              <a className='nav-link' href='/'>
                Home <span className='sr-only'>(current)</span>
              </a>
            </li>
            <li className='nav-item mx-auto' style={{ cursor: 'pointer' }}>
              {!authenticate ? (
                <span className='nav-link' onClick={() => setLogin(true)}>
                  Login
                </span>
              ) : (
                <span className='nav-link text-lowercase fs-1 text-info'>
                  @{localStorage.getItem('user')}
                </span>
              )}
            </li>
          </ul>
          {authenticate && (
            <>
              <a
                href={`/setting/${localStorage.getItem('id')}`}
                className='nav-link ml-5 float-right'
              >
                <AiFillSetting />
              </a>
            </>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Navbar
