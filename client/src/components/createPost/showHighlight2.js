import React from 'react'
import './post.css';


const ShowHighlight2 = ({ item, url }) => (
    <div className="post-img">
        <img src={`api/${url}/posts/highlight2/${item._id}`} alt={item.description} className="mb-3" style={{ maxHeight: '90%', maxWidth: '90%' }} />
    </div>
);


export default ShowHighlight2;