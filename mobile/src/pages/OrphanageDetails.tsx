import React, { useEffect, useState } from 'react';
import { Image, View, ScrollView, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { styleOrphanageDetails as styles } from '../styles/orphanageDetails';
import mapMarkerImg from '../img/map-marker.png';
import { RectButton } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import { IOrphanage, IParams } from '../util/interfaces';
import { api } from '../services/api';
import { or } from 'react-native-reanimated';

export default function OrphanageDetails() {
  const { id } = useRoute().params as IParams;
  const [orphanage, setOrphanage] = useState<IOrphanage>();

  useEffect(() => {
    api.get(`orphanages/${id}`).then((res) => setOrphanage(res.data));
  }, [id]);

  // https://blog.rocketseat.com.br/react-native-shimmer/
  if (!orphanage) {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>Carregando...</Text>
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.imagesContainer}>
        {/*
          ScrollView, naturalmente é vertical, utilizado quando existem mais conteudos
          para serem exibidos, utilizando a propriedade "Horizontal", ele se habilita para mover-se
          horizontalmente, e "PagingEnable" que inpede que a paginação das imagens, trávem/parem
          pela metade, obrigando a ser mostrado o conteúdo completo, e não metade de uma imagem, e metade de outra imagem
        */}
        <ScrollView horizontal={true} pagingEnabled={true}>
          <Image
            style={styles.image}
            source={{
              uri: 'https://fmnova.com.br/images/noticias/safe_image.jpg',
            }}
          />
          <Image
            style={styles.image}
            source={{
              uri: 'https://fmnova.com.br/images/noticias/safe_image.jpg',
            }}
          />
          <Image
            style={styles.image}
            source={{
              uri: 'https://fmnova.com.br/images/noticias/safe_image.jpg',
            }}
          />
        </ScrollView>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{orphanage.name}</Text>
        <Text style={styles.description}>{orphanage.about}</Text>

        <View style={styles.mapContainer}>
          <MapView
            initialRegion={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
              latitudeDelta: 0.03,
              longitudeDelta: 0.03,
            }}
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
            style={styles.mapStyle}
          >
            <Marker
              icon={mapMarkerImg}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }}
            />
          </MapView>

          <View style={styles.routesContainer}>
            <Text style={styles.routesText}>Ver rotas no Google Maps</Text>
          </View>
        </View>

        <View style={styles.separator} />

        <Text style={styles.title}>Instruções para visita</Text>
        <Text style={styles.description}>{orphanage.instructions}</Text>

        <View style={styles.scheduleContainer}>
          <View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
            <Feather name="clock" size={40} color="#2AB5D1" />
            <Text style={[styles.scheduleText, styles.scheduleTextBlue]}>
              Segunda à Sexta {orphanage.opening_hours}
            </Text>
          </View>
          <View style={[styles.scheduleItem, styles.scheduleItemGreen]}>
            <Feather name="info" size={40} color="#39CC83" />
            <Text style={[styles.scheduleText, styles.scheduleTextGreen]}>
              Atendemos fim de semana
            </Text>
          </View>
        </View>

        {/* <RectButton style={styles.contactButton} onPress={() => {}}>
          <FontAwesome name="whatsapp" size={24} color="#FFF" />
          <Text style={styles.contactButtonText}>Entrar em contato</Text>
        </RectButton> */}
      </View>
    </ScrollView>
  );
}
