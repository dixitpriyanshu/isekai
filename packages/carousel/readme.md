
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

## 🧠 Pagination Logic

* If there are **3 or fewer slides**, all dots are shown and active dot highlights the current index.
* If there are **more than 3 slides**, only 3 dots are shown at once:

  * First dot is active at start
  * Last dot is active at end
  * Middle dot is active while scrolling through middle slides
* Active dot animates with a **1.2x scale effect** for visual focus.

---


## 🛠️ To Do

* [ ] Add spring-based scale animation (optional)
* [ ] Add support for vertical orientation
* [ ] Support swipe-to-pause auto-scroll
* [ ] Expose `onSlideChange` callback

---

## 📄 License

MIT License. Feel free to use and modify in your own projects.

---

## 🙌 Author

Crafted with ❤️ by [Priyanshu Dixit](https://github.com/dixitpriyanshu)

