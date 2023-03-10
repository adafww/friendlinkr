import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterStyle.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [firstPassword, setFirstPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [code, setCode] = useState('');
    const [codeId, setCodeId] = useState();
    const [image, setImage] = useState();
    const [isRedirect, setIsRedirect] = useState(false);

    useEffect(() => {   
        getCaptcha();
    }, []);

    if (isRedirect) {
        return <Navigate to="/login" />;
    }

    const getCaptcha = async () => {
        try {
            const response = await axios.get(
                `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/v1/account/register`
                );
            setCodeId(response.data.id);
            setImage(`data:image/png;base64,${response.data.image}`);
        } catch (error) {
            console.error(error); // здесь можно обработать ошибку
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/v1/account/register`
                , {
                email, passwd1: firstPassword, passwd2: secondPassword, firstName, lastName, code, captcha_id: codeId
            });
            if (response.status === 200) {
                setIsRedirect(true);
              }
            console.log(response.data); // здесь можно обработать ответ от бэкэнда
        } catch (error) {
            console.error(error); // здесь можно обработать ошибку
        }
    };

    return (
        <div className="register-page">
            <h2 className="register__title form__title">Зарегистрируйтесь</h2>
            <form className="register__form" onSubmit={handleSubmit}>
                <div className="register__form-group">
                    <label htmlFor="register-email">Email</label>
                    <input
                        type="email"
                        className="register__form-control"
                        id="register-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="register__form-group">
                    <label htmlFor="register-firstPassword">Пароль</label>
                    <input
                        type="password"
                        className="register__form-control"
                        id="register-firstPassword"
                        value={firstPassword}
                        onChange={(e) => setFirstPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="register__form-group">
                    <label htmlFor="register-secondPassword">Подтверждение пароля</label>
                    <input
                        type="password"
                        className="register__form-control"
                        id="register-secondPassword"
                        value={secondPassword}
                        onChange={(e) => setSecondPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="register__form-group">
                    <label htmlFor="register-firstName">Имя</label>
                    <input
                        type="text"
                        className="register__form-control"
                        id="register-firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="register__form-group">
                    <label htmlFor="register-lastName">Фамилия</label>
                    <input
                        type="text"
                        className="register__form-control"
                        id="register-lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                {image !== '' && (
                        <img src={image} alt="captcha" onClick={getCaptcha}/>
                    )}
                <div className="register__form-group">
                    <label htmlFor="register-code">Код с картинки</label>
                    <input
                        type="text"
                        className="register__form-control"
                        id="register-code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                    />
                </div>
                <div className="register__login__action">
                    <button type="submit" className="btn btn-primary">
                        Регистрация
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;