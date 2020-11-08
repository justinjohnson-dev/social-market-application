import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ShowImage from './showImage';
import ShowHighlight from './showHighlight';
import ShowHighlight2 from './showHighlight2';
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
                        <Link className="btn btn-small button-color" to={{
                            pathname: "/purchase",
                            state: {
                                post: post
                            }
                        }}>Purchase Product</Link>
                    </div>
                }
            </div>
        </div>
    );
}


Card.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {}
)(Card);
