import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { Annonce } from './Annonce'; // Assurez-vous que le type Movie est bien importé

type AnnonceListProps = {
  annonce: Annonce[];
  onPressAnnonce: (annonce: Annonce) => void;
};

type ItemProps = {
  annonce: Annonce;
  onPressAnnonce: (annonce: Annonce) => void;
};

const Item = ({ annonce, onPressAnnonce }: ItemProps) => (
  <TouchableOpacity onPress={() => onPressAnnonce(annonce)}>
    <View style={styles.AnnonceContainer}>
      <Text style={styles.AnnonceTitle}>{annonce.model}</Text>
      <Text style={styles.AnnonceDescr}>
        {annonce.releaseDate} - {annonce.price} €
      </Text>
      <Text style={styles.AnnonceDescr}>{annonce.description}</Text>
    </View>
  </TouchableOpacity>
);

function AnnonceList(props: AnnonceListProps) {
  return (
    <FlatList
      data={props.annonce}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Item annonce={item} onPressAnnonce={props.onPressAnnonce} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  AnnonceContainer: {
    marginBottom: 20,
  },
  AnnonceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  AnnonceDescr: {
    fontSize: 10,
    marginTop: 5,
  },
});

export default AnnonceList;
