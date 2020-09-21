import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { EMAIL_REGEX } from "../constants";
import logo from '../../logo.svg';
import { useLazyQuery } from 'react-apollo';
import { LOGIN } from "../constantsGQL";
import { AUTH_TOKEN, USER } from "../constants";
import { simpleError } from "../common/SweetAlert";

function Login(props) {
    const { register, handleSubmit, errors } = useForm();
    const pattern = new RegExp(EMAIL_REGEX);
    const [login, { loading, data, error }] = useLazyQuery(LOGIN);
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = e => {
        const { name, value } = e.target;
        setLoginForm({...loginForm, [name]: value});
    };

    const loginFormSubmit = (data, e) => {
        e.preventDefault();
        const loginData = {
            email: data.email,
            password: data.password
        };

        login({
            variables: loginData
        });

    };

    const isFormatCorrect = (email) => pattern.test(email);

    if (data && data.login.token) {
        sessionStorage.setItem(AUTH_TOKEN, data.login.token);
        const user = {
            completeName: data.login.completeName,
            email: data.login.email
        };
        sessionStorage.setItem(USER, JSON.stringify(user));
        props.history.push(`/`);
        window.location.reload();
    }

    /*if (data && data.login.errors) {
        simpleError(data.login.errors.message);
    }*/

    return (
        <form onSubmit={handleSubmit(loginFormSubmit)}>
            <div className="login columns">
                <div className="column is-offset-4 is-4 is-offset-4">
                    <figure>
                        <img src={logo} alt={"logo"}/>
                    </figure>
                    <div className="field">
                        <div className="control">
                            <input
                                className="input"
                                name="email"
                                type="text"
                                placeholder="email@domain.com"
                                onChange={ handleInputChange }
                                ref={register({
                                    required: true,
                                    validate: isFormatCorrect
                                })}
                            />
                            { errors.email && (<p className="tag is-warning">El email es requerido</p>) }
                            {
                                errors.email && errors.email.type === "validate" &&
                                (
                                    <p className="tag is-warning">El email tiene un formato incorrecto</p>
                                )
                            }
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <input
                                className="input"
                                name="password"
                                type="password"
                                placeholder="Contraseña"
                                onChange={ handleInputChange }
                                ref={register({ required: true })}
                            />
                            { errors.password && (<p className="tag is-warning">La contraseña es requerida</p>) }
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button className="button" type="submit">Login</button>
                            {
                                data && data.login.errors && <p className="tag is-danger">Usuario inválido</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Login