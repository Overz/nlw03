import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import mapMarkerImg from '../../img/map-marker.png';
import { ld, lg } from '../../Routes';
import { styleOrphanageMapPosition as styles } from '../../styles/orphanageMapPosition';

export default function SelectMapPosition() {
  const navigation = useNavigation();

  function handleNextStep() {
    navigation.navigate('OrphanageData');
  }

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: ld,
          longitude: lg,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
        style={styles.mapStyle}
      >
        <Marker
          icon={mapMarkerImg}
          coordinate={{
            latitude: ld,
            longitude: lg,
          }}
        />
      </MapView>

      <RectButton style={styles.nextButton} onPress={handleNextStep}>
        <Text style={styles.nextButtonText}>Próximo</Text>
      </RectButton>
    </View>
  );
}
