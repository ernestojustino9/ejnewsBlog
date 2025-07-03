import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/layouts/Header'
import usePagination from "../../components/pagination/Pagination";
import { AuthContext } from '../../contexts/auth'
import { getNoticias } from '../../services/BlogService'
import { Link } from 'react-router-dom';
import { getCategorias } from '../../services/CategoriaService';
import { Pagination } from '@mui/material';
import Subescrever from '../subescrever/Subescrever';

const Blog = () => {
    const { isAuthenticated, user } = useContext(AuthContext);
    const logado = user?.id;

    const [noticias, setNoticias] = useState([]);
    const [categorias, setCategorias] = useState([]);

    //PAGINACAO
    let [page, setPage] = useState(1);
    const PER_PAGE = 5;

    const count = Math.ceil(noticias.length / PER_PAGE);
    const _DATA = usePagination(noticias, PER_PAGE);

    const [seletedNoticias, setSeletedNoticias] = useState([]);
    const [loading, setLoading] = useState(true);

    //PESQUISAR
    const [search, setSearch] = useState("");
    const [searchFilterNoticias, setSearchFilterNoticias] = useState("");

    const handleFilter = (e) => {
        const searchgWord = e.target.value
        const newFilter = noticias.filter((value) => {
            return value.titulo.toLowerCase().includes(searchgWord.toLowerCase())
        });
        if (searchgWord === "") {
            setSearchFilterNoticias([]);
            setSearch("");
        } else {
            setSearchFilterNoticias(newFilter);
            setSearch(e.target.value);
        }
    }

    // 
    useEffect(() => {
        getAllNoticias();
        getAllCategorias();
    }, []);

    //LISTAR
    const getAllNoticias = async () => {
        await getNoticias()
            .then((response) => {
                setNoticias(response.data);
                filtrarNoticias(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getAllCategorias = async () => {
        await getCategorias()
            .then((response) => {
                setCategorias(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // Filtrar por Noticias
    const filtrarNoticias = (data) => {
        const uniqueNoticias = [
            ...new Set(data.map((no) => no.titulo)),
        ];
        setSeletedNoticias(uniqueNoticias);
        // console.log(uniqueNoticias, "Noticia selecionada");
    };



    const meses = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
    ];
    //
    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };

    //
    return (
        <div>
            <Header />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            {loading ?
                <div className="center-body">
                    <div className="spinner"></div>
                </div>
                :
                <section className="blog_area">
                    <div className="container">
                        <div className="row bgCategoriaNoticia">
                            <div className="col-lg-8">
                                <div className="blog_left_sidebar">
                                    {/* {JSON.stringify(noticias, null, 2)} */}
                                    {_DATA
                                        .currentData()
                                        .filter((row) => {
                                            const descricao = row.descricao
                                                .toLowerCase()
                                                .includes(search.toLocaleLowerCase());
                                            if (search === 0) {
                                                return row;
                                            } else if (descricao) {
                                                return row;
                                            }
                                        }).map((noticia) => (
                                            <article className="row blog_item" key={noticia.id}>
                                                <div className="col-md-3">
                                                    <div className="blog_info text-right">
                                                        <ul className="blog_meta list">
                                                            <li><a href="#">Publicado por {noticia.user.nome}<i className="fa fa-user"></i></a></li>
                                                            <li><a href="#">
                                                                {`${new Date(
                                                                    noticia.createdAt
                                                                ).getDate()} de ${meses[
                                                                new Date(
                                                                    noticia.createdAt
                                                                ).getMonth()
                                                                ]
                                                                    }, ${new Date(
                                                                        noticia.createdAt
                                                                    ).getFullYear()}`}
                                                                <i className="fa fa-calendar"></i></a></li>
                                                            {/* <li><a href="#">1.2M Views<i className="fa fa-eye"></i></a></li> */}
                                                            <li><a href="#"> Comentarios<i className="fa fa-bubble"></i></a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-md-9">
                                                    <div className="blog_post">
                                                        <img src={`${noticia.imgURL}`} alt={noticia.imgURL} />
                                                        <div className="blog_details">
                                                            <h2>{noticia.titulo}</h2>
                                                            <p style={{ wordBreak: 'break-word' }} dangerouslySetInnerHTML={{ __html: noticia.descricao.substring(0, 300) }}>
                                                            </p>
                                                            <Link to={`/viewBlog/${noticia.slug}`}> <span className='lerMais'>   Ler Mais ...</span></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </article>
                                        ))}





                                    {/*  */}
                                    <nav className="blog-pagination justify-content-center d-flex">
                                        <ul className="pagination">
                                            <li className="page-item">
                                                <Pagination
                                                    count={count}
                                                    size="small"
                                                    // className="page-link"
                                                    page={page}
                                                    variant="text"
                                                    color="primary"
                                                    shape="circular"
                                                    onChange={handleChange}
                                                />
                                                {/*  */}
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="blog_right_sidebar">
                                    {/*  */}

                                    <aside className="single_sidebar_widget search_widget">
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Pesquisar noticias"
                                                onChange={handleFilter}

                                            />
                                            {/*  */}
                                            {searchFilterNoticias.length != 0 && (
                                                <div className='dataResult'>
                                                    {searchFilterNoticias.slice(0, 15).map((list) => {
                                                        return <div key={list.id}>
                                                            <Link
                                                                to={`/viewBlog/${list.slug}`}
                                                                className='dataItem'>

                                                                <p><img src={`${list.imgURL}`} style={{ borderRadius: '50%' }} width="50px" alt={list.imgURL} />{list.titulo.substring(0, 50)}</p>
                                                            </Link>
                                                        </div>
                                                    })}
                                                </div>)}
                                            {/*  */}
                                        </div>
                                        {/* <!-- /input-group --> */}
                                        <div className="br"></div>
                                    </aside>
                                    {/*  */}


                                    <aside className="single_sidebar_widget post_category_widget">
                                        <h4 className="widget_title">Categorias</h4>
                                        {categorias.map((cat) => (
                                            <ul className="list cat-list">
                                                <li>
                                                    <Link to={`/categoriaNoticia/${cat.id}`} className="d-flex justify-content-between">
                                                        {cat.amountNoticias === 0 || cat.descricao === 1 ? "" : <><p>{cat.descricao}</p>
                                                            <p>{cat.amountNoticias}</p></>}
                                                    </Link>
                                                </li>
                                            </ul>
                                        ))}

                                    </aside>
                                    <aside className="single-sidebar-widget newsletter_widget">
                                        <Subescrever />
                                        <div className="br"></div>
                                    </aside>
                                    {/* <aside className="single-sidebar-widget tag_cloud_widget">
                                        <h4 className="widget_title">Tag Clouds</h4>
                                        <ul className="list">
                                            <li><a href="#">Technology</a></li>
                                            <li><a href="#">Fashion</a></li>
                                            <li><a href="#">Architecture</a></li>
                                            <li><a href="#">Fashion</a></li>
                                            <li><a href="#">Food</a></li>
                                            <li><a href="#">Technology</a></li>
                                            <li><a href="#">Lifestyle</a></li>
                                            <li><a href="#">Art</a></li>
                                            <li><a href="#">Adventure</a></li>
                                            <li><a href="#">Food</a></li>
                                            <li><a href="#">Lifestyle</a></li>
                                            <li><a href="#">Adventure</a></li>
                                        </ul>
                                    </aside> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>}
        </div>
    )
}

export default Blog