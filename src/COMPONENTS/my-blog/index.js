import React, { useEffect, useState, useContext } from 'react'
import { Authentication_Context } from '../../Context/userContext'
import { Container } from 'react-bootstrap'
import Blog from '../../MUI/blog/blog'
import SideBar from '../sidebar'
import { Link, useNavigate } from 'react-router-dom'
import { DeleteBlog, MyBlogs } from '../../AdditionalFunction/blog'
function MyBlog () {
  const Navigate = useNavigate()
  const { authenticate } = useContext(Authentication_Context).state
  const [Blogs, setMyBlog] = useState()
  useEffect(() => {
    if (!authenticate) {
      Navigate('/')
    } else {
      MyBlogs(setMyBlog)
    }
  }, [])
  return (
    <SideBar>
      <Container>
        <div className='home-container'>
          <div>MY BLOGS</div>
          {!authenticate && Navigate('/')}
          <div className='blogs-container'>
            {Blogs && Blogs.length > 0 ? (
              Blogs.map((MyBlogs, index) => (
                <Blog
                  title={MyBlogs.title}
                  description={MyBlogs.description}
                  blogImage={MyBlogs.blogImage}
                  blogId={MyBlogs._id}
                  _id={MyBlogs.slug}
                  firstName={MyBlogs.firstName}
                  name={false}
                  links={
                    <div>
                      <Link
                        to={`/Edit/${MyBlogs.slug}`}
                        className='rounded btn btn-primary text-light mt-1 ml-2'
                      >
                        edit
                      </Link>
                      <button
                        className='rounded btn btn-danger text-light mt-1 ml-2'
                        onClick={() => {
                          const decision=window.confirm("Do You Want To Delete This Blog")
                          if(decision){
                            DeleteBlog(MyBlogs._id, setMyBlog, Blogs)
                          }
                          else{
                            console.log("not deleted");
                          }
                          
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  }
                />
              ))
            ) : (
              <div className='text-warning'>
                <h3> No Blogs Created Yet </h3>
              </div>
            )}
          </div>
        </div>
      </Container>
    </SideBar>
  )
}

export default MyBlog
