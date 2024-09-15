import React, { useState } from 'react';
import "../styles/Blog.css"
import { AiFillLike, AiFillDislike } from 'react-icons/ai';

const Blog = ({

}) => {

    const [liked, setLiked] = useState(false);

    const handleLikeUnlike = async () => {
 
        // try {
        //     const response = await fetch(
        //         "https://www.greatfrontend.com/api/questions/like-button",
        //         {
        //             method: "POST",
        //             headers: { "Content-Type": "application/json" },
        //             body: JSON.stringify({
        //                 action: liked ? "unlike" : "like",
        //             }),
        //         }
        //     );
 
        //     if (response.status >= 200 && response.status < 300) {
        //         setLiked(!liked);
        //     } else {
        //         const res = await response.json();
        //         setError(res.message);
        //         return;
        //     }
        // }
        setLiked(!liked)
    };

  return (
    <>
      <div className='container'>
        <div className="card">
  <div className="card-img-holder">
    <img src="https://images.unsplash.com/photo-1640102953836-5651f5d6b240?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80" alt="Blog image" />
  </div>
  <h3 className="blog-title">Learn Microinteraction</h3>
  <span className="blog-time"> Monday Jan 20, 2020</span>
  <p className="description">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sagittis viverra turpis, non cursus ex accumsan at.
  </p>
  <div className="options">
    <span>
      Read Full Blog
    </span>
    <button className="btn">Blog</button>
  </div>
  <div className="footer">
         <button
                onClick={handleLikeUnlike}
                className={`likeBtn ${liked ? "liked" : ""}`}
            >
                {liked ? "Liked" : "Like"}
            </button>
  </div>
</div>





    </div>
    </>
  )
}

export default Blog
