import React, { useState } from 'react'
import "../styles/CreatePost.css"
import axios from 'axios'
import { SERVER } from '../constants/constants'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles

const CreatePost = () => {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [summary, setSummary] = useState('')
    const [file, setFile] = useState()


    const submitHandler = async(e) => {
        try {
          e.preventDefault()
          const formData = new FormData();
          formData.append("title",title)
          formData.append("content",content)
          formData.append("summary",summary)
          
          if (file) {
             formData.append("image",file)
          }
 
          const res = await axios.post(`${SERVER}/blog/post`,formData,{
            withCredentials: true,
             headers: {
                 'Content-Type': 'multipart/form-data',
             }
          })
 
          console.log(res.data);
          
          if (res.data.status === 201) {
 
            toast.success('Blog Posted Successfully!', {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              onClose: true
            }
          )
             
          }
       
        } catch (error) {
         console.log(error?.response?.data);
         toast.error(`${error?.response?.data?.message}`,{
          position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
        })
        }
       
        
          
     }

  return (
    <>
      <div className='container'>
      <div className='card'>
        <h2>Post a Blog</h2>
        <form onSubmit={submitHandler} className="form">
          <div className="input">
            <label htmlFor="title">Title of the Blog:</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              id="title" 
              placeholder="Enter Title" 
              required
            />
          </div>

          <div className="input">
            <label htmlFor="content">Content:</label>
            <div className="content">
              <textarea 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
                id="content" 
                placeholder="Enter Content"
                required
              />
            </div>
          </div>

          <div className="input">
            <label htmlFor="summary">Summary:</label>
            <input 
              type="text" 
              value={summary} 
              onChange={(e) => setSummary(e.target.value)} 
              id="summary" 
              placeholder="Enter Summary"
            />
          </div>

          <div className="input img">
            <label htmlFor="img">Upload Image:</label>
            <input 
              type="file" 
              onChange={(e) => setFile(e.target.files[0])} 
              id="img" 
            />
          </div>

          <div className="button-container">
            <button type="submit" id='createButton'>Submit</button>
          </div>
        </form>
      </div>
    </div>
    <ToastContainer />
    </>
  )
}

export default CreatePost
