export const getFarmerOrder = (farmerId) => {
    return fetch(`/api/orders/orders/farmer/${farmerId}`, {
        method: "GET",
    }).then(result => {
        return result.json()
    }).catch(err => {
        console.log(err)
    });
};