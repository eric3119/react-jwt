import api from '../services/api';

const RefreshToken = async () => {
    try {
        const token = await localStorage.getItem('token');

        const response = await api.post('/refresh-token/', {
            token
        });
        const { data, problem } = response;            
        
        if (data['token']) {
            console.log(data);
            await localStorage.setItem('token', data['token'])
        } else {
            console.log(problem, data['detail']);
        }
    } catch (err) {
        const { data, problem } = err;
        
        console.log(problem, data['detail']);
    }
}

export default RefreshToken;