import React, { useEffect, useState,useContext } from 'react'
import { Authentication_Context } from '../../Context/userContext'
import { useNavigate } from 'react-router-dom'
import SideBar from '../sidebar'
import {Link} from 'react-router-dom'
import { Container } from 'react-bootstrap'
import './style.css'
import { Get_all_blogs } from '../../AdditionalFunction/blog'
import Blog from '../../MUI/blog/blog'
function Home () {
  const Navigate=useNavigate()
  const {authenticate}=useContext(Authentication_Context).state
  const [allBlogs, setBlogs] = useState([])
  console.log("all",allBlogs);
  useEffect(() => {
    Get_all_blogs(setBlogs)
  }, [])
  return (
    <SideBar>
      <Container>
        <div className='home'>
          <Link to={'/newblog'} className='rounded btn btn-success' onClick={()=>{
             if(!authenticate){
              alert("please login for create blog")
              Navigate('/')
             }
          }}>
            new Blog
          </Link>
          <span className='mx-5'>You Can  Create Blog with Marked view</span>
        </div>
        <div className='home-container'>
          <div>Blogs-- HERE</div>
          <div className='blogs-container'>
            {allBlogs &&
              allBlogs.map((blog, index) => (
                <Blog 
                 title={blog.title}
                 description={blog.description}
                 user={blog.createdBy._id}
                 _id={blog.slug}
                 blogId={blog._id}
                 firstName={blog.createdBy && blog.createdBy.userName}
                 userImg={blog.createdBy && blog.createdBy.profilePicture}
                 blogImage={blog.blogImage}
                 name={true}
                 />
              ))}
          </div>
        </div>
      </Container>
    </SideBar>
  )
}

export default Home
