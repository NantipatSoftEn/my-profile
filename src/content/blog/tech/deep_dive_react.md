---
author: Army
title: Deep Dive React
slug: deep_dive_react
featured: false
tags:
    - tech
    - fundamental
description: deep_dive_react
---

อธิบายการทำงาน React Virtual Dom และ improve performance direct DOM manipulation tradditional web application

✅ 1. React Virtual DOM คืออะไร?
Virtual DOM คือ object representation ของ DOM จริง (Real DOM) ที่อยู่ในหน่วยความจำ (memory)

React จะ:

- สร้าง Virtual DOM (vDOM) เป็น JavaScript object

- ทุกครั้งที่ state หรือ props เปลี่ยน → React จะสร้าง vDOM ใหม่

- แล้วเปรียบเทียบ (diff) vDOM ใหม่กับ vDOM เก่า

- จากนั้นค่อย "update เฉพาะส่วนของ real DOM ที่จำเป็น" เท่านั้น (Necessary)

✅ 2. ปัญหาใน Traditional DOM Manipulation
ใน Web App ทั่วไปที่เขียนด้วย Vanilla JS หรือ jQuery:

ทุกครั้งที่ DOM มีการเปลี่ยนแปลง เช่น .innerHTML, .appendChild() → browser จะ reflow และ repaint

ถ้ามี DOM ขนาดใหญ่หรือเปลี่ยนแปลงบ่อย → performance จะลดลงอย่างชัดเจน

ไม่มีระบบช่วยจัดการว่าควรเปลี่ยนแปลง DOM ตรงไหนอย่างฉลาด

✅ 3. การทำงานของ React กับ Virtual DOM เพื่อ Improve PerformanceP
ขั้นตอน อธิบาย

1. Render React แปลง Component เป็น Virtual DOM Tree (object)
2. Diffing เมื่อ state/props เปลี่ยน → React เปรียบเทียบ vDOM ใหม่กับ vDOM เก่า (diffing algorithm)
3. Reconciliation React สร้าง patch สำหรับ DOM จริงเฉพาะจุดที่เปลี่ยนแปลง
4. Commit React ส่งคำสั่งเปลี่ยนเฉพาะส่วนนั้นเข้าไปที่ DOM จริง → ลดการ repaint และ reflow

🌳 DOM คืออะไร?
เมื่อเว็บไซต์โหลดในเบราว์เซอร์ เบราว์เซอร์จะรับ HTML จากเซิร์ฟเวอร์ และแปลง HTML นั้นให้เป็นโครงสร้างต้นไม้ที่เรียกว่า DOM
แต่ละ “โหนด (node)” ในต้นไม้จะเป็นตัวแทนของแต่ละ element เช่น <div>, <p>, ฯลฯ และเราสามารถเปลี่ยนแปลง DOM นี้ผ่าน DOM API

🛑 ข้อเสียของการอัปเดต DOM โดยตรง
แม้ DOM API จะเร็วพอสมควร แต่ก็มีปัญหาเรื่อง ประสิทธิภาพ (performance):

การอัปเดต DOM แต่ละครั้งจะทำให้ element และ children ของมันต้อง re-render

ถ้า DOM ใหญ่หรือซับซ้อนมาก → การ re-render จะช้า → ส่งผลให้ UX แย่ลง

inside vDOM

```js
{
  "type": "div",
  "props": {
    "children": [
      { "type": "h1", "props": { "children": "..." } },
      { "type": "p", "props": { "children": "..." } }
    ]
  }
}

```

| หัวข้อ        | Real DOM                             | Virtual DOM               |
| ------------- | ------------------------------------ | ------------------------- |
| การแสดงผล     | โครงสร้าง HTML จริง                  | ตัวแทนจำลองใน memory      |
| การอัปเดต     | ทุกการเปลี่ยนต้อง render ใหม่ทั้งหมด | เปลี่ยนเฉพาะจุดที่ต่าง    |
| ประสิทธิภาพ   | ช้าเมื่อ DOM ใหญ่                    | เร็วเพราะ update เฉพาะจุด |
| การควบคุม DOM | แสดงผลจริงบนจอ                       | ไม่แสดงผลโดยตรง           |

🧨 ปัญหาที่พบบ่อยและวิธีป้องกัน
❗ Re-render มากเกินไป
🔧 ใช้ React.memo, useMemo, useCallback เพื่อป้องกัน re-render ไม่จำเป็น

❗ ใช้ key ผิดใน list
🔧 อย่าใช้ index → ใช้ key ที่เป็น unique id

❗ Component ซ้อนลึกเกินไป
🔧 แยก component ให้เรียบง่าย → ลดภาระในการ diff

❗ ใช้ inline function / object
🔧 ใช้ useCallback และ useMemo แทน

