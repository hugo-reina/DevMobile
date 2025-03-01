import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './store'; // Assure-toi que le store est configuré
import HomeScreen from './screens/HomeScreen';
import AnnonceDetails from './screens/AnnonceDetails';
import FavoritesAnnonce from './screens/FavoritesAnnonce';
import { Annonce } from './components/Annonce';

// Type des paramètres de navigation
export type RootStackParamList = {
  Home: undefined;
  Details: { annonce: Annonce }; // Détaille le type pour le paramètre 'movie' dans 'Details'
  Favorites: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={AnnonceDetails} />
          <Stack.Screen
            name="Favorites"
            component={FavoritesAnnonce}
            options={{ title: 'Mes Favoris' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
