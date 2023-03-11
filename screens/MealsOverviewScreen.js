import { View } from 'react-native'
import { useLayoutEffect } from 'react';
import { MEALS, CATEGORIES } from '../Data.js'
import MealsList from '../components/MealsList/MealsList.js';

export default function MealsOverviewScreen({ route, navigation }) {

    const catId = route.params.categoryId;
    const displayedMeals = MEALS.filter((mealItem) => {
        return mealItem.categoryIds.indexOf(catId) >= 0;
    });

    useLayoutEffect(() => {
      const categoryTitle = CATEGORIES.find(category => category.id === catId).title;
      navigation.setOptions({
        title: categoryTitle,
      });
    }, [catId, navigation]);


    return (
      <MealsList items={displayedMeals} />
    )
}