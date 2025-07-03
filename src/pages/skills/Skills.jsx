import React, { useEffect, useState } from "react";
import * as messages from "../../components/message/toastr";
import { getSkills } from "../../services/SkillService";

const Skills = () => {
    const [skill, setSkill] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllSkills();
    }, []);

    //   //LISTAR
    const getAllSkills = () => {
        getSkills()
            .then((response) => {
                setSkill(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                messages.mensagemErro(error);
            });
    };
    //   //
    return (
        <div>
            {skill.length === "" ?

               ""
               :
               <section id="skills" className="skills">
               <div className="skill-content">
                   <div className="section-heading text-center">
                       <h2>skills</h2>
                   </div>
                   <div className="container">
                       <div className="row">
                           {skill.map((ski) => (
                            //    <div className="col-md-6">
                               <div className="col-md-3">

                                   <div className="single-skill-content">

                                       <div className="barWrapper" key={ski.id}>
                                           <span className="progressText">{ski.descricao}
                                               <i className='fa fa-springboot'></i></span>
                                           <div className="single-progress-txt">
                                               {/* <div className="progress ">
                                                   <div className="progress-bar" role="progressbar" aria-valuenow="90"
                                                       aria-valuemin="10" aria-valuemax="100">

                                                   </div>
                                               </div> */}
                                               {/* <h3>30%</h3> */}
                                           </div>
                                       </div>
                                   </div>

                               </div>
                           ))}
                       </div>
                   </div>

               </div>

           </section>
              

            }

        </div>
    )
}

export default Skills