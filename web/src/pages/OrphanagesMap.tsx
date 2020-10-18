import React, { useEffect, useState } from 'react';
import '../styles/pages/orphanages-map.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import mapMarkerImg from '../img/map-marker.svg';
import { mapIcon } from '../utils/mapIcon';
import { api } from '../services/api';
import { IOrphanage } from '../utils/interfaces';

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<IOrphanage[]>([]);
  useEffect(() => {
    api.get('/orphanages').then((req) => {
      setOrphanages(req.data);
    });
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <Link to="/">
            <img src={mapMarkerImg} alt="Marcador Happy" />
          </Link>

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Florianópolis</strong>
          <span>Santa Catarina</span>
        </footer>
      </aside>

      {/* Tentar pegar a cidade dependendo da localização de cada pessoa */}
      <Map
        center={[-27.5859169, -48.598233]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Estilização padrão feia */}
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}

        {/* Melhor estilização.
            Desafio: Deixar opcional a estiização de mapa a escolher
         */}
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />
        {orphanages.map((o) => {
          return (
            <Marker
              key={o.id}
              icon={mapIcon}
              position={[o.latitude, o.longitude]}
            >
              {/* Close Button, cria um "X", opção para fechar a janelinha ao clicar no marker */}
              <Popup
                closeButton={false}
                minWidth={240}
                maxWidth={240}
                className="map-popup"
              >
                {o.name}
                <Link to={`/orphanages/${o.id}`}>
                  <FiArrowRight size={20} color="#FFF" />
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;
