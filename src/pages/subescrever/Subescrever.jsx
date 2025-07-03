import React, { useState } from "react";
import { subescreverSchema } from "../../components/validation/Schema";
import { createSubescerver } from "../../services/SubEscreverService";
import * as Yup from "yup";
import * as messages from "../../components/message/toastr";


const Subescrever = () => {
    //SALVAR
    const [subEscrever, setSubEscrever] = useState({
        email: "",
    });

    const { email } = subEscrever;
    const [errors, setErrors] = useState({});


    const handleChange = (e, errorMessage) => {
        setSubEscrever({ ...subEscrever, [e.target.name]: e.target.value });
        setErrors((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: errorMessage || "",
        }));
    };

    //Limpar Campos
    const handleClear = () => {
        setSubEscrever({
            email: "",
        });
        setErrors({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const subEscrever = {
            email,
        };
        try {
            subescreverSchema.validateSync(subEscrever, { abortEarly: false });
            const result = await createSubescerver(subEscrever);
            console.log(result);
            messages.mensagemSucesso("Salvo com sucesso!", result.data);
            // setSubEscrever(result.data)
            handleClear();
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
            <h4 className="widget_title">Newsletter</h4>
            <p>
                Deixe seu email e seja avisado de novas postagens exclusivo semanalmente.
            </p>
            <div className="form-group d-flex flex-row">
                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text"><i className="fa fa-envelope" aria-hidden="true"></i></div>
                        </div>
                        <input
                            type="email"
                            className="form-control"
                            id="inlineFormInputGroup"
                            placeholder="Enter email"
                            onfocus="this.placeholder = ''"
                            onblur="this.placeholder = 'Enter email'"
                            name="email"
                            value={email}
                            onChange={handleChange}
                        />
                          <button type="submit" >
                        <span className="bbtns">Enviar</span>
                    </button>
                    </div>
                    {errors.email && (
                        <div className="error-text">{errors.email}</div>
                    )}
                   
                </form>
            </div>
            <p className="text-bottom">
Você pode cancelar sua inscrição a qualquer momento
</p></div>
    )
}

export default Subescrever