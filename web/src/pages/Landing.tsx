import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import logoImg from '../img/logo.svg';
import { Link } from 'react-router-dom';
import '../styles/pages/page-landing.css';

function Landing() {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={logoImg} alt="Logo Happy" />
        <main>
          <h1>Leve feliidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>

        <div className="location">
          <strong>Florianópolis</strong>
          <span>Santa Catarina</span>
        </div>
        {/* Link: Redireciona e faz com que a pagina não recarrege desnecessáriamente */}
        <Link to="/app" className="enter-app">
          <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
        </Link>
      </div>
    </div>
  );
}

export default Landing;
