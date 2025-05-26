import React, { JSX, useEffect, useRef, useState } from "react";
import { View, useWindowDimensions, ViewToken } from "react-native";
import Animated, {
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { InfiniteCarouselWrapperProps } from "./types";

/**
 * InfiniteCarouselWrapper is a horizontally scrollable, auto-playing carousel component
 * built with Animated.FlatList. It infinitely appends data to create an infinite effect
 * and supports both manual and automatic scrolling.
 *
 * @param {InfiniteCarouselWrapperProps} props - The props for the carousel.
 * @returns {JSX.Element} The rendered carousel component.
 */
export const InfiniteCarouselWrapper = ({
  children,
  wrapperStyle,
  autoSlide = false,
  snapDuration = 2000,
  activeSlideAccentColor = "#00000070",
  inactiveSlideAccentColor = "#D3D3D350",
  dotSize = 10,
  onSlideChange,
  paginationComponent,
}: InfiniteCarouselWrapperProps): JSX.Element => {
  const x = useSharedValue(0);
  const offset = useSharedValue(0);
  const ref = useAnimatedRef<Animated.FlatList<any>>();
  const { width } = useWindowDimensions();
  const [carouselData, setCarouselData] = useState(children);
  const [currentIndex, setCurrentIndex] = useState(0);
  const interval = useRef<NodeJS.Timeout | null>(null);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      x.value = e.contentOffset.x;
    },
    onMomentumEnd: (e) => {
      offset.value = e.contentOffset.x;
    },
  });

  useDerivedValue(() => {
    scrollTo(ref, offset.value, 0, true);
  });

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems[0]?.index != null) {
      const newIndex = viewableItems[0].index % children.length;
      setCurrentIndex(newIndex);
      onSlideChange?.(newIndex);
    }
  };

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  useEffect(() => {
    if (autoSlide) {
      interval.current = setInterval(() => {
        // Animate the scroll instead of directly updating offset
        scrollTo(ref, offset.value + width, 0, true);
        offset.value += width;
      }, snapDuration);
    } else {
      if (interval.current) {
        clearInterval(interval.current);
      }
    }
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, [autoSlide, snapDuration, width]);

  return (
    <View>
      <Animated.FlatList
        ref={ref}
        horizontal
        pagingEnabled
        style={[{ width }, wrapperStyle]}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={onScroll}
        onScrollBeginDrag={() => {
          if (interval.current) {
            clearInterval(interval.current);
          }
        }}
        onScrollEndDrag={() => {
          if (autoSlide) {
            interval.current = setInterval(() => {
              offset.value += width;
            }, snapDuration);
          }
        }}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        onEndReached={() => setCarouselData((prev) => [...prev, ...children])}
        onEndReachedThreshold={0.5}
        data={carouselData}
        keyExtractor={(_, index) => `carousel_item_${index}`}
        renderItem={({ item }) => <View style={{ width }}>{item}</View>}
      />
      {paginationComponent ? (
        paginationComponent(currentIndex)
      ) : (
        <View
          style={{
            position: "absolute",
            bottom: 10,
            left: 0,
            right: 0,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          {children.length > 1 && (
            <View
              style={{
                position: "absolute",
                bottom: 10,
                left: 0,
                right: 0,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              {[0, 1, 2].map((_, i) => {
                let isActive = false;

                if (currentIndex === 0 && i === 0) {
                  isActive = true; // first slide → left dot
                } else if (currentIndex === children.length - 1 && i === 2) {
                  isActive = true; // last slide → right dot
                } else if (
                  currentIndex > 0 &&
                  currentIndex < children.length - 1 &&
                  i === 1
                ) {
                  isActive = true; // middle slides → middle dot
                }

                return (
                  <View
                    key={i}
                    style={{
                      width: dotSize,
                      height: dotSize,
                      borderRadius: dotSize / 2,
                      backgroundColor: isActive
                        ? activeSlideAccentColor
                        : inactiveSlideAccentColor,
                      margin: 4,
                    }}
                  />
                );
              })}
            </View>
          )}
        </View>
      )}
    </View>
  );
};
