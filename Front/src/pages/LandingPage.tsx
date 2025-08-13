import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FaUsers, FaUserMd, FaSearch, FaRegCalendarCheck } from 'react-icons/fa';
import { useEffect, useState } from "react";


const Navbar = () => (
    <nav className="bg-white shadow-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                <div className="flex-shrink-0">
                    <span className="font-bold text-2xl text-gray-800">TEA Connect</span>
                </div>
                <div className="hidden md:flex md:items-center md:space-x-8">
                    <a href="#inicio" className="text-gray-600 hover:text-red-600 font-medium">Início</a>
                    <a href="#sobre" className="text-gray-600 hover:text-red-600 font-medium">Sobre</a>
                    <a href="#profissionais" className="text-gray-600 hover:text-red-600 font-medium">Profissionais</a>
                    <a href="#contato" className="text-gray-600 hover:text-red-600 font-medium">Contato</a>
                </div>
                <div className="flex items-center space-x-2">
                    <Link to="/login" className="px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-300 rounded-full hover:bg-gray-100">Login</Link>
                    <Link to="/cadastro" className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-full hover:bg-red-700">Cadastre-se</Link>
                </div>
            </div>
        </div>
    </nav>
);

const heroImages = [
    "/img/1.webp",
    "/img/2.webp",
    "/img/3.webp"
    // Adicione mais imagens conforme desejar
];

const HeroSection = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        arrows: false,
        pauseOnHover: true
    };

    return (
        <section id="inicio" className="pt-24 bg-gray-50">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4">
                <div className="flex-1 mb-8 md:mb-0">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                        Conectando famílias e profissionais pelo bem-estar no espectro autista.
                    </h1>
                    <p className="text-lg text-gray-700 mb-6">
                        Encontre os melhores especialistas, agende consultas e tenha acesso a uma rede de apoio completa e humanizada.
                    </p>
                    <button className="bg-red-600 text-white px-6 py-3 rounded-full shadow hover:bg-red-700 transition">
                        Buscar profissionais
                    </button>
                </div>
                <div className="flex-1 flex justify-center mt-8">
                    <div className="w-full max-w-md">
                        <Slider {...settings}>
                            {heroImages.map((src, idx) => (
                                <div key={idx}>
                                    <img
                                        src={src}
                                        alt={`Ilustração ${idx + 1}`}
                                        className="w-full h-72 object-cover rounded-xl shadow-lg bg-gray-200"
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </section>
    );
};

const CarouselSection = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } }
        ]
    };
    
    const testimonials = [
        { quote: "Encontrei uma fonoaudióloga maravilhosa para meu filho. A plataforma facilitou tudo!", author: "Ana P., Mãe" },
        { quote: "Como psicólogo, a TEA Connect expandiu meu alcance e me conectou com famílias que realmente precisam de ajuda.", author: "Dr. Carlos S., Psicólogo" },
        { quote: "A 'Dica do Dia' é algo que eu espero toda manhã. Pequenos conselhos que fazem uma grande diferença.", author: "Mariana L., Cuidadora" },
        { quote: "Finalmente um lugar que centraliza profissionais qualificados e de confiança. Recomendo!", author: "Jorge M., Pai" }
    ];

    return (
        <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">O que nossa comunidade diz</h2>
                <Slider {...settings}>
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="px-4">
                            <div className="bg-gray-50 p-6 rounded-lg shadow-md h-48 flex flex-col justify-between">
                                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                                <p className="text-right font-semibold text-red-600 mt-4">- {testimonial.author}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
}

const HowItWorksSection = () => (
    <section id="sobre" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800">Como Funciona</h2>
                <p className="mt-2 text-gray-600">Simples, rápido e seguro.</p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                <div className="p-6">
                    <FaSearch className="text-5xl text-red-600 mx-auto mb-4"/>
                    <h3 className="text-xl font-semibold">1. Busque</h3>
                    <p className="mt-2 text-gray-600">Filtre por especialidade, localização e encontre o profissional ideal para suas necessidades.</p>
                </div>
                <div className="p-6">
                    <FaRegCalendarCheck className="text-5xl text-red-600 mx-auto mb-4"/>
                    <h3 className="text-xl font-semibold">2. Agende</h3>
                    <p className="mt-2 text-gray-600">Verifique a disponibilidade, escolha o melhor horário e agende sua consulta online ou presencial.</p>
                </div>
                <div className="p-6">
                    <FaUsers className="text-5xl text-red-600 mx-auto mb-4"/>
                    <h3 className="text-xl font-semibold">3. Conecte-se</h3>
                    <p className="mt-2 text-gray-600">Participe de uma comunidade acolhedora e tenha o suporte necessário para cada etapa da jornada.</p>
                </div>
            </div>
        </div>
    </section>
);

const StatisticsSection = () => {
    const [stats, setStats] = useState({
        profissionais: 0,
        pacientes: 0,
        consultas: 0,
        loading: true
    });

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await fetch("http://localhost:3000/api/estatisticas/home");
                const data = await res.json();
                setStats({
                    profissionais: data.quantidadeProfissionais || 0,
                    pacientes: data.quantidadePacientes || 0,
                    consultas: data.mediaAvaliacoes || 0,
                    loading: false
                });
            } catch {
                setStats(s => ({ ...s, loading: false }));
            }
        }
        fetchStats();
    }, []);

    return (
        <section className="w-full bg-gradient-to-r from-[#f8f8f8] to-[#ffffff] py-12">
            <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className="bg-white rounded-2xl shadow-lg flex flex-col items-center py-8 px-4">
                    <FaUserMd className="text-4xl text-red-500 mb-2" />
                    <span className="text-3xl font-bold text-gray-800">
                        {stats.loading ? "..." : stats.profissionais}
                    </span>
                    <span className="text-gray-500 mt-1">Profissionais</span>
                </div>
                <div className="bg-white rounded-2xl shadow-lg flex flex-col items-center py-8 px-4">
                    <FaUsers className="text-4xl text-emerald-500 mb-2" />
                    <span className="text-3xl font-bold text-gray-800">
                        {stats.loading ? "..." : stats.pacientes}
                    </span>
                    <span className="text-gray-500 mt-1">Usuários</span>
                </div>
                <div className="bg-white rounded-2xl shadow-lg flex flex-col items-center py-8 px-4">
                    <FaRegCalendarCheck className="text-4xl text-yellow-500 mb-2" />
                    <span className="text-3xl font-bold text-gray-800">
                        {stats.loading ? "..." : stats.consultas}
                    </span>
                    <span className="text-gray-500 mt-1">Média de avaliações</span>
                </div>
            </div>
        </section>
    );
};


export default function LandingPage() {
    return (
        <div className="bg-white">
            <Navbar />
            <main>
                <HeroSection />
                <CarouselSection />
                <HowItWorksSection />
                <StatisticsSection />
            </main>
        </div>
    );
}