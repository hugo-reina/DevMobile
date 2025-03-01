import { Text, View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';

interface BetterButtonProps {
  // Le texte a affiché dans le bouton.
  text: string;
  // La fonction appelée lors de l'appui sur le bouton.
  onPress: () => void;
  // Ajout de style optionnel au bouton.
  buttonStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
}

export default function BetterButton(props: BetterButtonProps) {
  return (
    <View>
      <TouchableOpacity
        style={[styles.button, props.buttonStyle]}
        onPress={props.onPress}
      >
        <Text style={[styles.buttonText, props.buttonTextStyle]}>
          {props.text}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

//style par defaut
const styles = StyleSheet.create({
  button: {
    height: 50,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: 'black',
  },
});
