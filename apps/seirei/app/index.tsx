import { View } from "react-native";

import React from "react";
import { CarouselWrapper } from "@isekai/carousel";

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <CarouselWrapper>
        <View
          style={{ height: 300, width: "100%", backgroundColor: "green" }}
        />
        <View style={{ height: 300, width: "100%", backgroundColor: "blue" }} />
        <View
          style={{ height: 300, width: "100%", backgroundColor: "yellow" }}
        />
      </CarouselWrapper>
    </View>
  );
}
