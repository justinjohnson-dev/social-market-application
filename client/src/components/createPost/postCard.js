import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ShowImage from './showImage';
import ShowHighlight from './showHighlight';
import ShowHighlight2 from './showHighlight2';
import axios from 'axios';
import './post.css';


const Card = ({ post, user }) => {
    const [clicked, setClick] = useState("false");
    const [countUserLikes, setCountUserLikes] = useState(0);
    const [diableButton, setDisableButton] = useState('false');

    useEffect(() => {
        // Update the document title using the browser API
        let usersLiked = post.usersLiked;
        for (let i = 0; i < usersLiked.length; i++) {
            if (usersLiked[i] === user.id) {
                setClick("true");
            }
        }
        // set like count
        setCountUserLikes(usersLiked.length)
        if (user.id === undefined) {
            setDisableButton('true');
        }
    }, []);

    const clickedLikeButton = () => {
        let usersLiked = post.usersLiked;

        if (user.id === undefined) {
            console.log("user not logged in");
        } else {
            if (clicked === "true") {
                unLikePost(usersLiked, user.id);
                console.log(user.id)
                axios.put(`/api/posts/postLike/${post._id}`, { usersLiked })
                    .then(res => {
                        console.log('removed user from liked post');
                    })
                setClick("false");
            } else {
                // will allow you to like the post once per session.
                // check if user has already liked the post
                usersLiked.push(user.id)
                console.log(user.id)
                axios.put(`/api/posts/postLike/${post._id}`, { usersLiked })
                    .then(res => {
                        console.log("added user to liked post");
                    })
                setClick("true");
            }
        }
    }

    const unLikePost = (arr, id) => {
        let user = arr.indexOf(id);

        while (user !== -1) {
            arr.splice(user, 1);
            user = arr.indexOf(id);
        }
    }

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
                {post.farmer === "No" &&
                    <div className="card-body">
                        <ShowImage className='photo-size' item={post} url="posts" />
                        <div className="card-body-styling">
                            <p className="post-description">{post.description}</p>
                        </div>
                        <div>
                            {clicked === "true" &&
                                <button disabled={diableButton === "true"} onClick={() => clickedLikeButton(setClick(!clicked), setCountUserLikes(countUserLikes - 1))} className="icon-like-button" style={{ border: "none", backgroundColor: "transparent" }}><i class="far fa-thumbs-up" style={{ paddingBottom: "20px", color: "rgb(196, 141, 41)" }}> {countUserLikes} likes </i></button>
                            }
                            {clicked === "false" &&
                                <button disabled={diableButton === "true"} onClick={() => clickedLikeButton(setClick(!clicked), setCountUserLikes(countUserLikes + 1))} className="icon-like-button" style={{ border: "none", backgroundColor: "transparent" }}><i class="far fa-thumbs-up" style={{ paddingBottom: "20px", color: "black" }}> {countUserLikes} likes </i></button>
                            }
                        </div>
                    </div>
                }
                {post.farmer === "Yes" &&
                    <div className="card-body">
                        <ShowImage className='photo-size' item={post} url="posts" />
                        <div className="card-body-styling">
                            <p className="post-description">{post.description}</p>
                        </div>
                    </div>
                }
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
                    <div>
                        <div className="card-footer purchase-button">
                            <Link className="btn btn-small button-color" to={{
                                pathname: "/purchase",
                                state: {
                                    post: post
                                }
                            }}>Purchase Product</Link>
                        </div>
                        <div>
                            {clicked === "true" &&
                                <button disabled={diableButton === "true"} onClick={() => clickedLikeButton(setClick(!clicked), setCountUserLikes(countUserLikes - 1))} className="icon-like-button" style={{ border: "none", backgroundColor: "transparent" }}><i class="far fa-thumbs-up" style={{ paddingBottom: "20px", color: "rgb(196, 141, 41)" }}> {countUserLikes} likes </i></button>
                            }
                            {clicked === "false" &&
                                <button disabled={diableButton === "true"} onClick={() => clickedLikeButton(setClick(!clicked), setCountUserLikes(countUserLikes + 1))} className="icon-like-button" style={{ border: "none", backgroundColor: "transparent" }}><i class="far fa-thumbs-up" style={{ paddingBottom: "20px", color: "black" }}> {countUserLikes} likes </i></button>
                            }
                        </div>
                    </div>
                }
            </div>
        </div >
    );
}

Card.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    {}
)(Card);
