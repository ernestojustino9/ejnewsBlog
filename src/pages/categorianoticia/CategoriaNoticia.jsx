import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/layouts/Header'
import img from "../../assets/img/about/Logotipo.jpg"
import usePagination from "../../components/pagination/Pagination";
import { Pagination } from '@mui/material';
import { AuthContext } from '../../contexts/auth';
import { Link, useParams } from 'react-router-dom';
import { getCategoriaNoticiaId } from '../../services/CategoriaService';
import Subescrever from '../subescrever/Subescrever';
import { getNoticias } from '../../services/BlogService';
import { getCategorias } from '../../services/CategoriaService';

const CategoriaNoticia = () => {

    const { isAuthenticated, user } = useContext(AuthContext);
    const logado = user?.id;

    const { categoriaId } = useParams();

    const [categoriaNoticia, setCategoriaNoticia] = useState([]);
    const [noticias, setNoticias] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [seletedNoticias, setSeletedNoticias] = useState([]);
    const [loading, setLoading] = useState(true);

    //PAGINACAO
    let [page, setPage] = useState(1);
    const PER_PAGE = 10;


    //PESQUISAR
    const [searchFilterCategoriasNoticias, setSearchFilterCategoriasNoticias] = useState("");
    const [search, setSearch] = useState("");

    const count = Math.ceil(categoriaNoticia.length / PER_PAGE);
    const _DATA = usePagination(categoriaNoticia, PER_PAGE);


    //
    useEffect(() => {
        viewCategoriaNoticia();
        getAllNoticias();
        getAllCategorias();
    }, []);


    //LISTAR
    const getAllNoticias = async () => {
        await getNoticias()
            .then((response) => {
                setNoticias(response.data);
                //    setLoading(false);
            })
            .catch((error) => {
                messages.mensagemErro(error);
            });
    };

    const getAllCategorias = async () => {
        await getCategorias()
            .then((response) => {
                setCategorias(response.data);
                // setLoading(false);
            })
            .catch((error) => {
                messages.mensagemErro(error);
            });
    };

    const viewCategoriaNoticia = () => {
        if (categoriaId) {
            getCategoriaNoticiaId(categoriaId).then((response) => {
                setCategoriaNoticia(response.data.noticias);
                filtrarNoticias(response.data.noticias);
                console.log(response.data.noticias, "Dados Categoria Noticia");
            });
        }



    };
    // 




    const handleFilter = (e) => {
        const searchgWord = e.target.value
        const newFilter = categoriaNoticia.filter((value) => {
            return value.slug.toLowerCase().includes(searchgWord.toLowerCase())
        });
        if (searchgWord === "") {
            setSearchFilterCategoriasNoticias([]);
            setSearch("");
        } else {
            setSearchFilterCategoriasNoticias(newFilter);
            setSearch(e.target.value);
        }
    }




    // Filtrar por Noticias
    const filtrarNoticias = (data) => {
        const uniqueNoticias = [
            ...new Set(data.map((no) => no.slug)),
        ];
        setSeletedNoticias(uniqueNoticias);
        console.log(uniqueNoticias, "Noticia selecionada");
    };




    //
    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
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
    return (
        <div>
            <Header />
            {/* <!--================Blog Categorie Area =================--> */}
            <section className="blog_area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <section className="blog_categorie_area section_gap_top">
                                <div className="container">
                                    <div className="row bgCategoriaNoticia">
                                        {_DATA
                                            .currentData()
                                            .filter((row) => {
                                                const titulo = row.titulo
                                                    .toLowerCase()
                                                    .includes(search.toLocaleLowerCase());
                                                if (search === 0) {
                                                    return row;
                                                } else if (titulo) {
                                                    return row;
                                                }
                                            }).map((catNot) => (
                                                <div className="col-lg-4" key={catNot.id}>
                                                    <div className="categories_post">
                                                        <img src={`${catNot.imgURL}`} alt="post" />
                                                        <div className="categories_details">
                                                            <div className="categories_text">
                                                                <Link to={`/viewBlog/${catNot.slug}`}><p style={{ color: "#fff", textTransform: "capitalize" }}>{catNot.slug}</p></Link>
                                                                <div className="border_line"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}


                                    </div>
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
                            </section>
                        </div>
                        {/*  */}
                        <div className="col-lg-4 section_gap_top">
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
                                        {searchFilterCategoriasNoticias.length != 0 && (
                                            <div className='dataResult'>
                                                {searchFilterCategoriasNoticias.slice(0, 15).map((list) => {
                                                    return <div key={list.id}>
                                                        <Link
                                                            to={`/viewBlog/${list.slug}`}
                                                            className='dataItem'>
                                                            <p>{list.slug}</p>
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
            </section>
            {/*  */}


            {/* <!--================Blog Categorie Area =================--> */}
        </div>
    )
}

export default CategoriaNoticia