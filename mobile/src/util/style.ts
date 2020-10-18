import { StyleSheet } from 'react-native';

interface IStyle {
  [key: string]: any;
}

export const doStyle = (style: IStyle) => {
  return StyleSheet.create({ ...style });
};
