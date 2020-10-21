export const getPosts = (sortBy) => {
    return fetch(`/api/posts/posts?sortBy=${sortBy}&order=desc&limit=6`, {
        method: "GET",
    }).then(result => {
        return result.json()
    }).catch(err => {
        console.log(err)
    });
};