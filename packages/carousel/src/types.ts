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
   * Whether to enable auto-scrolling of the carousel.
   * Default is false.
   * If set to true, the carousel will automatically scroll through the slides.
   */
  autoSlide?: boolean;
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

export type InfiniteCarouselWrapperProps = {
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
   * Whether to enable auto-scrolling of the carousel.
   * Default is false.
   * If set to true, the carousel will automatically scroll through the slides.
   */
  autoSlide?: boolean;
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
  /**
   * Callback function that is called when the slide changes.
   * It receives the index of the new active slide.
   */

  onSlideChange?: (index: number) => void;
  /**
   * Custom pagination component that can be used to render the pagination indicators.
   * If provided, this will override the default pagination indicators.
   */
  /**
   * Horizontal padding for the content inside the carousel.
   * This can be used to adjust the spacing between the content and the edges of the carousel.
   * Default is 0.
   */
  contentPaddingHorizaintal?: number;
  paginationComponent?: (index: number) => React.ReactNode;
};
