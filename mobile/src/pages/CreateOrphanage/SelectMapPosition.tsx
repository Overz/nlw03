import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { MapEvent, Marker } from 'react-native-maps';
import mapMarkerImg from '../../img/map-marker.png';
import { styleOrphanageMapPosition as styles } from '../../styles/orphanageMapPosition';

export default function SelectMapPosition() {
  const navigation = useNavigation();
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  function handleNextStep() {
    navigation.navigate('OrphanageData', { position });
  }

  function handleSelectMapPosition(e: MapEvent) {
    const { latitude, longitude } = e.nativeEvent.coordinate;

    setPosition({ latitude: latitude, longitude: longitude });
  }

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: -27.5859169,
          longitude: -48.598233,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
        style={styles.mapStyle}
        onPress={handleSelectMapPosition}
      >
        {position.latitude !== 0 && (
          <Marker
            icon={mapMarkerImg}
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude,
            }}
          />
        )}
      </MapView>

      {position.latitude !== 0 && (
        <RectButton style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      )}
    </View>
  );
}
