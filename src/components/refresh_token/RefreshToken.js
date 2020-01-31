import api from '../../services/api';

const RefreshToken = async () => {
    
    const tokenC = await localStorage.getItem('tokenC');
    const tokenR = await localStorage.getItem('tokenR');
    const tokenU = await localStorage.getItem('tokenU');

    await refreshAndStore('tokenC', tokenC);
    await refreshAndStore('tokenR', tokenR);
    await refreshAndStore('tokenU', tokenU);

    const expiration = new Date();

    await localStorage.setItem("expiration_time", (expiration.getTime() + 600000));

    return true;
    
}

async function refreshAndStore(token_name, token){
    try {
        const response = await api.post('/refresh-token/', {
            token
        });
        
        console.log(response);
        const { data, problem } = response;

        if (data['token']) {
            console.log(data);
            await localStorage.setItem(token_name, data['token']);
        } else {
            console.log(problem, data);
        }
    } catch (err) {
        const { data, problem } = err;
        console.log(problem, data);
        alert(problem, data);
    }
}

export default RefreshToken;