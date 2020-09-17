import React from 'react';
import { useForm } from 'react-hook-form';
import { EMAIL_REGEX } from "../constants";
import logo from '../../logo.svg';

function Login(props) {
    const { register, handleSubmit, errors } = useForm();
    const pattern = new RegExp(EMAIL_REGEX);

    const loginFormSubmit = (data, e) => {
        e.preventDefault();
        const login = {
            email: data.email,
            password: data.password
        };

        console.log(login)
    };

    const isFormatCorrect = (email) => pattern.test(email);

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
                                ref={register({ required: true })}
                            />
                            { errors.password && (<p className="tag is-warning">La contraseña es requerida</p>) }
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button className="button" type="submit">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Login