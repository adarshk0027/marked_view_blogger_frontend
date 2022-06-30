import React, { useState, useEffect } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { useParams,useNavigate } from 'react-router-dom'
import MatierialInput, { MatierialTextArea } from '../../MUI/element'
import ReactMarkdown from 'react-markdown'
import { GetBlogData, updateBlog } from '../../AdditionalFunction/blog'
function EditBlog () {
  const Navigate=useNavigate()
  const [blogData, setBlog] = useState({})
  //console.log("blog",blogData);
  const { id } = useParams()
  useEffect(() => {
    GetBlogData(id, setBlog)
  }, [id])
  const OnchngeHandleFields = (name, e, clear) => {
    setBlog({ ...blogData, [name]: e.target.value })
    if (clear) {
      setBlog({
        title: '',
        description: '',
        marked: '',
        blogImage: '',
        slug: ''
      })
    }
    //console.log(blogData[name]);
  }
  const Set_Up_Form = () => {
    const form = new FormData()
    form.append('_id',blogData._id)
    form.append('title', blogData.title)
    form.append('description', blogData.description)
    form.append('marked', blogData.marked)
    form.append('blogImage', blogData.blogImage)
    updateBlog(form,Navigate,id)
  }
  return (
    <Container>
      <Row>
        <Col md={{ span: 6 }}>
          <MatierialInput
            value={blogData.title}
            label='Title'
            name='title'
            type='text'
            onChange={e => {
              OnchngeHandleFields('title', e)
            }}
          />

          <MatierialTextArea
            value={blogData.description}
            label='Description'
            height='7rem'
            placeholder='Enter Description'
            onChange={e => {
              OnchngeHandleFields('description', e)
            }}
          />

          <MatierialTextArea
            label='Marked Text'
            height='15rem'
            placeholder='# Header for h1'
            onChange={e => {
              OnchngeHandleFields('marked', e)
            }}
            value={blogData.marked}
          />
          <div>
            <label>add image</label>
            <input
              type={'file'}
              accept='.jpg, .jpeg, .png ,image/*'
              onChange={e => {
                setBlog({ ...blogData, blogImage: e.target.files[0] })
                console.log(blogData.blogImage)
              }}
            />
          </div>
          <div>
            <button
              className=' mx-1 mt-3 rounded btn btn-primary'
              onClick={() => {
                Set_Up_Form()
              }}
            >
              Update
            </button>
            <button
              className=' mx-2 mt-3 rounded btn btn-secondary'
              onClick={e => OnchngeHandleFields('title', e, 'clear')}
            >
              Close
            </button>
          </div>
        </Col>
        <Col>
          <ReactMarkdown>{blogData.marked}</ReactMarkdown>
        </Col>
      </Row>
    </Container>
  )
}

export default EditBlog
