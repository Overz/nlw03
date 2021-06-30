import React from 'react';
import { View, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { styleHeader as styles } from '../styles/header';
import { useNavigation } from '@react-navigation/native';

interface IHeaderProps {
  title: string;
  showCancel?: boolean;
}

export default function Header({ title, showCancel = true }: IHeaderProps) {
  const navigation = useNavigation();

  function handleGoBackToAppHomepage() {
    navigation.navigate('OrphanagesMap');
  }

  return (
    <View style={styles.container}>
      <BorderlessButton onPress={navigation.goBack}>
        <Feather name="arrow-left" size={24} color="#15b6d6" />
      </BorderlessButton>
      <Text style={styles.title}>{title}</Text>
      {showCancel ? (
        <BorderlessButton onPress={handleGoBackToAppHomepage}>
          <Feather name="x" size={24} color="#ff669d" />
        </BorderlessButton>
      ) : (
        // Ao remover essa View, o texto existente do detalhe do orfanato, vai ser posicionado no lugar do X
        // Pois a propriedade esta "space-between"
        <View />
      )}
    </View>
  );
}
