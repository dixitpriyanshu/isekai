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
      <CarouselWrapper autoSlide>
        <MyImage />
        <MyImage />
        <MyImage />
        <MyImage />
        <MyImage />
        <MyImage />
        <MyImage />
      </CarouselWrapper>
      <InfiniteCarouselWrapper autoSlide>
        {Array.from({ length: 5 }, (_, index) => (
          <MyImage key={index} />
        ))}
      </InfiniteCarouselWrapper>
    </View>
  );
}