❗ ไม่ใช้ DevTools
🔧 ใช้ React DevTools ดูว่า component ไหน render ซ้ำบ่อยเกินไป

## Why React Born ?

| ปัญหาเดิม                      | React แก้ยังไง                      |
| ------------------------------ | ----------------------------------- |
| DOM ซับซ้อน                    | ใช้ Virtual DOM                     |
| โค้ดซ้ำ                        | สร้าง Component                     |
| อัปเดต state แล้ว DOM ไม่ sync | React ผูก state กับ UI ให้อัตโนมัติ |
| UI ซับซ้อน                     | แบ่งเป็นชิ้นส่วน (Component-based)  |
| ทำงานร่วมกับทีมยาก             | แยกส่วนได้ดีและ predictable         |

## ✅ แนวทาง Improve Performance React พร้อมสิ่งที่ต้องแลก

| เทคนิค                                                        | อธิบาย                                              | สิ่งที่ต้องแลก                                                                   |
| ------------------------------------------------------------- | --------------------------------------------------- | -------------------------------------------------------------------------------- |
| **1. React.memo()**                                           | ป้องกันการ re-render ถ้า props ไม่เปลี่ยน           | ต้องเข้าใจลึกว่าตอนไหนควรใช้ / อาจมีปัญหาถ้า props เป็น object/function ใหม่เสมอ |
| **2. useMemo / useCallback**                                  | เก็บค่าคำนวณหนัก หรือกัน function เปลี่ยนทุก render | เพิ่มความซับซ้อนของโค้ด ต้องจัดการ dependency array ให้ดี                        |
| **3. Lazy Load (React.lazy)**                                 | โหลด component เท่าที่จำเป็น เช่น modal, หน้าอื่น ๆ | ต้องแยกโค้ดออกเป็นหลายไฟล์, จัดการ fallback UI                                   |
| **4. React Profiler / DevTools**                              | ใช้ดู component ไหน render บ่อยเกิน                 | ต้องใช้เวลาเรียนรู้การอ่าน graph และ trace                                       |
| **5. List virtualization (react-window / react-virtualized)** | แสดงเฉพาะ element ที่ผู้ใช้เห็นใน list ยาวๆ         | ใช้ third-party library และเปลี่ยนโครงสร้าง DOM เดิม                             |
| **6. Split component ให้เล็กลง**                              | ลด scope ของการ re-render                           | โค้ดเยอะขึ้น และต้องวางแผนการออกแบบดี                                            |
| **7. Server-Side Rendering (SSR)** เช่น Next.js               | ทำให้โหลดครั้งแรกเร็ว และ SEO ดี                    | เพิ่มความซับซ้อนฝั่ง server, ต้องจัดการ hydration                                |
| **8. ใช้ key ที่ไม่ซ้ำใน list**                               | ทำให้ diffing algorithm ทำงานแม่นยำ                 | ต้องมี unique id เสมอ, ห้ามใช้ index                                             |
| **9. หลีกเลี่ยง inline function/object ใน JSX**               | ป้องกันการ re-render เพราะ reference ใหม่           | ต้องแยกออกมา memo หรือเก็บใน useCallback/useMemo                                 |
| **10. Throttle/Debounce state** (เช่น input, scroll)          | ลดความถี่ในการอัปเดต state                          | ต้องใช้ logic เพิ่ม และ delay การแสดงผลเล็กน้อย                                  |

- React จะ re-render component ที่มี state หรือ props เปลี่ยน เท่านั้น

- แต่ถ้าเราเขียน component แบบ naïve → ทุกอย่างอาจ render ซ้ำเกินจำเป็น

- การ optimize = ลดงานของ React ให้น้อยที่สุด

คำว่า “naïve” (อ่านว่า ไนฟ์) ในบริบทของการเขียนโค้ด หมายถึง:

"วิธีเขียนแบบตรงไปตรงมา ไม่ได้คิดถึงประสิทธิภาพ หรือข้อจำกัดในอนาคต"

```tsx
function App() {
    const [count, setCount] = useState(0)
    // when count has changing all component  re-render
    return (
        <div>
            <Header />
            <Content />
            <Footer />
            <button onClick={() => setCount(count + 1)}>Click</button>
        </div>
    )
}

const Header = React.memo(() => <h1>Header</h1>)
const Content = React.memo(() => <div>Some content</div>)
const Footer = React.memo(() => <footer>Footer</footer>)
```

