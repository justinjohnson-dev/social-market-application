/* FILE DEDICATED TO ALL CALLS TO BACKEND */

export const signUpUser = (user) => {
    return fetch('/api/users/signup' , {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(result => {
      return result.json()
    }).catch(err => {
      console.log(err)
    });
};

export const signIn = (user) => {
    return fetch('api/signin' , {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
        }).then(result => {
        return result.json()
        }).catch(err => {
        console.log(err)
        });
};


// accessing local storage to keep users logged in
export const authenticate = (data, next) => {
    if(typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data))
        next();
    }
};


export const signout = (next) => {
    if(typeof window !== 'undefined') {
        localStorage.removeItem('jwt')
        next();
        
        return fetch('/api/signout', {
            method: "GET"
        }).then(result => {
            console.log('signout', result);
        }).catch(err => {
            console.log(err);
        })
    }
};


export const isAuthenticated = () => {
    if(typeof window == 'undefined') {
        return false;
    }

    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
};
