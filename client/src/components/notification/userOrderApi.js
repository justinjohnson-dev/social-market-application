export const getUserOrder = (userId) => {
    return fetch(`/api/orders/orders/user/${userId}`, {
        method: "GET",
    }).then(result => {
        return result.json()
    }).catch(err => {
        console.log(err)
    });
};