import React, { useState } from 'react'
import "../styles/CreatePost.css"
import axios from 'axios'
import { SERVER } from '../constants/constants'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles
import Loading from './Loader'

const UpdateBlog = () => {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [summary, setSummary] = useState('')
    const [file, setFile] = useState()
    const { id } = useParams();
    const [loading, setLoading] = useState(false);  // Add loading state


    const submitHandler = async(e) => {
      e.preventDefault()
setLoading(true)
        try {
         
          const res = await axios.put(`${SERVER}/blog/updateBlog/${id}`,{
            title,
            content,
            summary
          },{
            withCredentials: true,
          })
 
          toast.success('Blog Updated Successfully!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            onClose: true
          }
        )
        
        } catch (error) {
         toast.error(`${error?.response?.data?.message}`,{
          position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
        })
        } finally {
          setLoading(false)
        }
     }

     const handleUploadImage = async(e) => {

      e.preventDefault()
        setLoading(true)

        try {
            const formData = new FormData();
            formData.append("image",file)

            const res = await axios.put(`${SERVER}/blog/updateImage/${id}`,formData,{
              withCredentials: true,
              headers: {
                'Content-Type': 'multipart/form-data',
            }
            })
   
            toast.success('Image Updated Successfully!', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              onClose: true
            }
          )
          
          } catch (error) {
           toast.error(`${error?.response?.data?.message}`,{
            position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
          })
          }finally {
            setLoading(false)
          }
         
        
     }

  return (
    <>
    {
      loading ? <Loading /> : <>
         <div className='container'>
        <div className="card">
          <h2>Update Blog</h2>
          <form onSubmit={submitHandler}>
            <div className="input">
              <label htmlFor="title">Update Title of the Blog:</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                id="title" 
                placeholder='Enter Title'
              />
            </div>

            <div className="input">
              <label htmlFor="content">Update Content:</label>
              <div className="content">
                <textarea 
                  value={content} 
                  onChange={(e) => setContent(e.target.value)} 
                  id="content" 
                  placeholder="Enter Content"
                />
              </div>
            </div>

            <div className="input">
              <label htmlFor="summary">Update Summary:</label>
              <input 
                type="text" 
                value={summary} 
                onChange={(e) => setSummary(e.target.value)} 
                id="summary" 
                placeholder="Enter Summary"
              />
            </div>

            <button type='submit' id='createButton'>Submit</button>
          </form>

          <div className="img">
            <label htmlFor="img">Update Image:</label>
            <input 
              type="file" 
              onChange={(e) => setFile(e.target.files[0])} 
              id="img" 
              placeholder='Upload Image...'
            />  
            <button onClick={handleUploadImage} id='imgButton'>Upload Image</button>
          </div>
        </div>
      </div>
      </>
    }
      
      <ToastContainer />
    </>
  )
}

export default UpdateBlog
