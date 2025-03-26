import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: "http://localhost:8080/auth",
    realm: "Mission_Rent_Possible",
    clientId: "reactlogin",
});

export const initKeycloak = () => {
    return new Promise((resolve, reject) => {
        keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
            if (authenticated) {
                console.log('Authenticated');
                resolve(keycloak);
            } else {
                reject('Authentication failed');
            }
        }).catch(err => {
            reject(err);
        });
    });
};

export const keycloakInstance = keycloak;

