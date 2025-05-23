import React, {useState} from 'react';
import axiosClient  from '../utils/AxiosClient'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login(){
    const navigate = useNavigate();
    const { user, login } = useAuth();

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            console.log("Submitting: ", loginData);

            const loggedInUser = await login(loginData);

            if(loggedInUser.role === 'SEEKER'){
                navigate('/jobs');
            }
            else{
                navigate('/applications');
            }
        } catch (error) {
            console.error('Login error:', error);
        }


        /* e.preventDefault();
        console.log("Submitting: ",loginData);


        await login(loginData);

        axiosClient.post('http://localhost:8080/auth/login', loginData)
            .then(response => {
                console.log('Login successful:', response.data);
                localStorage.setItem('token', response.data.token);
                console.log(response.data.token)

                navigate('/jobs');
            })
            .catch(error => {
                console.error('Login error:', error);
            }); */
    }

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        })
        // console.log("Updated values: ",loginData);
    }

    return (
        <div className='formContainer'>
            <h2 className='formHeading'>Войти</h2>
            <form onSubmit={handleLogin} >
                <div>
                    <label>E-mail:</label>
                    <input name='email' type='email' placeholder='Введите свой e-mail' onChange={handleChange} required/>
                </div>
                <div>
                    <label>Пароль:</label>
                    <input name='password' type='password' placeholder='**********' onChange={handleChange} required/>
                </div>
                <button type='submit'>Войти</button>
            </form>
        </div>
    )
}