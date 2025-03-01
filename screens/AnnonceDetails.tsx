import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../favoriteSlice';
import { RootState } from '../store';
import type { StaticScreenProps } from '@react-navigation/native';
import BetterButton from '../components/utils/Btn';
import { Annonce } from '../components/Annonce';

type AnnonceDetailsProps = StaticScreenProps<{
  annonce: Annonce;
}>;

function AnnonceDetails(props: AnnonceDetailsProps) {
  const { annonce } = props.route.params;

  const dispatch = useDispatch();

  const isFavorite = useSelector((state: RootState) =>
    state.favorites.favorites.find((fav) => fav.id === annonce.id),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{annonce.model}</Text>
      <Text style={styles.SousTitre}>Information:</Text>

      <Text style={styles.overview}>Prix: {annonce.price} €</Text>
      <Text style={styles.overview}>Système d'exploitation: {annonce.os}</Text>
      <Text style={styles.overview}>Marque: {annonce.constructor}</Text>

      <Text style={styles.overview}>
        Année de sortie : {annonce.releaseDate}
      </Text>
      <Text style={styles.SousTitre}>Vendeur:</Text>
      <View style={styles.sellerContainer}>
        <Image
          source={{ uri: annonce.salerAvatar }}
          style={styles.salerAvatar}
        />

        <View style={styles.sellerInfo}>
          <Text style={styles.Nom}>
            {annonce.salerGender === 'Male' ? 'M.' : 'Mme'} {annonce.saler}
          </Text>
          <Text style={styles.overview}>
            Pays : {annonce.salerCountry} Ville : {annonce.salerCity}
          </Text>
          <Text style={styles.overview}>Tel : {annonce.phone}</Text>
        </View>
      </View>

      <View>
        <Text style={styles.SousTitre}>Description:</Text>
        <Text style={styles.overview}>{annonce.description}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {isFavorite ? (
          <BetterButton
            text="Supprimer des favoris"
            onPress={() => dispatch(removeFavorite(annonce.id))}
            buttonStyle={styles.removeButton}
          />
        ) : (
          <BetterButton
            text="Ajouter aux favoris"
            onPress={() => dispatch(addFavorite(annonce))}
            buttonStyle={styles.addButton}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  sellerContainer: {
    flexDirection: 'row', // Alignement horizontal (image à gauche, texte à droite)
    alignItems: 'center', // Aligner verticalement au centre
    padding: 10,
    borderRadius: 8, // Coins arrondis
    marginBottom: 10,
  },
  salerAvatar: {
    width: 70, // Largeur fixe
    height: '100%', // Hauteur égale au bloc de texte
    aspectRatio: 1, // Maintient un ratio carré
    borderRadius: 35, // Coins arrondis
    borderWidth: 1, // Bordure autour de l'image
    borderColor: '#ccc',
    marginRight: 10, // Espace entre l'image et le texte
  },
  sellerInfo: {
    flex: 1, // Prend l'espace restant à droite
  },
  SousTitre: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 'auto', // Pousse le bouton en bas de l'écran
    paddingBottom: 20, // Optionnel : espace en bas
  },
  overview: {
    fontSize: 12,
    color: '#555',
  },
  addButton: {
    backgroundColor: 'lightgreen',
  },
  Nom: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: 'red',
  },
});

export default AnnonceDetails;
