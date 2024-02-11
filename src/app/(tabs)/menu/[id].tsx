import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

const ProductDetailScreen = () => {
  const {id} = useLocalSearchParams()
  console.log(id)

  return (
    <View>
      <Stack.Screen options={{title: `Details: ${id}`}}/>
      <Text>ProductDetailScreen for id: {id}</Text>
    </View>
  );
};


export default ProductDetailScreen;