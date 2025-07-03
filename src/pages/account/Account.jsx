import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/auth';
import Header from '../../components/layouts/Header'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { getPerfilUserIdRelacionados } from '../../services/UsuarioService';
import EditAccount from './EditAccount';
import { useParams } from 'react-router-dom';

import bg from "../../assets/img/bg/bg.png"

const Account = () => {
    const { isAuthenticated, user } = useContext(AuthContext);
    const logado = user?.id;
    const { id } = useParams();


    const [verUsuario, setVerUsuario] = React.useState({});


    useEffect(() => {
        PerfilUser();
    }, [id]);

    const PerfilUser = async () => {
        // Agora você pode usar o id capturado para obter os dados do perfil do usuário
        await getPerfilUserIdRelacionados(id).then((response) => {
            setVerUsuario(response.data);
            console.log(response.data, "Perfil");
        });
    };


    //
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    //
    const defaultImageUrl = 'https://bootdey.com/img/Content/avatar/avatar6.png';

    // Verifica se a URL da imagem está definida
    const imgUrl = verUsuario?.imgURL ? `${verUsuario.imgURL}` : defaultImageUrl;

    //
    return (
        <div>
            <Header />
            {/*  */}
            <br />
            <br />
            <br />
            <br />
            <div>
                <div className="container bootdey">
                    <div className="content-page">
                        {/* <div className="profile-banner" style="background:url(https://bootdey.com/img/Content/bg1.jpg);"> */}
                        <div className="profile-banner" style={{ backgroundImage: `url(${bg})` }}>
                            <div className="col-sm-3 avatar-container">
                                <img src={imgUrl} className="img-circle profile-avatar" alt="User avatar" />
                            </div>
                            {/* <div className="col-sm-12 profile-actions text-right">
                                <button type="button" className="btn btn-success btn-sm"><i className="fa fa-check"></i> Friends</button>
                                <button type="button" className="btn btn-primary btn-sm"><i className="fa fa-envelope"></i> Send Message</button>
                            </div> */}
                        </div>
                        <div className="content">

                            <div className="row">
                                <div className="col-sm-3">
                                    {/* <!-- Begin user profile --> */}
                                    <div className="text-center user-profile-2" style={{ marginTop: '120px' }}>
                                        <ul className="list-group">
                                            <li className="list-group-item">
                                                <h4>Howdy, <b>Jane Doe</b></h4>
                                                <h5>Administrator</h5>
                                            </li>
                                            <li className="list-group-item">
                                                <span className="badge">1,245</span>
                                                Comentarios
                                            </li>
                                            <li className="list-group-item">
                                                <span className="badge">245</span>
                                                Respostas
                                            </li>
                                            {/* <li className="list-group-item">
                                                <span className="badge">1,245</span>
                                                Tweets
                                            </li> */}
                                        </ul>

                                        {/* <!-- User button --> */}
                                        <div className="user-button">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <button type="button" className="btn btn-primary btn-sm btn-block"  onClick={handleClickOpen}><i className="fa fa-envelope"></i> Editar</button>
                                                </div>
                                                {/* <div className="col-lg-6">
                                                    <button type="button" className="btn btn-default btn-sm btn-block"><i className="fa fa-user"></i> Add as friend</button>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-9">
                                    <div className="widget widget-tabbed">
                                        <ul className="nav nav-tabs nav-justified">
                                            <li><a href="#about" data-toggle="tab"><i className="fa fa-user"></i>Sobre</a></li>
                                            <li><a href="#user-activities" data-toggle="tab"><i className="fa fa-laptop"></i> Comentarios</a></li>
                                            <li><a href="#mymessage" data-toggle="tab"><i className="fa fa-envelope"></i> Respostas</a></li>
                                        </ul>

                                        <div className="tab-content">
                                            {/* <div className="tab-pane animated fadeInRight" id="about"> */}
                                            <div className="tab-pane animated" id="about">
                                                <div className="user-profile-content">
                                                    <h5><strong>ABOUT</strong> ME</h5>
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                                                    </p>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <h5><strong>CONTACT</strong> ME</h5>
                                                            <address>
                                                                <strong>Phone</strong><br />
                                                                <abbr title="Phone">+62 857 123 4567</abbr>
                                                            </address>
                                                            <address>
                                                                <strong>Email</strong><br />
                                                                <a href="mailto:#">first.last@example.com</a>
                                                            </address>
                                                            <address>
                                                                <strong>Website</strong><br />
                                                                <a href="http://r209.com">http://r209.com</a>
                                                            </address>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <h5><strong>MY</strong> SKILLS</h5>
                                                            <p>UI Design</p>
                                                            <p>Clean and Modern Web Design</p>
                                                            <p>PHP and MySQL Programming</p>
                                                            <p>Vector Design</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>




                                            <div className="tab-pane animated" id="user-activities">
                                                {/* <div className="tab-pane animated fadeInRight" id="user-activities"> */}
                                                <div className="scroll-user-widget">
                                                    <ul className="media-list">
                                                        <li className="media">
                                                            <a href="#fakelink">
                                                                <p><strong>John Doe</strong> Uploaded a photo <strong>"DSC000254.jpg"</strong>
                                                                    <br /><i>2 minutes ago</i></p>
                                                            </a>
                                                        </li>
                                                        <li className="media">
                                                            <a href="#fakelink">
                                                                <p><strong>John Doe</strong> Created an photo album  <strong>"Indonesia Tourism"</strong>
                                                                    <br /><i>8 minutes ago</i></p>
                                                            </a>
                                                        </li>
                                                        <li className="media">
                                                            <a href="#fakelink">
                                                                <p><strong>Annisa</strong> Posted an article  <strong>"Yogyakarta never ending Asia"</strong>
                                                                    <br /><i>an hour ago</i></p>
                                                            </a>
                                                        </li>
                                                        <li className="media">
                                                            <a href="#fakelink">
                                                                <p><strong>Ari Rusmanto</strong> Added 3 products
                                                                    <br /><i>3 hours ago</i></p>
                                                            </a>
                                                        </li>
                                                        <li className="media">
                                                            <a href="#fakelink">
                                                                <p><strong>Hana Sartika</strong> Send you a message  <strong>"Lorem ipsum dolor..."</strong>
                                                                    <br /><i>12 hours ago</i></p>
                                                            </a>
                                                        </li>
                                                        <li className="media">
                                                            <a href="#fakelink">
                                                                <p><strong>Johnny Depp</strong> Updated his avatar
                                                                    <br /><i>Yesterday</i></p>
                                                            </a>
                                                        </li>
                                                        <li className="media">
                                                            <a href="#fakelink">
                                                                <p><strong>John Doe</strong> Uploaded a photo <strong>"DSC000254.jpg"</strong>
                                                                    <br /><i>2 minutes ago</i></p>
                                                            </a>
                                                        </li>
                                                        <li className="media">
                                                            <a href="#fakelink">
                                                                <p><strong>John Doe</strong> Created an photo album  <strong>"Indonesia Tourism"</strong>
                                                                    <br /><i>8 minutes ago</i></p>
                                                            </a>
                                                        </li>
                                                        <li className="media">
                                                            <a href="#fakelink">
                                                                <p><strong>Annisa</strong> Posted an article  <strong>"Yogyakarta never ending Asia"</strong>
                                                                    <br /><i>an hour ago</i></p>
                                                            </a>
                                                        </li>
                                                        <li className="media">
                                                            <a href="#fakelink">
                                                                <p><strong>Ari Rusmanto</strong> Added 3 products
                                                                    <br /><i>3 hours ago</i></p>
                                                            </a>
                                                        </li>
                                                        <li className="media">
                                                            <a href="#fakelink">
                                                                <p><strong>Hana Sartika</strong> Send you a message  <strong>"Lorem ipsum dolor..."</strong>
                                                                    <br /><i>12 hours ago</i></p>
                                                            </a>
                                                        </li>
                                                        <li className="media">
                                                            <a href="#fakelink">
                                                                <p><strong>Johnny Depp</strong> Updated his avatar
                                                                    <br /><i>Yesterday</i></p>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            {/* <div className="tab-pane animated fadeInRight" id="mymessage"> */}
                                            <div className="tab-pane animated" id="mymessage">
                                                <div className="scroll-user-widget">
                                                    <ul className="media-list">
                                                        <li className="media">
                                                            <a className="pull-left" href="#fakelink">
                                                                <img className="media-object user-message" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Avatar" />
                                                            </a>
                                                            <div className="media-body">
                                                                <h4 className="media-heading"><a href="#fakelink">John Doe</a> <small>Just now</small></h4>
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                                                            </div>
                                                        </li>
                                                        <li className="media">
                                                            <a className="pull-left" href="#fakelink">
                                                                <img className="media-object user-message" src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="Avatar" />
                                                            </a>
                                                            <div className="media-body">
                                                                <h4 className="media-heading"><a href="#fakelink">Annisa</a> <small>Yesterday at 04:00 AM</small></h4>
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam rhoncus</p>
                                                            </div>
                                                        </li>
                                                        <li className="media">
                                                            <a className="pull-left" href="#fakelink">
                                                                <img className="media-object user-message" src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="Avatar" />
                                                            </a>
                                                            <div className="media-body">
                                                                <h4 className="media-heading"><a href="#fakelink">Rusmanovski</a> <small>January 17, 2014 05:35 PM</small></h4>
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                                                            </div>
                                                        </li>
                                                        <li className="media">
                                                            <a className="pull-left" href="#fakelink">
                                                                <img className="media-object user-message" src="https://bootdey.com/img/Content/avatar/avatar4.png" alt="Avatar" />
                                                            </a>
                                                            <div className="media-body">
                                                                <h4 className="media-heading"><a href="#fakelink">Ari Rusmanto</a> <small>January 17, 2014 05:35 PM</small></h4>
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                                                            </div>
                                                        </li>
                                                        <li className="media">
                                                            <a className="pull-left" href="#fakelink">
                                                                <img className="media-object user-message" src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="Avatar" />
                                                            </a>
                                                            <div className="media-body">
                                                                <h4 className="media-heading"><a href="#fakelink">Jenny Doe</a> <small>January 17, 2014 05:35 PM</small></h4>
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                                                            </div>
                                                        </li>
                                                        <li className="media">
                                                            <a className="pull-left" href="#fakelink">
                                                                <img className="media-object user-message" src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="Avatar" />
                                                            </a>
                                                            <div className="media-body">
                                                                <h4 className="media-heading"><a href="#fakelink">John Doe</a> <small>Just now</small></h4>
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                                                            </div>
                                                        </li>
                                                        <li className="media">
                                                            <a className="pull-left" href="#fakelink">
                                                                <img className="media-object user-message" src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="Avatar" />
                                                            </a>
                                                            <div className="media-body">
                                                                <h4 className="media-heading"><a href="#fakelink">Annisa</a> <small>Yesterday at 04:00 AM</small></h4>
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam rhoncus</p>
                                                            </div>
                                                        </li>
                                                        <li className="media">
                                                            <a className="pull-left" href="#fakelink">
                                                                <img className="media-object user-message" src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="Avatar" />
                                                            </a>
                                                            <div className="media-body">
                                                                <h4 className="media-heading"><a href="#fakelink">Rusmanovski</a> <small>January 17, 2014 05:35 PM</small></h4>
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                                                            </div>
                                                        </li>
                                                        <li className="media">
                                                            <a className="pull-left" href="#fakelink">
                                                                <img className="media-object user-message" src="https://bootdey.com/img/Content/avatar/avatar4.png" alt="Avatar" />
                                                            </a>
                                                            <div className="media-body">
                                                                <h4 className="media-heading"><a href="#fakelink">Ari Rusmanto</a> <small>January 17, 2014 05:35 PM</small></h4>
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                                                            </div>
                                                        </li>
                                                        <li className="media">
                                                            <a className="pull-left" href="#fakelink">
                                                                <img className="media-object user-message" src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="Avatar" />
                                                            </a>
                                                            <div className="media-body">
                                                                <h4 className="media-heading"><a href="#fakelink">Jenny Doe</a> <small>January 17, 2014 05:35 PM</small></h4>
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    // fullWidth
                    >
                        <DialogContent>
                            <EditAccount id={id}/>
                        </DialogContent>
                    </Dialog>
        </div>
    )
}

export default Account