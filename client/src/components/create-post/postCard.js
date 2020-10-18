import React from 'react'
import ShowImage from './showImage'


const Card = ({post}) => {
    return (
        <div className="col-4 match-height card-direction">
            <div className="card">
                <div className="card-header post-name">{post.name}</div>
                <div className="card-body">
                    <ShowImage className='photo-size' item={product} url="posts" />
                    <div className="card-body-styling">
                        <p className="post-description">{post.description.substring(0, 100)}</p>
                    </div>
                </div>
            </div>        
        </div>
    )
}


export default Card;