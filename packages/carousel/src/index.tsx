import React, { useMemo } from "react";
import { View, ViewStyle } from "react-native";
import Animated, {
  cancelAnimation,
  runOnJS,
  useAnimatedReaction,
  useAnimatedScrollHandler,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { SCREEN_WIDTH } from "./constants";

export const CarouselWrapper = ({
  children,
  wrapperStyle,
  snapDuration = 1000,
}: {
  children: React.ReactNode[];
  wrapperStyle?: ViewStyle;
  snapDuration?: number;
}) => {
  const scrollX = useSharedValue(0);
  const autoScrollProgress = useSharedValue(0);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const scrollViewRef = React.useRef<Animated.ScrollView>(null);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
    runOnJS(setActiveIndex)(Math.round(event.contentOffset.x / SCREEN_WIDTH));
  });

  const scrollToIndex = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * SCREEN_WIDTH,
      animated: true,
    });
  };

  useMemo(() => {
    autoScrollProgress.value = withRepeat(
      withTiming(1, { duration: snapDuration }),
      -1,
      true
    );

    return () => cancelAnimation(autoScrollProgress);
  }, [autoScrollProgress]);

  useAnimatedReaction(
    () => autoScrollProgress.value,
    (progress) => {
      if (progress === 1) {
        const nextIndex = (activeIndex + 1) % children.length;
        runOnJS(scrollToIndex)(nextIndex);
      }
    },
    [activeIndex]
  );

  return (
    <Animated.View style={[{ width: SCREEN_WIDTH }, wrapperStyle]}>
      <Animated.ScrollView
        decelerationRate="fast"
        horizontal
        onScroll={scrollHandler}
        ref={scrollViewRef}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        snapToInterval={SCREEN_WIDTH}
      >
        {children.map((child, index) => (
          <View
            key={index}
            style={{
              width: SCREEN_WIDTH,
            }}
          >
            {child}
          </View>
        ))}
      </Animated.ScrollView>
    </Animated.View>
  );
};
