import React from 'react';
import { useFonts } from 'expo-font';
import {
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from '@expo-google-fonts/nunito';
import Rotutes from './src/Routes';
import Routes from './src/Routes';

export default function App() {
  const [fonts] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  if (!fonts) {
    return null;
  }

  function handleNavigateToOphanageDetails() {}

  return <Routes />;
}
