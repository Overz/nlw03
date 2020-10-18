import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import mapMarker from '../img/map-marker.png';
import { Feather } from '@expo/vector-icons';
import { styleOrphanageMap as styles } from '../styles/orphanageMap';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { api } from '../services/api';
import { IOrphanage } from '../util/interfaces';

export default function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<IOrphanage[]>([]);
  const navigation = useNavigation();

  useFocusEffect(() => {
    api.get('orphanages').then((res) => setOrphanages(res.data));
  });

  function handleNavigateToOphanageDetails(id: number) {
    navigation.navigate('OrphanageDetails', { id });
  }

  function handleNavigateToCreateOrphanage() {
    navigation.navigate('SelectMapPosition');
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -27.5859169,
          longitude: -48.598233,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
      >
        {orphanages.map((o) => {
          return (
            <Marker
              key={o.id}
              icon={mapMarker}
              calloutAnchor={{
                x: 0.5,
                y: -0.1,
              }}
              coordinate={{
                latitude: o.latitude,
                longitude: o.longitude,
              }}
            >
              <Callout
                tooltip
                onPress={() => handleNavigateToOphanageDetails(o.id)}
              >
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{o.name}</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {orphanages.length} orfanatos encontrados
        </Text>

        <RectButton
          style={styles.createOrphanageButton}
          onPress={handleNavigateToCreateOrphanage}
        >
          <Feather name="plus" size={20} color="#fff" />
        </RectButton>
      </View>
    </View>
  );
}
