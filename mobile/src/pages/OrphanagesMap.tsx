import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import mapMarker from '../img/map-marker.png';
import { Feather } from '@expo/vector-icons';
import { styleOrphanageMap as styles } from '../styles/orphanageMap';
import { useNavigation } from '@react-navigation/native';

export default function OrphanagesMap() {
  const navigation = useNavigation();

  function handleNavigateToOphanageDetails() {
    navigation.navigate('OrphanageDetails');
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -27.5859169,
          longitude: -48.598233,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        <Marker
          icon={mapMarker}
          calloutAnchor={{
            x: 0.5,
            y: -0.1,
          }}
          coordinate={{
            latitude: -27.5859169,
            longitude: -48.598233,
          }}
        >
          <Callout tooltip onPress={handleNavigateToOphanageDetails}>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>Lar dos Kids</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>2 orfanatos encontrados</Text>

        <TouchableOpacity
          style={styles.createOrphanageButton}
          onPress={() => {}}
        >
          <Feather name="plus" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
