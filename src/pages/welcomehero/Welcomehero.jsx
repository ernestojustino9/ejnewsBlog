import React, { useEffect, useMemo, useState } from 'react'
import { getBanners } from '../../services/BannerService';
import Particles from 'react-tsparticles';

const Welcomehero = () => {
    const [banner, setBanner] = useState([]);

    useEffect(() => {
        getAllBanners();
    }, []);

    //   //LISTAR
    const getAllBanners = () => {
        getBanners()
            .then((response) => {
                setBanner(response.data.data);
                console.log(response.data.data, "BANNER")
            })
            .catch((error) => {
                messages.mensagemErro(error);
            });
    };
    //  
    const particlesInit = (main) => {
        console.log(main)
    }
    const particlesLoaded = (container) => {
        console.log(container)
    }
    //
    const options = useMemo(
        () => ({
            // background: {
            //     color: {
            //         value: "#0d47a1",
            //     },
            // },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: "push",
                    },
                    onHover: {
                        enable: true,
                        mode: "repulse",
                    },
                },
                modes: {
                    push: {
                        quantity: 4,
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4,
                    },
                },
            },
            particles: {
                color: {
                    value: "#ffffff",
                },
                links: {
                    color: "#ffffff",
                    distance: 150,
                    enable: true,
                    opacity: 0.5,
                    width: 1,
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                        default: "bounce",
                    },
                    random: false,
                    speed: 6,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                    },
                    value: 80,
                },
                opacity: {
                    value: 0.5,
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 1, max: 5 },
                },
            },
            detectRetina: true,
        }),
        [],
    );
    //
    return (
        <div>
            {banner.map((ba) => (
                <div key={ba.id} >
                    <section id="welcome-hero" className="welcome-hero" style={{ backgroundImage: `url(${ba.imgURL})` }}>
                        <Particles
                            id="tsparticles"
                            // particlesLoaded={particlesLoaded}
                            init={particlesInit}
                            loaded={particlesLoaded}
                            options={options}
                        />
                      </section>
                </div>
            ))}
        </div>
    )
}
export default Welcomehero