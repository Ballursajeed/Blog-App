import React, { useState } from 'react'
import "../styles/CreatePost.css"
import axios from 'axios'
import { SERVER } from '../constants/constants'
import Navbar from './Navbar'

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
 
             console.log(res.data);
             
          }
       
        } catch (error) {
         console.log(error?.response?.data);
        }
       
        
          
     }

  return (
    <>
      <div className='container'>
        <div className="card">
        <h2>Post a Blog</h2>
        <form action="" method='post' onSubmit={submitHandler}>
           <div className="input">
             <label htmlFor="title">Title of the Blog:</label>
             <input type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value) } 
                id="title" 
                placeholder='Enter Title'
             />

             <div>Content:</div>
             <div className="content">
             <textarea type="text"  
                value={content} 
                onChange={(e) => setContent(e.target.value) } 
                id="content" 
                placeholder='Enter Content'
             />
             </div>
 
             <label htmlFor="summary">Summary: </label>
             <input type="text" 
                value={summary} 
                onChange={(e) => setSummary(e.target.value) } 
                id="summary" 
                placeholder='Enter Summary'/>
               
             <div className="img">
             <label htmlFor="img">Upload Image: </label>
             <input type="file" 
                    onChange={(e) => setFile(e.target.files[0])}
                    id="img" placeholder='Enter Summary'/>  
             </div>

             <button type='submit'>Submit</button>
           </div>
        </form>
        </div> 
    </div>
    </>
  )
}

export default CreatePost
