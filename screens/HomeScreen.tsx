import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import AnnonceList from '../components/AnnonceList';
import { getAnnonce, Annonce } from '../components/Annonce';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import BetterButton from '../components/utils/Btn';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

function HomeScreen() {
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  const [filteredAnnonces, setFilteredAnnonces] = useState<Annonce[]>([]);
  const [search, setSearch] = useState('');

  const navigation = useNavigation<HomeScreenNavigationProp>();

  const favoritesCount = useSelector(
    (state: RootState) => state.favorites.favorites.length,
  );

  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        const data = await getAnnonce();
        setAnnonces(data);
        setFilteredAnnonces(data);
      } catch (error) {
        console.error('Error fetching annonces:', error);
      }
    };

    fetchAnnonces();
  }, []);

  // Fonction de filtre des annonces en fonction de la recherche
  const handleSearch = (text: string) => {
    setSearch(text);
    const filtered = annonces.filter((annonce) =>
      annonce.model.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredAnnonces(filtered);
  };

  const handlePressAnnonce = (annonce: Annonce) => {
    navigation.navigate('Details', { annonce });
  };

  return (
    <View style={styles.container}>
      <BetterButton
        text={`Mes favoris (${favoritesCount})`}
        onPress={() => navigation.navigate('Favorites')}
        buttonStyle={styles.button}
      />

      {/* Champ de recherche */}
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher un modèle..."
        value={search}
        onChangeText={handleSearch}
      />

      {/* Affichage du nombre d'annonces trouvées */}
      <Text style={styles.countText}>
        {filteredAnnonces.length} annonce(s) trouvée(s)
      </Text>

      <AnnonceList
        annonce={filteredAnnonces}
        onPressAnnonce={handlePressAnnonce}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 20,
  },
  countText: {
    fontSize: 10,
    textAlign: 'left',
    marginBottom: 10,
    color: 'black',
  },
  button: {
    backgroundColor: 'lightblue',
    alignSelf: 'center', // Centre le bouton horizontalement
    width: 150, // Réduit la largeur du bouton
    paddingVertical: 8, // Ajuste la hauteur du bouton
  },
});

export default HomeScreen;
