"use client";
import React, { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CurrencyEuroIcon,
  NewspaperIcon,
  UsersIcon,
  XCircleIcon,
  BanIcon,
  ShieldCheckIcon,
  PencilAltIcon,
  CheckCircleIcon,
} from "@heroicons/react/outline"; // Importing Heroicons

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const LandingPage = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const featuresRef = useRef<HTMLDivElement | null>(null);
  const demoRef = useRef<HTMLDivElement | null>(null);
  const testimonialsRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 50,
        behavior: "smooth",
      });
    }
  };

  function SpinningCoin() {
    const { scene } = useGLTF("/mario_coin.glb"); // Load the coin model
    return <primitive object={scene} scale={2} />;
  }

  const handleLaunchApp = () => {
    router.push("/"); // Redirect to the homepage
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const firstChild = carouselRef.current.firstChild as HTMLElement;
        if (firstChild) {
          carouselRef.current.scrollBy({
            left: firstChild.clientWidth + 24, // Adding 24px for margin
            behavior: "smooth",
          });

          // Restart the scroll when the last item is out of view
          if (
            carouselRef.current.scrollLeft + carouselRef.current.clientWidth >=
            carouselRef.current.scrollWidth
          ) {
            setTimeout(() => {
              carouselRef.current?.scrollTo({ left: 0, behavior: "smooth" });
            }, 1000);
          }
        }
      }
    }, 3000); // Move every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Handle manual mouse drag for the carousel
  let isDown = false;
  let startX: number;
  let scrollLeft: number;

  const mouseDownHandler = (e: React.MouseEvent) => {
    if (carouselRef.current) {
      isDown = true;
      startX = e.pageX - carouselRef.current.offsetLeft;
      scrollLeft = carouselRef.current.scrollLeft;
    }
  };

  const mouseLeaveHandler = () => {
    isDown = false;
  };

  const mouseUpHandler = () => {
    isDown = false;
  };

  const mouseMoveHandler = (e: React.MouseEvent) => {
    if (!isDown || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scroll speed
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="bg-gray-50 font-sans">
      {/* Navigation Bar */}
      <nav className="bg-white fixed w-full z-10 shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">
            The Simple Newspaper
          </div>
          <div className="hidden md:flex space-x-6 items-center">
            <button
              onClick={() => scrollToSection(heroRef)}
              className="cursor-pointer text-gray-600 hover:text-blue-600"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection(featuresRef)}
              className="cursor-pointer text-gray-600 hover:text-blue-600"
            >
              Características
            </button>
            <button
              onClick={() => scrollToSection(demoRef)}
              className="cursor-pointer text-gray-600 hover:text-blue-600"
            >
              Demo
            </button>
            <button
              onClick={() => scrollToSection(testimonialsRef)}
              className="cursor-pointer text-gray-600 hover:text-blue-600"
            >
              Token
            </button>
            <button
              onClick={() => scrollToSection(contactRef)}
              className="cursor-pointer text-gray-600 hover:text-blue-600"
            >
              Contacto
            </button>

            {/* Launch App Button */}
            <button
              onClick={handleLaunchApp}
              className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 ml-4"
            >
              Versión Alpha
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header
        ref={heroRef}
        className="pt-28 bg-gradient-to-r from-blue-500 to-teal-400"
      >
        <div className="container mx-auto px-6 py-20 flex flex-col lg:flex-row items-center lg:justify-between">
          {/* Text Column */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              TSN el futuro de los medios digitales
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-200">
              Súbete a la ola y disfruta de las ventajas por ser pionero
            </p>
            <div className="flex justify-center md:justify-start">
              <button
                className="mt-8 px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 flex items-center justify-center"
                onClick={() =>
                  window.open("https://discord.gg/GbM6ZkuC", "_blank")
                }
              >
                <img
                  src="/blue-discord.svg" // Ensure you have this file in your public folder
                  alt="Discord"
                  className="w-6 h-6 mr-2"
                />
                Únete a la comunidad
              </button>
            </div>
          </div>

          {/* Image Column */}
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <img
              src="/newspaper-34126_1280.webp"
              alt="Ilustración del periódico"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      </header>

      {/* Features Section with Carousel */}
      <section ref={featuresRef} className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-10">
          ¿Por qué es el futuro?
        </h2>

        {/* Single Carousel - Interleaving Good and Bad Features */}
        <div
          ref={carouselRef}
          className="overflow-x-auto flex whitespace-nowrap cursor-pointer scroll-smooth space-x-6"
          onMouseDown={mouseDownHandler}
          onMouseLeave={mouseLeaveHandler}
          onMouseUp={mouseUpHandler}
          onMouseMove={mouseMoveHandler}
        >
          {/* Positive and Negative Cards */}

          <div className="inline-block mr-6 p-4 rounded-lg shadow-lg bg-white max-w-xs sm:w-48 w-36">
            <div className="bg-green-500 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto">
              <NewspaperIcon className="text-white w-8 h-8" />
            </div>
            <p className="mt-4 text-center text-sm sm:text-lg text-gray-700 font-semibold">
              Noticias de Calidad
            </p>
          </div>
          <div className="inline-block mr-6 p-4 rounded-lg shadow-lg bg-white max-w-xs sm:w-48 w-36">
            <div className="bg-gradient-to-r from-blue-500 to-teal-400 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto">
              <XCircleIcon className="text-white w-8 h-8" />
            </div>
            <p className="mt-4 text-center text-sm sm:text-lg text-gray-700 font-semibold">
              Sin anuncios
            </p>
          </div>

          <div className="inline-block mr-6 p-4 rounded-lg shadow-lg bg-white max-w-xs sm:w-48 w-36">
            <div className="bg-green-500 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto">
              <CurrencyEuroIcon className="text-white w-8 h-8" />
            </div>
            <p className="mt-4 text-center text-sm sm:text-lg text-gray-700 font-semibold">
              Ganas € por leer
            </p>
          </div>
          <div className="inline-block mr-6 p-4 rounded-lg shadow-lg bg-white max-w-xs sm:w-48 w-36">
            <div className="bg-gradient-to-r from-blue-500 to-teal-400 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto">
              <BanIcon className="text-white w-8 h-8" />
            </div>
            <p className="mt-4 text-center text-sm sm:text-lg text-gray-700 font-semibold">
              Sin clickbait
            </p>
          </div>

          <div className="inline-block mr-6 p-4 rounded-lg shadow-lg bg-white max-w-xs sm:w-48 w-36">
            <div className="bg-green-500 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto">
              <UsersIcon className="text-white w-8 h-8" />
            </div>
            <p className="mt-4 text-center text-sm sm:text-lg text-gray-700 font-semibold">
              Comunidad activa
            </p>
          </div>

          <div className="inline-block mr-6 p-4 rounded-lg shadow-lg bg-white max-w-xs sm:w-48 w-36">
            <div className="bg-gradient-to-r from-blue-500 to-teal-400 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto">
              <ShieldCheckIcon className="text-white w-8 h-8" />
            </div>
            <p className="mt-4 text-center text-sm sm:text-lg text-gray-700 font-semibold">
              Sin noticias falsas
            </p>
          </div>

          {/* Nueva tarjeta: "Todo el mundo puede publicar" */}
          <div className="inline-block mr-6 p-4 rounded-lg shadow-lg bg-white max-w-xs sm:w-48 w-36">
            <div className="bg-green-500 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto">
              <PencilAltIcon className="text-white w-8 h-8" />
            </div>
            <p className="mt-4 text-center text-sm sm:text-lg text-gray-700 font-semibold">
              Todos publicamos
            </p>
          </div>
        </div>
      </section>

      <section className="w-full mx-auto px-6 py-20 bg-gray-100">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-10">
          Si eres redactor...
        </h2>
        <div className="flex flex-col lg:flex-row items-center justify-around text-center lg:space-x-12">
          {/* Imagen */}
          <div className="lg:w-1/3 mb-12 lg:mb-0">
            <img
              src="/redactor.png" // Imagen de ejemplo
              alt="Redactor"
              className="w-full rounded-lg"
            />
          </div>
          {/* Lista de Tics */}
          <div className="lg:w-1/2 lg:pl-12">
            <ul className="space-y-4">
              <li className="flex items-center">
                <CheckCircleIcon className="w-6 h-6 text-green-500 mr-2" />
                <span className="text-gray-700 text-lg">
                  Gana dinero escribiendo artículos.
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="w-6 h-6 text-green-500 mr-2" />
                <span className="text-gray-700 text-lg">
                  Publica tus ideas libremente.
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="w-6 h-6 text-green-500 mr-2" />
                <span className="text-gray-700 text-lg">
                  Llega a miles de lectores.
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="w-6 h-6 text-green-500 mr-2" />
                {/* Frase diferente según tamaño de pantalla */}
                <span className="text-gray-700 text-lg">
                  <span className="block md:hidden">Sin intermediarios.</span>
                  <span className="hidden md:block">
                    Sin intermediarios, el periódico no se lleva comisión.
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Sección "Si eres lector" */}
      <section className="w-full mx-auto px-6 py-20 bg-gradient-to-r from-blue-500 to-teal-400">
        <h2 className="text-4xl font-bold text-white text-center mb-10">
          Si eres lector...
        </h2>
        <div className="flex flex-col lg:flex-row items-center justify-center text-center">
          {/* Lista de Tics */}
          <div className="lg:w-1/2 lg:pr-12">
            <ul className="space-y-4">
              <li className="flex items-center">
                <CheckCircleIcon className="w-6 h-6 text-green-500 mr-2" />
                <span className="text-white text-lg">
                  Disfruta de noticias de calidad.
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="w-6 h-6 text-green-500 mr-2" />
                <span className="text-white text-lg">
                  Contenido sin clickbait ni fake news.
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="w-6 h-6 text-green-500 mr-2" />
                <span className="text-white text-lg">
                  No pierde tiempo con anuncios.
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="w-6 h-6 text-green-500 mr-2" />
                <span className="text-white text-lg">
                  Gana dinero por tu opinión.
                </span>
              </li>
            </ul>
          </div>

          <div className="lg:w-1/4 mt-12 lg:mt-0">
            <img
              src="/lector.png"
              alt="Lector"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      </section>

      <section ref={demoRef} className="bg-gray-100 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800">
            ¿Cómo funciona?
          </h2>
          <p className="mt-4 text-center text-gray-600">
            Aprende cómo The Simple Newspaper puede transformar la manera en que
            consumes noticias.
          </p>
          <div
            className="mt-8 relative overflow-hidden"
            style={{ paddingBottom: "56.25%" /* 16:9 ratio */ }}
          >
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/MERMfEVWSL0"
              title="The Simple Newspaper | Demo Presentación"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      <section ref={testimonialsRef} className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center text-gray-800">
          Moneda TSN
        </h2>
        <p className="mt-4 text-center text-gray-600">
          Permite crear noticias y opinar sobre ellas
        </p>

        <p className="mt-4 text-center text-gray-600">
          Cuantas más personas se unan al ecosistema, mayor valor tendrá
          nuestro periódico
        </p>
        <div className="mt-8 flex justify-center">
          <div className="w-64 h-64 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px]">
            <Canvas className="w-full h-full pointer-events-none md:pointer-events-auto">
              <OrbitControls enableZoom={false} />
              <ambientLight intensity={0.5} />
              <directionalLight position={[2, 5, 2]} intensity={1} />
              <SpinningCoin />
            </Canvas>
          </div>
        </div>
      </section>

      <section
        ref={contactRef}
        className="bg-gradient-to-r from-teal-400 to-blue-500 py-20"
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white">
            Gana regalos y acceso a la preventa
          </h2>

          <div className="flex justify-center">
            <button
              className="mt-8 px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 flex items-center justify-center"
              onClick={() =>
                window.open("https://discord.gg/GbM6ZkuC", "_blank")
              }
            >
              <img
                src="/blue-discord.svg"
                alt="Discord"
                className="w-6 h-6 mr-2"
              />
              Únete a la comunidad
            </button>
          </div>

          <p className="mt-4 text-white">
            ¿No tienes Discord? Contacta con nosotros a través de{" "}
            <a
              href="https://whatsapp.com/channel/0029Vapr6EEIN9igkuQctE1y"
              target="_blank"
              className="underline"
            >
              WhatsApp
            </a>
          </p>
        </div>
      </section>

      <footer className="bg-gray-800">
        <div className="container mx-auto px-6 py-8 text-center text-gray-400">
          <div className="mt-4 flex justify-center items-center space-x-4">
            <span>¿Tienes alguna pregunta?</span>
            <a
              href="https://discord.gg/GbM6ZkuC"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-blue-500 transition duration-300"
            >
              ¡Pregúntanos en Discord!
            </a>
            <a
              href="https://discord.gg/GbM6ZkuC"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/discord-icon.svg" 
                alt="Discord"
                className="w-6 h-6 inline-block"
              />
            </a>
          </div>

          <div className="mt-4">
            &copy; {new Date().getFullYear()} The Simple Newspaper. Todos los
            derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
