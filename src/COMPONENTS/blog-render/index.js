import React from 'react'
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import SideBar from '../sidebar'
import { GetBlogData } from '../../AdditionalFunction/blog'
import { useEffect, useState } from 'react'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'

import './style.css'
import {
  Get_Favourites,
  heart_button_click
} from '../../AdditionalFunction/favourite'
function BlogRender (props) {
  //id get from localstorage for rendering edit button (if the blog auther is user)
  const id = localStorage.getItem('id')
  //blogid to get blog details and render the page
  const { blogId } = useParams()
  const [search] = useSearchParams()
  const Navigate = useNavigate()
  //state for blog details
  const [blogData, setData] = useState({})

  const favId = search.get('id')
  //state for favourite button click and unclick
  const [heartClick, setClick] = useState()
  const [favourites, setFavourites] = useState({})
  console.log('fav', favourites)
  console.log('blogId', favId)
  if (blogData.error) {
    Navigate('/')
  }
  //marked  data set up
  const marked = `${blogData._html}`

  useEffect(() => {
    GetBlogData(blogId, setData, props)
    // console.log(blogData,"data");
  }, [blogId])
  useEffect(() => {
    Get_Favourites(setFavourites, setClick, favId)
  }, [])
  // console.log(heartClick, 'fav')
  return (
    <SideBar>
      <div>BlogRender</div>
      <div className='blog-container'>
        <div className='blog'>
          <div className='blog-title'>
            <h2>{blogData && blogData.title}</h2>
          </div>
          <Link className='btn btn-secondary' to={'/'}>
            view all blogs
          </Link>
          <button
            className={`btn-rounded ml-2 ${heartClick && 'text-danger'}`}
            onClick={() => {
              heart_button_click(heartClick ? false : true, favId, setClick)
              // Get_Favourites(setFavourites, setClick, blogId)
            }}
          >
            {!heartClick ? <AiOutlineHeart /> : <AiFillHeart />}
          </button>
          {blogData.createdBy == id && (
            <Link
              className='edit btn btn-primary'
              to={`/edit/${blogData.slug}`}
            >
              Edit
            </Link>
          )}
        </div>
        <Row className='_description'>
          <p></p>
          <Col className='img-container' md={{ span: 6 }}>
            <img
              src={`${
                process.env.REACT_APP_BACK_END_HOST
              }${blogData.blogImage && blogData.blogImage}`}
            />
          </Col>
          <Col className='p' md={{ span: 6 }}>
            <p>{blogData && blogData.description}</p>
          </Col>
        </Row>
        <Row className='marked'>
          <div
            className='marked-data'
            dangerouslySetInnerHTML={{ __html: marked }}
          />
        </Row>
      </div>
    </SideBar>
  )
}

export default BlogRender
