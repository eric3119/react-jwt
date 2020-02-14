import { create } from 'apisauce'

const api = create({
  // baseURL: 'http://localhost:3333/',
  baseURL: 'http://172.16.130.252:8000/',
});

api.addResponseTransform(response => {
    if (!response.ok) throw response;
});

export default api;