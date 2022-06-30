import './App.css'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './COMPONENTS/navbar'
import Home from './COMPONENTS/home'
import BarChart from './COMPONENTS/blog-chart'
import { useEffect, useContext } from 'react'
import { Authentication_Context } from './Context/userContext'
import NewBlogPage from './COMPONENTS/new-blog-creation'
import BlogRender from './COMPONENTS/blog-render'
import EditBlog from './COMPONENTS/edit'
import MyBlog from './COMPONENTS/my-blog'
import Favourites from './COMPONENTS/favourites'
import SignUp from './COMPONENTS/signup'
import UserView from './COMPONENTS/user-view'
import UserUpdate from './COMPONENTS/user-update'

function App () {
  const { state, login_success } = useContext(Authentication_Context)

  const { authenticate } = state
  console.log('auth', authenticate)
  console.log(authenticate)
  const Login_Setup = () => {
    const token = localStorage.getItem('token')
      ? localStorage.getItem('token')
      : ''
    console.log(token, 'token')
    if (token !== '') {
      login_success({ token })
    }
  }
  useEffect(() => {
    if (!authenticate) {
      Login_Setup()
    }
  }, [authenticate])
  return (
    <div className='App'>
      <Navbar></Navbar>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/blog/:blogId' element={<BlogRender />}></Route>
          <Route path='/newblog' element={<NewBlogPage />}></Route>
          <Route
            path='/edit/:id'
            element={authenticate ? <EditBlog /> : <Home />}
          ></Route>
          <Route path='/my-blog' element={<MyBlog />}></Route>
          <Route path='/favourite' element={<Favourites />}></Route>
          <Route path='/user/:id' element={<UserView />}></Route>
          <Route path='/setting/:userId' element={<UserUpdate />}></Route>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/charts' element={<BarChart />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
