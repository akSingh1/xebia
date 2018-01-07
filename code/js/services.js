/*
* Service module provides an app specific wrapper over
* Fetch web api for making server requests.
* It handles successful responses along with network errors
* and non-ok responses which are errors but still a successful response
* like 4XX and 5XX.
* @return {Object} - exposes api for making network requests.
 */

const Service = (function () {
    const origin = window.location.origin;
    const handleResponse = (resp) => {
        if(resp.ok) {
            return resp.json();
        } else {
            return resp.json().then( (error) => {
                throw error;
            })
        }
    };

    const handleNetworkErr =  (err) => {
        throw {
            message: err.message
        }
    };

    const fetchWrapper = (url, options = {}) => {
        const commonOpts =  {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        };
        const finalOptions = {...options,...commonOpts };
        return fetch(url, finalOptions).then( handleResponse, handleNetworkErr);

    };

    return {
        fetchPeople: (name) => {
            return fetchWrapper(`https://swapi.co/api/people?search=${name}`);
        },
        fetchPlanets: (planet) => {
            return fetchWrapper(`https://swapi.co/api/planet?search=${planet}`);
        }
    }
} ());

export default Service;