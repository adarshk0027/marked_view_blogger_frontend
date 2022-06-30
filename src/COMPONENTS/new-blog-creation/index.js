import React, { useState, useContext, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Authentication_Context } from '../../Context/userContext'
import MatierialInput, { MatierialTextArea } from '../../MUI/element'
import { bloged, Blog_Submit } from '../../AdditionalFunction/blog'
import { useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
function NewBlogPage () {
  const Navigate = useNavigate()
  const { authenticate } = useContext(Authentication_Context).state
  useEffect(() => {
    if (!authenticate) {
      Navigate('/')
    }
  }, [])

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [markdown, setMarkDown] = useState('')
  const [image, setImage] = useState('')
  //close and all field get empty
  const ClearAllFields = () => {
    setTitle('')
    setDescription('')
    setMarkDown('')
    setImage('')
  }
  // blog data add to database
  const Save_Blog_Data = () => {
    const form = new FormData()
    form.append('title', title)
    form.append('description', description)
    form.append('marked', markdown)
    form.append('blogImage', image)
    //bloged()
    Blog_Submit(form, ClearAllFields, Navigate)
  }
  //new blog page creation
  return (
    <Container>
      {!authenticate && Navigate('/')}
      <div className='d-flex justify-content-between'>
        <h4 className='text-warning'>Blog Creation Form</h4>
        <h4 className='text-primary'>Marked View</h4>
      </div>
      <Row className='mt-3'>
        <Col md={{ span: 6 }}>
          <MatierialInput
            value={title}
            label='Title'
            name='title'
            type='text'
            onChange={e => {
              setTitle(e.target.value)
              console.log(title)
            }}
          />
          {!authenticate && Navigate('/')}
          <MatierialTextArea
            value={description}
            label='Description'
            height='7rem'
            placeholder='Enter Description'
            onChange={e => {
              setDescription(e.target.value)
              console.log(description)
            }}
          />

          <MatierialTextArea
            label='Marked Text'
            height='15rem'
            placeholder='# Header for h1'
            onChange={e => {
              setMarkDown(e.target.value)
              console.log(markdown)
            }}
            value={markdown}
          />
          <div>
            <label>add image</label>
            <input
              type={'file'}
              accept='.jpg, .jpeg, .png ,image/*'
              onChange={e => {
                setImage(e.target.files[0])
              }}
            />
          </div>
          <div>
            <button
              className=' mx-1 mt-3 rounded btn btn-primary'
              onClick={() => {
                if(title && description){
                  Save_Blog_Data()
                }
                else{
                  alert("title and description will  must provide")
                }
                
              }}
            >
              Save
            </button>
            <button
              className=' mx-2 mt-3 rounded btn btn-secondary'
              onClick={ClearAllFields}
            >
              Close
            </button>
          </div>
        </Col>
        <Col>
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </Col>
      </Row>
    </Container>
  )
}

export default NewBlogPage
