import { FlatList } from 'react-native'
import { CATEGORIES } from '../Data'
import CategoryGridTiles from '../components/CategoryGridTiles'

export default function CategoriesScreen({ navigation }) {

  function renderCategoryItem(itemData) {

    function pressHandler() {
      navigation.navigate('MealsOverview', {
        categoryId: itemData.item.id
      });
    }

    return <CategoryGridTiles title={itemData.item.title} color={itemData.item.color} onPress={pressHandler} />;
  }

  return (
    <FlatList data={CATEGORIES} keyExtractor={(item)=> item.id} renderItem={renderCategoryItem} numColumns={2}/>
  )
}