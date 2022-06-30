import React, { useEffect, useState, useContext } from 'react'
import { Authentication_Context } from '../../Context/userContext'
import { useNavigate } from 'react-router-dom'
import {  Container } from 'react-bootstrap'
import SideBar from '../sidebar'
import Blog from '../../MUI/blog/blog'
import { GetFav } from '../../AdditionalFunction/favourite'
function Favourites () {
  const Navigate = useNavigate()
  const { authenticate } = useContext(Authentication_Context).state

  const [fav, setFav] = useState()
  console.log('fav', fav)
  useEffect(() => {
    if(!authenticate){
      Navigate('/')
    }
    else{
      GetFav(setFav)
    }
    
  }, [])
  return (
    <SideBar>
      <Container>
        <div className='home-container'>
          <div>Favourite Blogs</div>
          <div className='blogs-container'>
            {fav && fav.length > 0 ? (
              fav.map((blog, index) => (
                <Blog
                  title={blog.blogItems.title}
                  description={blog.blogItems.description}
                  blogImage={blog.blogItems.blogImage}
                  blogId={blog.blogItems._id}
                  _id={blog.blogItems.slug}
                  firstName={'adarsh k'}
                  name={true}
                />
              ))
            ) : (
              <div className='text-warning'>
                {' '}
                <h3>No Favourites List</h3>
              </div>
            )}
          </div>
        </div>
      </Container>
    </SideBar>
  )
}

export default Favourites
