import React, { useState } from 'react'
import * as Yup from "yup";
import * as messages from "../../components/message/toastr";
import { Link } from 'react-router-dom'
import { registroSchema } from '../../components/validation/Schema';
import { createUser } from '../../services/UsuarioService';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

const Register = () => {

    //SALVAR
    const [usuario, setUsuario] = useState({
        nome: "",
        email: "",
        telefone: "",
        password: "",
    });

    const { nome, email, password } = usuario;
    const [telefone, setTelefone] = useState('');

    const [errors, setErrors] = useState({});

    // 
    const handleChange = (e, errorMessage) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
        setErrors((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: errorMessage || "",
        }));
    };
    // 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const usuario = {
            nome, email, telefone, password
        };
        try {
            registroSchema.validateSync(usuario, { abortEarly: false });
            const { data } = await createUser(usuario);
            if (data) {
                messages.mensagemSucesso("Conta criada com sucesso!");
            }
        } catch (error) {
            console.log(error.message);
            if (error instanceof Yup.ValidationError) {
                const validationErrors = {};
                error.inner.forEach((e) => {
                    validationErrors[e.path] = e.message;
                });
                setErrors(validationErrors);
            } else {
                messages.mensagemErro("Ocorreu um erro. Tente novamente!");
            }
        }
    };

    return (
        <div>
            <div className="form-input-content">
                {/* <div className="card login-form mb-0"> */}
                <div >
                    <div className="card-body pt-5" style={{ textAlign: "center" }}>
                        <a className="text-center" href="#"> <h4>EJ-Developer</h4></a>
{/*  */}
                        <form className="mt-5 mb-5 login-input" onSubmit={handleSubmit}>
                        {/* <form className="mt-3 mb-3 login-input" onSubmit={handleSubmit}> */}
                            <div className="form-group">
                                <input type="text"
                                    className="form-control"
                                    placeholder="Nome"
                                    name='nome'
                                    value={nome}
                                    onChange={handleChange} />
                                {errors.nome && (
                                    <div className="error-text">{errors.nome}</div>
                                )}
                            </div>
                            <div className="form-group">
                                <input type="email" className="form-control" placeholder="Email"
                                    name='email'
                                    value={email}
                                    onChange={handleChange} />
                                {errors.email && (
                                    <div className="error-text">{errors.email}</div>
                                )}
                            </div>

                            <div className="form-group">
                                <PhoneInput
                                    defaultCountry="ao"
                                    // inputClass="form-control"
                                    disableSearchIcon={true}
                                    disableDropdown={true}
                                    inputStyle={{

                                        width: "100%",
                                        outline: "none",
                                    }}
                                    value={telefone}
                                    onChange={(telefone) => setTelefone(telefone)}
                                />
                                {errors.telefone && (
                                    <div className="error-text">{errors.telefone}</div>
                                )}
                            </div>

                            <div className="form-group">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    name="password"
                                    value={password}
                                    onChange={handleChange} />
                                {errors.password && (
                                    <div className="error-text">{errors.password}</div>
                                )}
                            </div>
                            <button className="btn primary_btn w-100">Criar conta</button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Register