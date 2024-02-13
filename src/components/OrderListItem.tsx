import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Order } from '@/app/types';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { Link, useSegments } from 'expo-router';
import { RootSegmentType } from './ProductListItem';


dayjs.extend(relativeTime);

type OrderListItemProps = {
//   order: Tables<'orders'>;
    order: any
};

const OrderListItem = ({ order }: OrderListItemProps) => {
  const segments = useSegments();
  if (! ['(admin)', '(user)'].includes(segments[0] || '')) {
    return <Text>Not found</Text>
  }

  const segment_0: RootSegmentType = segments[0] as RootSegmentType;

  return (
    <Link href={`/${segment_0}/orders/${order.id.toString()}`} asChild>
      <Pressable style={styles.container}>
        <View>
          <Text style={styles.title}>Order #{order.id}</Text>
          <Text style={styles.time}>{dayjs(order.created_at).fromNow()}</Text>
        </View>

        <Text style={styles.status}>{order.status}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
  time: {
    color: 'gray',
  },
  status: {
    fontWeight: '500',
  },
});

export default OrderListItem;