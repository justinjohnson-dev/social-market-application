export const getUser = (userId) => {
    return fetch(`/api/users/user/${userId}`, {
        method: "GET",
    }).then(result => {
        return result.json()
    }).catch(err => {
        console.log(err)
    });
};