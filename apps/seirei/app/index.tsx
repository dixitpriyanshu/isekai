import { View, Text } from "react-native";
import React from "react";
import { CarouselWrapper, InfiniteCarouselWrapper } from "@isekai/carousel";
import { Image, useImage } from "expo-image";

export function MyImage() {
  const image = useImage("https://picsum.photos/1000/800", {
    maxWidth: 800,
    onError(error, retry) {
      console.error("Loading failed:", error.message);
    },
  });

  if (!image) {
    return <Text>Image is loading...</Text>;
  }

  return (
    <Image source={image} style={{ width: "100%", height: image.height / 2 }} />
  );
}

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <InfiniteCarouselWrapper autoSlide>
        <View style={{ width: "100%", height: 200, backgroundColor: "red" }} />
        <View style={{ width: "100%", height: 200, backgroundColor: "blue" }} />
        <View
          style={{ width: "100%", height: 200, backgroundColor: "green" }}
        />
        <View
          style={{ width: "100%", height: 200, backgroundColor: "yellow" }}
        />
        <View
          style={{ width: "100%", height: 200, backgroundColor: "purple" }}
        />
      </InfiniteCarouselWrapper>
    </View>
  );
}
