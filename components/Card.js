import React from "react";
import { TouchableOpacity, Image, StyleSheet, View } from "react-native";

export default function Card({ card, flipped, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      {flipped ? (
        <Image source={{ uri: card.uri }} style={styles.img} />
      ) : (
        <View style={styles.cover} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 5,
    width: 100,
    height: 120,
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  cover: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ccc",
    borderRadius: 10,
  },
});
