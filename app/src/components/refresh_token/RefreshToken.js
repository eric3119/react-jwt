import api from '../../services/api';
import { token_expiration_ms } from '../../constants/constants';

const RefreshToken = async () => {
    
    const tokenC = await localStorage.getItem('tokenC');
    const tokenR = await localStorage.getItem('tokenR');
    const tokenU = await localStorage.getItem('tokenU');

    try{
        await refreshAndStore('tokenC', tokenC);
        await refreshAndStore('tokenR', tokenR);
        await refreshAndStore('tokenU', tokenU);

    }catch (err){
        console.log(err);
        return false;
    }

    const expiration = new Date();

    await localStorage.setItem("expiration_time", (expiration.getTime() + token_expiration_ms));

    return true;
    
}

function TokenException(message) {
    this.message = message;
    this.name = "TokenException";
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
        throw new TokenException("Erro refreshAndStore");
    }
}

export default RefreshToken;