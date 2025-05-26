import React, { useMemo } from "react";
import { View, ViewStyle, StyleSheet } from "react-native";
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
  activeSlideAccentColor = "#00000070",
  inactiveSlideAccentColor = "#D3D3D350",
  dotSize = 10,
}: {
  children: React.ReactNode[];
  wrapperStyle?: ViewStyle;
  snapDuration?: number;
  activeSlideAccentColor?: string;
  inactiveSlideAccentColor?: string;
  dotSize?: number;
}) => {
  const totalSlides = children.length;
  const scrollX = useSharedValue(0);
  const autoScrollProgress = useSharedValue(0);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const scrollViewRef = React.useRef<Animated.ScrollView>(null);

  /* ---------- scrolling ---------- */
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

  /* ---------- autoplay ---------- */
  useMemo(() => {
    autoScrollProgress.value = withRepeat(
      withTiming(1, { duration: snapDuration }),
      -1,
      true
    );
    return () => cancelAnimation(autoScrollProgress);
  }, [autoScrollProgress, snapDuration]);

  useAnimatedReaction(
    () => autoScrollProgress.value,
    (progress) => {
      if (progress === 1) {
        const nextIndex = (activeIndex + 1) % totalSlides;
        runOnJS(scrollToIndex)(nextIndex);
      }
    },
    [activeIndex, totalSlides]
  );

  /* ---------- pagination helpers ---------- */
  const getVisibleIndices = (): number[] => {
    if (totalSlides <= 3) return [...Array(totalSlides).keys()];

    if (activeIndex === 0) return [0, 1, 2];
    if (activeIndex === totalSlides - 1)
      return [totalSlides - 3, totalSlides - 2, totalSlides - 1];
    return [activeIndex - 1, activeIndex, activeIndex + 1];
  };

  const visibleIndices = getVisibleIndices();

  /* ---------- render ---------- */
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
          <View key={index} style={{ width: SCREEN_WIDTH }}>
            {child}
          </View>
        ))}
      </Animated.ScrollView>

      {/* ---- Pagination ---- */}
      <View style={styles.paginationContainer}>
        {visibleIndices.map((slideIndex, i) => {
          // Which dot should be “focussed”?
          const isActive =
            (totalSlides <= 3 && activeIndex === slideIndex) ||
            (totalSlides > 3 &&
              ((activeIndex === 0 && i === 0) ||
                (activeIndex === totalSlides - 1 && i === 2) ||
                (activeIndex !== 0 &&
                  activeIndex !== totalSlides - 1 &&
                  i === 1)));

          return (
            <View
              key={i}
              style={[
                styles.dot,
                {
                  width: dotSize,
                  height: dotSize,
                  borderRadius: dotSize / 2,
                  backgroundColor: isActive
                    ? activeSlideAccentColor
                    : inactiveSlideAccentColor,
                },
              ]}
            />
          );
        })}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    position: "absolute",
    bottom: 15,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    opacity: 1,
  },
});
