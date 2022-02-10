import axios from 'axios';

const api_url = 'http://localhost:9000/'

const api = axios.create({
    baseURL: api_url,
});

const Data = {
    getData () {
        return api.get('/').then(res => res.data)
    }
}

export default Data;