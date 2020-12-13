import React from 'react';
import './styles/global.css';
// Estilização obrigatorioa do leaflet
import 'leaflet/dist/leaflet.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';

function App() {
  return (
    <BrowserRouter>
      {/* (OPCIONAL) Switch, faz com que as rotas sejam chamadas uma por vez e não varias mesmo tempo, para não haver conflitos */}
      <Switch>
        {/*
        Por padrão, as rotas do React, não faz comparação de igualdade, se uma rota é igual ou diferente da outra.
        Colocando-se no lugar do react, e se perguntando: "A Rota começa com / (barra) ?, Sim, então ele entende todas iguais"
        Para Separarmos a visibilidade/diferenciar cada rota,usamos a propriedade "Exact" utilizada abaixo, caso contrario,
        toda a aplicação é exibida de uma vez só.
        IMPORTANTE: Mas isso é GERALMENTE utilizado na primeira rota
        */}
        <Route path="/" exact component={Landing} />
        <Route path="/app" component={OrphanagesMap} />
        <Route path="/orphanages/create" component={CreateOrphanage} />
        <Route path="/orphanages/:id" component={Orphanage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