(14 DevTools Tricks That`ll Make You a Better Developer)<https://youtu.be/pw14NzfYPa8?si=FqhwyCqR2xEiRn6y>

## List virtualization (react-window / react-virtualized) คือะไร

```tsx
{
    items.map(item => <div key={item.id}>{item.name}</div>)
}
```

- ถ้า items มี 10,000 รายการ → React ต้อง render div 10,000 อัน!

- ช้า, กิน RAM, Scroll กระตุก → UX แย่

✅ Virtualization ทำยังไง?
แทนที่จะ render ทุกแถวพร้อมกัน → มันจะ:

คำนวณขนาดของ list และความสูงของแต่ละแถว

render แค่ 10–30 แถวที่อยู่ในหน้าจอเท่านั้น

แถวอื่น ๆ "ยังไม่ render จริง" → จะ render เมื่อ scroll มาถึง

```tsx
import { FixedSizeList as List } from 'react-window'

const Row = ({ index, style }) => <div style={style}>Row #{index}</div>

export default function MyList() {
    return (
        <List
            height={400} // ความสูงของกล่องแสดง list
            itemCount={10000} // จำนวน item
            itemSize={35} // ความสูงของแต่ละ item
            width={300}
        >
            {Row}
        </List>
    )
}
```

## คุณจะจัดการ global state ในแอป React ขนาดใหญ่ยังไง และมี library หรือแนวทางใดที่คุณจะพิจารณาใช้

ใ- ช้หลายชั้น (layered approach) ในการจัดการ global state

- งานง่ายๆ → ใช้ React Context + useReducer

- งานใหญ่หรือซับซ้อน → ใช้ Zustand หรือ Redux Toolkit

- ถ้ามีข้อมูลจาก server → ใช้ React Query ช่วยจัดการ data sync

- หลีกเลี่ยงการใช้ Context กับ state ที่อัปเดตบ่อย เพื่อป้องกันการ render ซ้ำ

```tsx
// components/Navbar.tsx
import React from 'react'

export default function Navbar() {
    return (
        <nav
            className="bg-blue-600 text-white p-4 flex justify-between items-center"
            aria-label="Main navigation"
        >
            <h1 className="text-xl font-bold">MyApp</h1>

            {/* Desktop menu */}
            <ul className="hidden md:flex gap-4" role="menubar">
                <li>
                    <a href="#home" className="hover:underline" role="menuitem">
                        Home
                    </a>
                </li>
                <li>
                    <a
                        href="#about"
                        className="hover:underline"
                        role="menuitem"
                    >
                        About
                    </a>
                </li>
                <li>
                    <a
                        href="#contact"
                        className="hover:underline"
                        role="menuitem"
                    >
                        Contact
                    </a>
                </li>
            </ul>

            {/* Mobile menu (hamburger) */}
            <button
                className="md:hidden"
                aria-label="Open menu"
                aria-controls="mobile-menu"
                aria-expanded="false"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>
        </nav>
    )
}
```

## React Error handle

React ไม่รองรับ Error Boundary แบบ function component โดยตรง (เฉพาะ class component เท่านั้นที่ใช้ componentDidCatch() ได้)
แต่! เราสามารถใช้ library เสริม เช่น react-error-boundary ที่ให้เราใช้ Error Boundary แบบ function component ได้อย่างสวยงาม

```tsx
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from './components/ErrorFallback'
import UserProfile from './components/UserProfile'

export default function App() {
    return (
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onError={(error, info) => {
                console.error('เกิด Error:', error)
                // ส่ง log ไปยัง Sentry หรือระบบอื่นได้
            }}
        >
            <UserProfile />
        </ErrorBoundary>
    )
}
```

| หัวข้อ                   | 🧱 Class Component                                                    | 🧩 Function Component + Hook                       |
| ------------------------ | --------------------------------------------------------------------- | -------------------------------------------------- |
| **การเขียน state**       | ใช้ `this.state` + `this.setState()`                                  | ใช้ `useState()`                                   |
| **lifecycle**            | ใช้ `componentDidMount`, `componentDidUpdate`, `componentWillUnmount` | ใช้ `useEffect()` ตัวเดียวแต่ควบคุมด้วย dependency |
| **รูปแบบโค้ด**           | ใช้ `class`, `constructor`, `this`                                    | เขียนด้วย `function` ล้วน ๆ                        |
| **การ reuse logic**      | ใช้ HOC หรือ render props → ซับซ้อน                                   | ใช้ Custom Hook → ง่ายและ reusable                 |
| **ความกระชับของโค้ด**    | โค้ดยาว อ่านยาก                                                       | โค้ดสั้น อ่านง่าย                                  |
| **ต้องใช้ this ไหม?**    | ✅ ต้องใช้ `this.xxx` ทุกอย่าง                                        | ❌ ไม่ต้องเลย                                      |
| **ใช้งานกับ TypeScript** | พิมพ์ type ยุ่งกว่า                                                   | ใช้ generic กับ Hook ได้ตรงจุด                     |

4:24
