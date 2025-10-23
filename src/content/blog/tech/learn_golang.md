---
author: Army
title: Learn golang
slug: learn_golang
featured: false
tags:
    - fundamental
description: เคยเขียน golang มานิดหน่อยแต่เหมือนจะลืมแล้ว มาทบทวน
---

ภาษา go เป็นภาษาที่ต้อง compile ก่อนแล้วถึงจะ execute ได้

## Variables, Type, Operations, Type conversions

```go
// Declare variables
var age int = 25
name := "John" // short declaration

// Type conversion
var x int = 10
var y float64 = float64(x)

// Arithmetic operations
sum := 5 + 3
product := 5 * 3

```

## Basic Pointer

```go
x := 10
p := &x // pointer to x
fmt.Println(*p) // dereference: print value of x
*p = 20         // change x via pointer

```

```go
func changeValue(ptr *int) {
    *ptr = 100
}
num := 50
changeValue(&num)
fmt.Println(num) // Output: 100
```

## Array

```go
var arr [3]int = [3]int{1, 2, 3}
fmt.Println(arr[0]) // Output: 1
arr[2] = 5
fmt.Println(len(arr)) // Output: 3

```

## slices

เอาไว้ชี้ของใน array

```go
s := []int{1, 2, 3}
s = append(s, 4)
fmt.Println(s)        // Output: [1 2 3 4]
fmt.Println(s[1:3])   // Output: [2 3]

```

### slice คืออะไร?

เป็นโครงสร้างข้อมูลคล้าย array แต่ ขนาดยืดหยุ่นได้
ใช้เก็บข้อมูลหลายค่า เช่น []int, []string

### append ใช้ทำอะไร?

ใช้ เพิ่มข้อมูลเข้า slice
append ไม่เปลี่ยน slice เดิมโดยตรง แต่จะ คืน slice ใหม่ กลับมาเสมอ

## | เหตุผล | คำอธิบาย |

| ---------------------- | --------------------------------------------------------------------------- |
| ✅ **ขนาดยืดหยุ่น** | `slice` เพิ่ม/ลดข้อมูลได้ด้วย `append` ส่วน `array` ขนาดคงที่ เปลี่ยนไม่ได้ |
| ✅ **สะดวกกว่า** | ใช้กับฟังก์ชันได้ง่าย เช่นส่งไปใน parameter หรือ return ได้เลย |
| ✅ **มีฟีเจอร์เสริม** | เช่น `len(slice)`, `cap(slice)`, การ slice ย่อย (`x[1:3]`) |
| ✅ **นิยมใน Go idioms** | Go ทั่วไป (ใน lib หรือ framework) ก็ใช้ slice |

การเลือกว่าจะใช้ Value หรือ Pointer Receiver อาจจะเป็นเรื่องยากสำหรับผู้เริ่มเขียน Go ดังนั้นถ้ายังไม่แน่ใจว่าจะใช้อะไร แนะนำให้ใช้ Pointer แต่ทั้งนี้ทั้งนั้นก็อาจจะมีกรณีที่ Value Receiver จะดูเหมาะสมมากกว่า ซึ่งโดยทั่วไปแล้วจะเกี่ยวกับเหตุผลด้านประสิทธิภาพ เช่น Structs ขนาดเล็กที่ไม่ถูกแก้ไขค่า หรือค่าของ Basic Type

## คำแนะนำเพิ่มเติมเกี่ยวกับการเลือกว่าจะใช้ Value หรือ Pointer Receiver มีดังนี้

Guidelines for Value Receiver:

- ถ้า receiver เป็น map, func หรือ chan: ควรใช้ value receiver
- ถ้า receiver เป็น slice และ method ที่เราเขียนไม่ได้ทำการ reslice หรือ reallocate slice: ควรใช้ value receiver เช่นกัน
- ถ้า receiver เป็น array หรือ struct ขนาดเล็ก และ contain elements ที่เป็น basic type เช่น - int หรือ string, value type เช่น time.Time, ไม่ใช่ค่าที่ mutate และ ไม่เป็น pointer: - ในกรณีเช่นนี้ value receiver จะเหมาะสมกว่าในเรื่อง Optimizing garbage collector

Guidelines for Pointer Receiver:

- ถ้า method ต้องการ mutate receiver: receiver ต้องเป็น pointer เท่านั้น
- ถ้า receiver เป็น struct ที่ contain sync.Mutex หรือ synchronizing field: receiver ต้องเป็น pointer เท่านั้นเพื่อหลีกเลี่ยงการ copy
- ถ้า receiver เป็น struct หรือ array ขนาดใหญ่: pointer receiver จะมีประสิทธิภาพที่ดีกว่า
- ถ้าต้องการแชร์ value ภายใน method: ควรใช้ pointer receiver
- ถ้า receiver เป็น struct, array หรือ slice ที่ contain elements ที่เป็น pointer ถึงบางค่าที่อาจจะเกิดการ mutate: การใช้ pointer receiver จะเหมาะสมกว่า เนื่องจากเหตุผลในการอ่าน code

และสุดท้ายแล้ว ถ้าหากยังไม่มั่นใจว่าควรจะใช้ receiver ไหน ก็แนะนำให้ใช้ pointer receiver

## ✅ สรุปสั้น ๆ

- **ไม่แก้ไขค่า → ใช้ Value**
- **แก้ไขค่า หรือมี sync → ใช้ Pointer**
- **ไม่แน่ใจ → เริ่มจาก Pointer ก่อน** (เพราะ flexible และปลอดภัยในระยะยาว)

## เปรียบเทียบหน้าตาและบทบาท

| รูปแบบ                                | เป็นอะไร                      | หน้าที่                              |
| ------------------------------------- | ----------------------------- | ------------------------------------ |
| `func (t MyType) Method() ReturnType` | **Method** (มี receiver)      | ผูกกับ type ให้ type นั้นมีพฤติกรรม  |
| `func myFunc(args...) ReturnType`     | **Function** (ไม่มี receiver) | ฟังก์ชันทั่วไปที่รับ input และคืนค่า |
