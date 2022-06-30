import React from 'react'
import { Link } from 'react-router-dom'
console.log("env backend",process.env.REACT_APP_BACK_END_HOST);
function Blog ({ blogId,title, description, _id, blogImage, firstName, name ,links,user,userImg}) {
  return (
    <div className='blogs'>
      <div className='blog-title'>
        <h2>{title}</h2>
        {name && (
          <div className='d-flex'>
            <strong>Blogger :</strong>
            <Link to={`/user/${user}`}>
              <p>
                <img
                  src={`${process.env.REACT_APP_BACK_END_HOST}${userImg ? userImg : "user.png"}`}
                  width={'25rem'}
                  height={'20rem'}
                  className='rounded'
                />
                @{firstName}
              </p>
            </Link>
          </div>
        )}
      </div>
      <div className='blog-desc d-flex'>
        <div className='blog-image'>
          <img src={`${process.env.REACT_APP_BACK_END_HOST}${blogImage}`}></img>
        </div>
        <strong className='desc'>
          <p>{description}</p>
        </strong>
      </div>
      <div className='d-flex'>
        {' '}
        <Link
          to={`/blog/${_id}?id=${blogId}`}
          className='rounded btn btn-primary text-light mt-1'
        >
          Read More
        </Link>{' '}
        {
          links && links
        }
      </div>
    </div>
  )
}

export default Blog
