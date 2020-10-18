import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OrphanagesMap from './pages/OrphanagesMap';
import OrphanageDetails from './pages/OrphanageDetails';
import OrphanageData from './pages/CreateOrphanage/OrphanageData';
import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition';

const { Navigator, Screen } = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator /*screenOptions={{headerShown:false}}*/>
        <Screen
          options={{ headerTitle: 'Mapa de Orfanatos' }}
          name="OrphanagesMap"
          component={OrphanagesMap}
        />
        <Screen
          options={{ headerTitle: 'Detalhe do Orfanato' }}
          name="OrphanageDetails"
          component={OrphanageDetails}
        />
        <Screen
          options={{ headerTitle: 'SelectMap??' }}
          name="SelectMapPosition"
          component={SelectMapPosition}
        />
        <Screen
          options={{ headerTitle: 'Data??' }}
          name="OrphanageData"
          component={OrphanageData}
        />
      </Navigator>
    </NavigationContainer>
  );
}
