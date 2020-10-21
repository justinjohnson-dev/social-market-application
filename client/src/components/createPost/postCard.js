import React from 'react'
import ShowImage from './showImage'
import './post.css';


const Card = ({ post }) => {
    return (
        <div className="col-4 match-height card-direction">
            <div className="card">
                <div className="card-header post-name">{post.location}</div>
                <div className="card-body">
                    <ShowImage className='photo-size' item={post} url="posts" />
                    <div className="card-body-styling">
                        <p className="post-description">{post.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;
