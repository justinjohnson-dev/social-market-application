import React from 'react'
import './post.css';


const ShowHighlight = ({ item, url }) => (
    <div className="post-img">
        <img src={`api/${url}/posts/highlight/${item._id}`} alt={item.description} className="mb-3" style={{ maxHeight: '90%', maxWidth: '90%' }} />
    </div>
);


export default ShowHighlight;