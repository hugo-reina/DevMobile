import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import AnnonceList from '../components/AnnonceList';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { useNavigation } from '@react-navigation/native';

type FavoritesAnnonceNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Favorites'
>;

function FavoritesAnnonce() {
  const navigation = useNavigation<FavoritesAnnonceNavigationProp>();
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites,
  );

  const [search, setSearch] = useState('');
  const [filteredFavorites, setFilteredFavorites] = useState(favorites);

  // Mettre à jour la liste filtrée quand favorites change
  useEffect(() => {
    setFilteredFavorites(favorites);
  }, [favorites]);

  // Filtrer les favoris selon la recherche
  const handleSearch = (text: string) => {
    setSearch(text);
    const filtered = favorites.filter((annonce) =>
      annonce.model.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredFavorites(filtered);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mes Favoris</Text>

      {favorites.length === 0 ? (
        <Text style={styles.noFavoritesMessage}>
          Vous n'avez pas encore de favoris.
        </Text>
      ) : (
        <>
          {/* Champ de recherche */}
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un modèle..."
            value={search}
            onChangeText={handleSearch}
          />

          {/* Nombre de résultats */}
          <Text style={styles.countText}>
            {filteredFavorites.length} favori(s) trouvé(s)
          </Text>

          <AnnonceList
            annonce={filteredFavorites}
            onPressAnnonce={(annonce) =>
              navigation.navigate('Details', { annonce })
            }
          />
        </>
      )}
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  noFavoritesMessage: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
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
    fontSize: 12,
    textAlign: 'left',
    marginBottom: 10,
    color: 'black',
  },
});

export default FavoritesAnnonce;
