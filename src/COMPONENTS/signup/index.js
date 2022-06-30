import React,{useContext} from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { useFormik } from 'formik'
import { Authentication_Context}  from '../../Context/userContext'
import { useNavigate } from 'react-router-dom'
import MatierialInput from '../../MUI/element'
import * as yup from 'yup'
import { SignUp } from '../../AdditionalFunction/user'

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  userName: '',
  profilePicture: '',
  password: '',
  confirmPassword: ''
}
const Validation_schema = yup.object().shape({
  firstName: yup.string().required('first name is required'),
  lastName: yup.string().required('last name is required'),
  email: yup
    .string()
    .email('is not an email ')
    .required('email is required'),
  userName: yup.string().required('its required'),
  profilePicture: yup.string(),
  password: yup.string().required('its required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords does not match')
    .required("its required")
})

function SignUP () {
  const {authenticate}=useContext(Authentication_Context).state
  const Navigate=useNavigate()
  const formik = useFormik({
    initialValues,
    validationSchema: Validation_schema,
    onSubmit:(values)=>{
        SignUp(values,Navigate)
    }
  })
  return (
    <Container>
      {authenticate && Navigate('/')}
      <form onSubmit={formik.handleSubmit}>
        <Row>
          <Col
            md={{ span: 5 }}
            className='left bg-light pt-2'
            style={{ height: '15rem' }}
          >
            <MatierialInput
              name='firstName'
              type='text'
              label='first name'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              className='mt-2'
            />
            {formik.touched && formik.errors.firstName && (
              <div className='text-danger'>{formik.errors.firstName}</div>
            )}
            <MatierialInput
              name='userName'
              type='text'
              label='user name'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.userName}
            />
            {formik.touched && formik.errors.userName && (
              <div className='text-danger'>{formik.errors.userName}</div>
            )}
            <MatierialInput
              name='password'
              type='password'
              label='password'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched && formik.errors.password && (
              <div className='text-danger'>{formik.errors.password}</div>
            )}
          </Col>
          <Col md={{ span: 7 }} className='right pt-2'>
            <MatierialInput
              name='lastName'
              type='text'
              label='last name'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
            />
            {formik.touched && formik.errors.lastName && (
              <div className='text-danger'>{formik.errors.lastName}</div>
            )}

            <MatierialInput
              name='email'
              type='text'
              label='email'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched && formik.errors.email && (
              <div className='text-danger'>{formik.errors.email}</div>
            )}

            <MatierialInput
              name='confirmPassword'
              type='password'
              label='confirm password'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.touched && formik.errors.confirmPassword && (
              <div className='text-danger'>{formik.errors.confirmPassword}</div>
            )}
            <button type={'submit'} className='rounded bg-primary  w-50 mt-2'>
              Sign Up
            </button>
            
          </Col>
        </Row>
      </form>
    </Container>
  )
}

export default SignUP
