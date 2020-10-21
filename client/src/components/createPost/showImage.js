import React from 'react'
import './post.css';


const ShowImage = ({ item, url }) => (
    <div className="product-img">
        <img src={`api/${url}/posts/photo/${item._id}`} alt={item.description} className="mb-3" style={{ maxHeight: '90%', maxWidth: '90%' }} />
    </div>
);


export default ShowImage;