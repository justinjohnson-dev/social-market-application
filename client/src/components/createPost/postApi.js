export const getPosts = (sortBy) => {
    return fetch(`/api/posts/posts?sortBy=${sortBy}&order=desc&limit=20`, {
        method: "GET",
    }).then(result => {
        return result.json()
    }).catch(err => {
        console.log(err)
    });
};

export const getPostsById = (id,sortBy) => {
    return fetch(`/api/posts/posts?id=${id}&sortBy=${sortBy}&order=desc&limit=20`, {
        method: "GET",
    }).then(result => {
        return result.json()
    }).catch(err => {
        console.log(err)
    });
};
export const getPostsByLike = (id,sortBy) => {
    try{
    return fetch(`/api/posts/posts-liked?id=${id}&sortBy=${sortBy}&order=desc&limit=20`, {
        method: "GET",
    }).then(result => {
        return result.json()
    }).catch(err => {
        console.log(err)
    });
}catch(ex){
    console.log(ex)
}
};