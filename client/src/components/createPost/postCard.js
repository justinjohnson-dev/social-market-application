import React from 'react';
import ShowImage from './showImage';
import ShowHighlight from './showHighlight';
import ShowHighlight2 from './showHighlight2';
import { Fab, Button } from "@material-ui/core";
import './post.css';


const Card = ({ post }) => {
    return (
        <div className="col-4 match-height card-direction">
            <div className="card">
                {post.farmer === "Yes" &&
                    <div className="card-header">
                        <i class="fas fa-star"> Farmer</i>
                        <div className="card-header post-name farmer-post">
                            <p className="hello">{post.location}</p>
                        </div>
                    </div>
                }
                {post.farmer === "No" &&
                    <div className="card-header post-name">{post.location}</div>
                }
                <div className="card-body">
                    <ShowImage className='photo-size' item={post} url="posts" />
                    <div className="card-body-styling">
                        <p className="post-description">{post.description}</p>
                    </div>
                </div>
                {post.farmer === "Yes" &&
                    <div className="card-footer highlight-div">
                        <div className="highlight1">
                            <ShowHighlight className='highlight-size' item={post} url="posts" />
                        </div>
                        <div className="highlight2">
                            <ShowHighlight2 className='highlight-size' item={post} url="posts" />
                        </div>
                    </div>
                }
                {post.farmer === "Yes" &&
                    <div className="card-footer purchase-button">
                        <Button type="submit" variant="outlined" className="button-color">
                            Purchase Item
                    </Button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Card;
