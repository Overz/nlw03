import L from 'leaflet';
import mapMarkerImg from '../img/map-marker.svg';

export const mapIcon = L.icon({
  // Caminho do icone, ou o proprio icone
  iconUrl: mapMarkerImg,

  iconSize: [58, 68], // Largura - Altura

  // O Alinhamento do marcador do mapa, é automaticamente posicionado como o meio do icone, para ajustar isso
  // utiliza-se o IconAnchor, passando a posição do eixo X / 2, para representar exatamente o ponto final do icone
  // caso seja um marcador
  iconAnchor: [29, 68], // X - Y

  // Posicionamento da janelinha popup que contem o texto em relação ao icone
  popupAnchor: [0, -70],
  // popupAnchor: [170, 2],
});
