import React, { useState } from 'react';
import axiosClient from '../utils/AxiosClient';
import './Register.css';

export default function Register() {
    const [registerData, setRegisterData] = useState({
        name: '',
        mobile: '',
        email: '',
        password: '',
        cnpassword: '',
        skills: '',
        photo: null,
        isCustomer: false // Добавляем флаг для типа пользователя
    });

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log("-> ", registerData);

        if (registerData.password !== registerData.cnpassword) {
            alert("Пароли не совпадают!");
            return;
        }

        try {
            const endpoint = registerData.isCustomer 
                ? 'http://localhost:8080/auth/signup' 
                : 'http://localhost:8080/auth/signupUser';
    
            let response = null;    
        //   if (registerData.isCustomer) {
            // Отправка как JSON для заказчика
                response = await axiosClient.post(endpoint, {
                name: registerData.name,
                mobile: registerData.mobile,
                email: registerData.email,
                password: registerData.password,
                skills: registerData.skills
            }, {
                headers: { 'Content-Type': 'application/json' }
            });
        /*} else {
            const formData = new FormData();
            Object.keys(registerData).forEach(key => {
                if (key !== 'isCustomer' && key !== 'cnpassword') {
                    formData.append(key, registerData[key]);
                }
            });
            
            response = await axiosClient.post(endpoint, formData);
        }*/

            console.log("Регистрация успешна: ", response.data);
            alert(`Пользователь зарегистрирован как ${registerData.isCustomer ? 'Заказчик' : 'Фрилансер'}`);
        } catch (error) {
            console.error("Ошибка регистрации: ", error.response?.data || error.message);
            alert(error.response?.data?.message || "Ошибка при регистрации");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterData({
            ...registerData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = null; //e.target.files[0];
        setRegisterData({
            ...registerData,
            photo: file,
        });
    };

    const toggleUserType = () => {
        setRegisterData({
            ...registerData,
            isCustomer: !registerData.isCustomer,
            photo: null
        });
    };

    return (
        <div className="formContainer">
            <h2 className="formHeading">Регистрация</h2>
            <form onSubmit={handleRegister}>

                <div className="user-type-toggle">
                    <label>
                        <input
                            type="checkbox"
                            checked={registerData.isCustomer}
                            onChange={toggleUserType}
                        />
                        Заказчик
                    </label>
                </div>

                <div>
                    <label>Имя:</label>
                    <input
                        name="name"
                        type="text"
                        placeholder="Введите имя"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Телефон:</label>
                    <input
                        name="mobile"
                        type="text"
                        placeholder="Введите свой номер"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>E-mail:</label>
                    <input
                        name="email"
                        type="email"
                        placeholder="Введите свой e-mail"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Пароль:</label>
                    <input
                        name="password"
                        type="password"
                        placeholder="**********"
                        pattern=".{8,12}" 
                        title=" Пароль должен быть от 8 до 12 символов"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Подтверждение пароля:</label>
                    <input
                        name="cnpassword"
                        type="password"
                        placeholder="**********"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Профессия:</label>
                    <input
                        name="skills"
                        type="text"
                        placeholder="Введите ключевые профессию"
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Регистрация</button>
            </form>
        </div>
    );
}
