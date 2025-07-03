import React, { useContext, useState } from 'react'
import * as messages from "../../components/message/toastr";
import { AuthContext } from '../../contexts/auth';
import { Link } from 'react-router-dom';


const Login = () => {
    const { login } = useContext(AuthContext);
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const handleChange = ({ currentTarget: input }) => {
        const { name, value } = input;
        setValues({ ...values, [name]: value });
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            login(values);
        } catch (error) {
            messages.mensagemErro(error, "Ocorreu um erro. Tente novamente!")
        }
    };
    //
    return (
        <div>
            <div className="form-input-content">
                {/* <div className="card login-form mb-0"> */}
                <div >
                    <div className="card-body pt-5" style={{ textAlign: "center" }}>
                        <a className="text-center" href="#"> <h4>EJ-Developer</h4></a>

                        <form className="mt-5 mb-5 login-input" onSubmit={handleLogin}>
                            <div className="form-group">
                                <input type="email" className="form-control" placeholder="Email"
                                    name='email'
                                    // value={email}
                                    onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Password"
                                    name="password"
                                    // value={password}
                                    onChange={handleChange} />
                            </div>
                            <button className="btn primary_btn w-100">Entrar</button>
                        </form>
                       
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Login