import { StyleSheet, Text, Image, Pressable } from "react-native";
import { Link, useSegments } from "expo-router";
import Colors from "@/constants/Colors";
import { Product } from "@/app/types";

export const defaultPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

type ProductListItemProps = {
  product: Product;
};

export type RootSegmentType = '(admin)' | '(user)'

const ProductListItem = ({ product }: ProductListItemProps) => {
  const segments = useSegments();
  if (! ['(admin)', '(user)'].includes(segments[0] || '')) {
    return <Text>Not found</Text>
  }

  const segment_0: RootSegmentType = segments[0] as RootSegmentType;

  return (
    <Link href={`/${segment_0}/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: product.image || defaultPizzaImage }}
          resizeMode="contain"
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: "50%",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    // height: 100,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
  },
  // separator: {
  //   marginVertical: 30,
  //   height: 1,
  //   width: "80%",
  // },
});
