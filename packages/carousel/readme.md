
# CarouselWrapper (React Native + Reanimated)

A reusable, auto-scrolling carousel component for React Native built using **React Native Reanimated v2**, offering customizable pagination indicators, smooth animations, and infinite looping.

---

## ✨ Features

- 📸 Horizontal carousel with snapping
- 🔁 Auto-scrolling with customizable duration
- 🎯 Smart pagination indicators (max 3 dots)
- 🎨 Customizable active/inactive dot colors and size
- 📱 Fully responsive and easy to integrate

---

## 📦 Pre-requisites

Ensure you have `react-native-reanimated` and `react-native-gesture-handler` installed and configured.

```bash
npm install @seirei/carousel
````

> Follow [Reanimated setup guide](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/) if not already configured.

---

## 🚀 Usage

```tsx
import { CarouselWrapper } from "./CarouselWrapper";

<CarouselWrapper
  snapDuration={2500}
  wrapperStyle={{ marginVertical: 20 }}
  activeSlideAccentColor="#FF7A00"
  inactiveSlideAccentColor="#E0E0E0"
  dotSize={12}
>
  {[...Array(5)].map((_, i) => (
    <YourSlideComponent key={i} />
  ))}
</CarouselWrapper>
```

---

## ⚙️ Props

| Prop                       | Type                | Default       | Description                                   |
| -------------------------- | ------------------- | ------------- | --------------------------------------------- |
| `children`                 | `React.ReactNode[]` | **Required**  | The slides to be rendered inside the carousel |
| `wrapperStyle`             | `ViewStyle`         | `undefined`   | Optional style for the outer container        |
| `snapDuration`             | `number`            | `1000`        | Time in ms between auto-scrolls               |
| `activeSlideAccentColor`   | `string`            | `"#00000070"` | Color of the active pagination dot            |
| `inactiveSlideAccentColor` | `string`            | `"#D3D3D350"` | Color of the inactive pagination dots         |
| `dotSize`                  | `number`            | `10`          | Diameter of each pagination dot               |

---

# InfiniteCarouselWrapper

`InfiniteCarouselWrapper` is a horizontally scrollable, auto-playing carousel component designed using `Animated.FlatList` from `react-native-reanimated`. It supports infinite-like scrolling behavior by continuously appending the initial children to the data list and handles both manual swiping and automatic transitions.

---

## ✨ Features

- Infinite scroll effect via data duplication
- Optional auto-play with configurable interval
- 3-dot pagination logic:
  - First dot active on the first slide
  - Middle dot active on intermediate slides
  - Last dot active on the final slide
- Customizable pagination through a render prop
- Slide change callback support

---

## 🔧 Props

| Prop                    | Type                                  | Default         | Description                                                                 |
|-------------------------|---------------------------------------|------------------|-----------------------------------------------------------------------------|
| `children`              | `ReactNode[]`                         | **Required**     | Carousel items to be displayed.                                             |
| `wrapperStyle`          | `ViewStyle`                           | `undefined`      | Custom style for the FlatList container.                                   |
| `autoSlide`             | `boolean`                             | `false`          | Enables automatic sliding at intervals.                                    |
| `snapDuration`          | `number`                              | `1000`           | Duration between auto slides (in ms).                                       |
| `activeSlideAccentColor`| `string`                              | `#00000070`      | Color of the active pagination dot.                                        |
| `inactiveSlideAccentColor` | `string`                           | `#D3D3D350`      | Color of the inactive pagination dots.                                     |
| `dotSize`               | `number`                              | `10`             | Diameter of the pagination dots.                                            |
| `onSlideChange`         | `(index: number) => void`             | `undefined`      | Callback triggered when the current visible slide changes.                 |
| `paginationComponent`   | `(index: number) => ReactNode`        | `undefined`      | Optional render prop to provide custom pagination component.               |

---

## 📦 Behavior

- Internally manages the FlatList's scroll position using `react-native-reanimated`.
- Duplicates the `children` array dynamically to simulate infinite scroll.
- Uses `ViewabilityConfig` to track the visible item and update pagination.
- Pagination by default shows only 3 dots:
  - First dot highlighted when at the first index.
  - Last dot highlighted when at the final index.
  - Middle dot highlighted for all other indices.

---

## 🧠 Notes

- Ensure your `children` array contains at least 1 element.
- The `autoSlide` timer resets on user scroll interaction and resumes after.
- The component works well for image sliders, banners, and promotional cards.

---

## 📌 Example Usage

```tsx
<InfiniteCarouselWrapper autoSlide snapDuration={3000}>
  {[<Card1 />, <Card2 />, <Card3 />]}
</InfiniteCarouselWrapper>
```

---

## 🔍 To Do / Improvements

- Pause on press
- Add manual navigation controls (next/prev)
- Add loop reset when data grows too large

---

## 📄 License

MIT License. Feel free to use and modify in your own projects.

---

## 🙌 Author

Crafted with ❤️ by [Priyanshu Dixit](https://github.com/dixitpriyanshu)

