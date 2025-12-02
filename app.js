import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function App() {
  const [images, setImages] = useState([]);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  // Pick images from device
  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      const selected = result.assets.map((img) => img.uri);
      setImages(selected);
      generateCards(selected);
    }
  };

  // Create 2 copies of each image and shuffle them
  const generateCards = (imgs) => {
    const duplicated = [...imgs, ...imgs].map((uri, index) => ({
      id: index.toString(),
      uri,
    }));

    // Shuffle
    const shuffled = duplicated.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
  };

  const handleCardPress = (index) => {
    if (flipped.length === 2 || matched.includes(index) || flipped.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [i1, i2] = newFlipped;
      const card1 = cards[i1];
      const card2 = cards[i2];

      if (card1.uri === card2.uri) {
        setMatched([...matched, i1, i2]);
      }

      // Reset flipped after delay
      setTimeout(() => setFlipped([]), 800);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Memory Meadow</Text>

      <TouchableOpacity style={styles.button} onPress={pickImages}>
        <Text style={styles.buttonText}>Upload Images</Text>
      </TouchableOpacity>

      <FlatList
        data={cards}
        keyExtractor={(item) => item.id}
        numColumns={3}
        style={{ marginTop: 20 }}
        renderItem={({ item, index }) => {
          const isFlipped = flipped.includes(index) || matched.includes(index);

          return (
            <TouchableOpacity onPress={() => handleCardPress(index)}>
              <View style={styles.card}>
                {isFlipped ? (
                  <Image source={{ uri: item.uri }} style={styles.cardImage} />
                ) : (
                  <View style={styles.cardBack} />
                )}
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8f5e9",
    paddingTop: 60,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2e7d32",
  },
  button: {
    backgroundColor: "#66bb6a",
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  card: {
    width: 100,
    height: 100,
    margin: 8,
    borderRadius: 10,
    overflow: "hidden",
  },
  cardBack: {
    flex: 1,
    backgroundColor: "#a5d6a7",
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
});
