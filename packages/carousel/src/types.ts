import { ViewStyle } from "react-native";
import React from "react";

export type CarouselWrapperProps = {
  /**
   * The children of the carousel, which should be React components.
   * Each child will be treated as a slide in the carousel.
   */
  children: React.ReactNode[];
  /**
   * Optional style for the wrapper view of the carousel.
   * This can be used to customize the appearance of the carousel container.
   */
  wrapperStyle?: ViewStyle;
  /**
   * Duration for the auto-scroll effect in milliseconds.
   * Default is 1000ms (1 second).
   */
  snapDuration?: number;
  /**
   * Color for the active slide indicator dot.
   * Default is a semi-transparent black color.
   */
  activeSlideAccentColor?: string;
  /**
   * Color for the inactive slide indicator dots.
   * Default is a semi-transparent light gray color.
   */
  inactiveSlideAccentColor?: string;
  /**
   * Size of the indicator dots in the pagination.
   * Default is 10 pixels.
   */
  dotSize?: number;
};
