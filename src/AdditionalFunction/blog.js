import { Navigate } from 'react-router-dom'
import axios from '../HELPER/axios'

export const Blog_Submit = async (form, cb, Navigate) => {
  try {
    const token = localStorage.getItem('token')
    console.log(token)
    const res = await axios.post('/blog/create-new', form, {
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      }
    })
    if (res.status == 200) {
      const slug = res.data.data.slug
      const id=res.data.data._id
      console.log(id)
      cb()
      Navigate(`/blog/${slug}?${id}`)
    }
  } catch (error) {
    console.log(error)
  }
}
export const GetBlogData = async (id, setData, NAvigate) => {
  try {
    const res = await axios.get(`/blog/getblog-data/${id}`)
    if (res.status == 200) {
      setData(res.data.data)
      console.log('success')
    }
  } catch (error) {
    console.log('happens')
    setData(error.response.data)
  }
}

export const Get_all_blogs = async state => {
  try {
    const res = await axios.get('/blog/get-all-blogs')

    if (res.status == 200) {
      console.log(res.data.blogs)
      state(res.data.blogs)
    }
  } catch (error) {
    console.log(error)
  }
}
export const updateBlog = async (data, Navigate, id) => {
  try {
    //console.log(data);
    const _update = await axios.post('/blog/update', data)
    if (_update.status == 200) {
      Navigate(`/blog/${id}`)
    }
  } catch (error) {
    console.log(error)
  }
}
export const MyBlogs = async state => {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.get('/blog/my-blogs', {
      headers: {
        authorization: token
      }
    })
    if (res.status == 200) {
      console.log('frnds', res.data)
      state(res.data.data)
    }
  } catch (error) {}
}
export const DeleteBlog = async (id, State, array) => {
  try {
    //console.log(array);
    const res = await axios.post(`/blog/delete/${id}`)
    if (res.status == 200) {
      const data = array.filter(item => item._id !== id)
      State(data)
    }
  } catch (error) {
    console.log(error)
  }
}

export const Chart = async state => {
  try {
    const res = await axios.get('/blog/chart')
    console.log(res.data);
    state(res.data)
  } catch (error) {
    console.log(error)
  }
}
