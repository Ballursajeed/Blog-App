import React, { useState } from 'react'
import "../styles/CreatePost.css"
import axios from 'axios'
import { SERVER } from '../constants/constants'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'

const UpdateBlog = () => {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [summary, setSummary] = useState('')
    const [file, setFile] = useState()
    const { id } = useParams();

    const submitHandler = async(e) => {
        try {
          e.preventDefault()
         
          const res = await axios.put(`${SERVER}/blog/updateBlog/${id}`,{
            title,
            content,
            summary
          },{
            withCredentials: true,
          })
 
          console.log("update blog: ",res.data);
        
        } catch (error) {
         console.log(error?.response?.data);
        }
     }

     const handleUploadImage = async(e) => {

        

        try {
            e.preventDefault()
            const formData = new FormData();
            formData.append("image",file)

            const res = await axios.put(`${SERVER}/blog/updateImage/${id}`,formData,{
              withCredentials: true,
              headers: {
                'Content-Type': 'multipart/form-data',
            }
            })
   
            console.log("update Image: ",res.data);
          
          } catch (error) {
           console.log(error?.response?.data);
          }
         
        
     }

  return (
    <>
    <Navbar />
      <div className='container'>
        <div className="card">
        <h2>Update Blog</h2>
        <form action="" method='post' onSubmit={submitHandler}>
           <div className="input">
             <label htmlFor="title">Update Title of the Blog:</label>
             <input type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value) } 
                id="title" 
                placeholder='Enter Title'
             />

             <div>Update Content:</div>
             <div className="content">
             <textarea type="text"  
                value={content} 
                onChange={(e) => setContent(e.target.value) } 
                id="content" 
                placeholder='Enter Content'
             />
             </div>
 
             <label htmlFor="summary">Update Summary: </label>
             <input type="text" 
                value={summary} 
                onChange={(e) => setSummary(e.target.value) } 
                id="summary" 
                placeholder='Enter Summary'/>
               
             

             <button type='submit'>Submit</button>
           </div>
        </form>
        <div className="img">
             <label htmlFor="img">update Image: </label>
             <input type="file" 
                    onChange={(e) => setFile(e.target.files[0])}
                    id="img" placeholder='Upload Image...'/>  
              <button onClick={handleUploadImage}>Upload Image</button>      
        </div>
        </div> 
    </div>
   
    </>
  )
}

export default UpdateBlog
