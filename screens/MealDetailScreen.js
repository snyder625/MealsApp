import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import { useContext, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import List from '../components/MealDetail/List';
import Subtitle from '../components/MealDetail/Subtitle';
import MealDetails from '../components/MealDetails';

import { MEALS } from '../Data'
import IconButton from '../components/IconButton';
// import { FavoritesContext } from '../store/context/favorites-context';
import { addFavorite, removeFavorite } from '../store/redux/favorites'

export default function MealDetailScreen({ route, navigation }) {
    const dispatch = useDispatch();
    // const favoriteMealsCtx = useContext(FavoritesContext);
    const favoriteMealIds = useSelector((state)=> state.favoriteMeals.ids);

    const mealId = route.params.mealId;
    const selectedMeal = MEALS.find((meal) => meal.id === mealId);

    // const mealIsFavorite = favoriteMealsCtx.ids ? favoriteMealsCtx.ids.includes(mealId) : false;
    const mealIsFavorite = favoriteMealIds.includes(mealId);

    function changeFavoriteStatusHandler() {
      if(mealIsFavorite) {
        // favoriteMealsCtx.removeFavorite(mealId);
        dispatch(removeFavorite({id: mealId}));
      } else {
        // favoriteMealsCtx.addFavorite(mealId);
        dispatch(addFavorite({id: mealId}));
      }
    }

    useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => { return <IconButton icon={mealIsFavorite ? "star" : "star-outline"} color="white" onPress={changeFavoriteStatusHandler} /> }
      })
    }, [navigation, changeFavoriteStatusHandler]);
    
  return (
    <ScrollView style={styles.rootContainer}>
      <Image source={{uri: selectedMeal.imageUrl}} style={styles.image} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails duration={selectedMeal.duration} complexity={selectedMeal.complexity} affordability={selectedMeal.affordability} textStyle={styles.detailText} />
      
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients} />
          
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32
  },
  image: {
    width: '100%',
    height: 350,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    margin: 8,
    textAlign: 'center',
    color: 'white',
  },
  detailText: {
    color: 'white'
  },
  listOuterContainer: {
    alignItems: 'center',
  },
  listContainer: {
    width: '80%'
  }
})