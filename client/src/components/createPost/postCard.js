import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updatePost } from "../actions/postAction";
import ShowImage from './showImage';
import ShowHighlight from './showHighlight';
import ShowHighlight2 from './showHighlight2';
import axios from 'axios';
import './post.css';


const Card = ({ post, user }) => {
    const [clicked, setClick] = useState("false");
    const [buttonColor, setButtonColor] = useState("black");
    const [alreadyLiked, setAlreadyLiked] = useState("false");
    const [countUserLikes, setCountUserLikes] = useState(0);

    useEffect(() => {
        // Update the document title using the browser API
        let usersLiked = post.usersLiked;
        for (let i = 0; i < usersLiked.length; i++) {
            if (usersLiked[i] === user.id) {
                setAlreadyLiked("true");
            }
        }

        // set like count
        setCountUserLikes(usersLiked.length)
    }, []);

    const clickedLikeButton = () => {
        if (clicked === "true") {
            console.log('already liked post')
        } else {
            // will allow you to like the post once per session.
            // check if user has already liked the post
            let usersLiked = post.usersLiked;

            if (alreadyLiked === "false") {
                if (user.id === undefined) {
                    console.log('not logged in');
                } else {
                    usersLiked.push(user.id)
                    axios.put(`/api/posts/postLike/${post._id}`, { usersLiked })
                        .then(res => {
                            console.log(res);
                            console.log(res.data);
                        })
                    setClick("true");
                    setButtonColor("rgb(196, 141, 41)");
                }
            }
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
                            {alreadyLiked === "false" && countUserLikes === 0 &&
                                <button onClick={() => clickedLikeButton()} className="icon-like-button" style={{ border: "none", backgroundColor: "transparent" }}><i class="far fa-thumbs-up" style={{ paddingBottom: "20px", color: buttonColor }}>
                                    {clicked === "false" &&
                                        <span> {countUserLikes} likes </span>
                                    }
                                    {clicked === "true" &&
                                        <span> 1 likes </span>
                                    }
                                </i></button>
                            }
                            {alreadyLiked === "false" && countUserLikes > 0 &&
                                <button onClick={() => clickedLikeButton()} className="icon-like-button" style={{ border: "none", backgroundColor: "transparent" }}><i class="far fa-thumbs-up" style={{ paddingBottom: "20px", color: buttonColor }}>
                                    {clicked === "false" &&
                                        <span> {countUserLikes} likes </span>
                                    }
                                    {clicked === "true" &&
                                        <span> {countUserLikes + 1} likes </span>
                                    }
                                </i></button>
                            }
                            {alreadyLiked === "true" &&
                                <button onClick={() => clickedLikeButton()} className="icon-like-button" style={{ border: "none", backgroundColor: "transparent" }}><i class="far fa-thumbs-up" style={{ paddingBottom: "20px", color: "rgb(196, 141, 41)" }}> {countUserLikes} likes </i></button>
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
                            {alreadyLiked === "false" && countUserLikes === 0 &&
                                <button onClick={() => clickedLikeButton()} className="icon-like-button" style={{ border: "none", backgroundColor: "transparent" }}><i class="far fa-thumbs-up" style={{ paddingBottom: "20px", color: buttonColor }}>
                                    {clicked === "false" &&
                                        <span> {countUserLikes} likes </span>
                                    }
                                    {clicked === "true" &&
                                        <span> 1 likes </span>
                                    }
                                </i></button>
                            }
                            {alreadyLiked === "false" && countUserLikes > 0 &&
                                <button onClick={() => clickedLikeButton()} className="icon-like-button" style={{ border: "none", backgroundColor: "transparent" }}><i class="far fa-thumbs-up" style={{ paddingBottom: "20px", color: buttonColor }}>
                                    {clicked === "false" &&
                                        <span> {countUserLikes} likes </span>
                                    }
                                    {clicked === "true" &&
                                        <span> {countUserLikes + 1} likes </span>
                                    }
                                </i></button>
                            }
                            {alreadyLiked === "true" &&
                                <button onClick={() => clickedLikeButton()} className="icon-like-button" style={{ border: "none", backgroundColor: "transparent" }}><i class="far fa-thumbs-up" style={{ paddingBottom: "20px", color: "rgb(196, 141, 41)" }}> {countUserLikes} likes </i></button>
                            }
                        </div>
                    </div>
                }
            </div>
        </div >
    );
}


// class Card extends Component {
//     constructor() {
//         super();
//         this.state = {
//             clicked: "false",
//             buttonColor: "black",
//             alreadyLiked: "false",
//             errors: {}
//         };
//     }

//     componentDidMount() {
//         // Update the document title using the browser API
//         let usersLiked = post.usersLiked;
//         for (let i = 0; i < usersLiked.length; i++) {
//             if (usersLiked[i] === user._id) {
//                 console.log(usersLiked[i] + '=' + user._id)
//                 setAlreadyLiked("true");
//             }
//         }
//     }

//     clickedLikeButton() {
//         if (clicked === "true") {
//             console.log('already liked post')
//         } else {
//             // will allow you to like the post once per session.
//             // check if user has already liked the post
//             let likes = post.likes
//             let usersLiked = post.usersLiked;

//             if (alreadyLiked === "false") {
//                 usersLiked.push(user._id)
//                 likes += 1;
//                 axios.put(`/api/posts/postLike/${post._id}`, { likes, usersLiked })
//                     .then(res => {
//                         console.log(res);
//                         console.log(res.data);
//                     })
//                 setClick("true");
//                 setButtonColor("rgb(196, 141, 41)");
//             }
//         }
//     }

//     render() {
//         const { user } = this.props.auth;
//         const { post } = this.props.post;
//         return (
//             <div className="col-4 match-height card-direction">
//                 <div className="card">
//                     {post.farmer === "Yes" &&
//                         <div className="card-header">
//                             <i class="fas fa-star"> Farmer</i>
//                             <div className="card-header post-name farmer-post">
//                                 <p className="hello">{post.location}</p>
//                             </div>
//                         </div>
//                     }
//                     {post.farmer === "No" &&
//                         <div className="card-header post-name">{post.location}</div>
//                     }
//                     <div className="card-body">
//                         <ShowImage className='photo-size' item={post} url="posts" />
//                         <div className="card-body-styling">
//                             <p className="post-description">{post.description}</p>
//                         </div>
//                         <div>
//                             {alreadyLiked === "false" &&
//                                 <button onClick={() => clickedLikeButton()} className="icon-like-button" style={{ border: "none", backgroundColor: "transparent" }}><i class="far fa-thumbs-up" style={{ paddingBottom: "20px", color: buttonColor }}> Like post! </i></button>
//                             }
//                             {alreadyLiked === "true" &&
//                                 <button onClick={() => clickedLikeButton()} className="icon-like-button" style={{ border: "none", backgroundColor: "transparent" }}><i class="far fa-thumbs-up" style={{ paddingBottom: "20px", color: "rgb(196, 141, 41)" }}> {post.likes} likes </i></button>
//                             }
//                         </div>
//                     </div>
//                     {post.farmer === "Yes" &&
//                         <div className="card-footer highlight-div">
//                             <div className="highlight1">
//                                 <ShowHighlight className='highlight-size' item={post} url="posts" />
//                             </div>
//                             <div className="highlight2">
//                                 <ShowHighlight2 className='highlight-size' item={post} url="posts" />
//                             </div>
//                         </div>
//                     }
//                     {post.farmer === "Yes" &&
//                         <div className="card-footer purchase-button">
//                             <Link className="btn btn-small button-color" to={{
//                                 pathname: "/purchase",
//                                 state: {
//                                     post: post
//                                 }
//                             }}>Purchase Product</Link>
//                         </div>
//                     }
//                 </div>
//             </div >
//         );
//     }
// }


Card.propTypes = {
    updatePost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updatePost }
)(Card);
