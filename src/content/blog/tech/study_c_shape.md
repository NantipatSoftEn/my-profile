---
author: Army
pubDatetime: 2025-10-13T12:03:00.000Z
title: c#
slug: study_c_shape
featured: true
tags:
    - tech
    - fundamental
description:  กำลังจะได้งานมารื้อฟื้นกันหน่อย
---


## Keyword

.net 7, grpc, entity framework, sql server,
Asp.net webform, stored procedure, sql server,WebForms, MVC, WebAPI

## WebFroms

คำว่า WebForms (หรือชื่อเต็มว่า ASP.NET Web Forms) คือเทคโนโลยีการพัฒนาเว็บแอปพลิเคชันของ Microsoft ที่เป็นส่วนหนึ่งของ .NET Framework รุ่นเก่า ซึ่งเปิดตัวมาตั้งแต่ช่วงปี 2002 — ก่อนยุคของ ASP.NET MVC, .NET Core และ .NET 5–9 ที่เราใช้กันในปัจจุบันครับ

### แนวคิดของ WebForms

WebForms ถูกออกแบบมาให้ “เขียนเว็บเหมือนเขียนแอป Windows Forms” คือเน้นแนวคิดแบบ Event-driven programming (เหมือนปุ่มกด, textbox, dropdown)
และ ซ่อนรายละเอียดของ HTTP, HTML, และ JavaScript เอาไว้ เพื่อให้คนที่คุ้นกับการเขียน Desktop App (WinForms) สามารถทำเว็บได้ง่ายขึ้น

## Delegate คืออะไร
**Delegate** คือ “ตัวแทนของ method” หรือ “ตัวแปรที่สามารถอ้างถึงฟังก์ชันได้”  
ใช้สำหรับส่ง method ไปเป็น parameter ให้กับ method อื่น (เหมือน callback ในภาษาอื่น)

> 💡 delegate = function pointer ในภาษาที่ปลอดภัย (type-safe)

---

## 🔹 ตัวอย่างพื้นฐาน

```csharp
// 1️⃣ ประกาศ delegate
delegate void MyDelegate(string message);

// 2️⃣ สร้าง method ที่มี signature เหมือน delegate
void ShowMessage(string msg)
{
    Console.WriteLine(msg);
}

// 3️⃣ ใช้งาน delegate
MyDelegate del = ShowMessage;  // ผูก method กับ delegate
del("Hello from delegate!");


// การส่ง delegate เป็น parameter
delegate int MathOperation(int a, int b);

int Add(int x, int y) => x + y;
int Multiply(int x, int y) => x * y;

void DoMath(MathOperation op)
{
    Console.WriteLine(op(3, 4));
}

DoMath(Add);        // Output: 7
DoMath(Multiply);   // Output: 12

//  Anonymous Function
MathOperation op = delegate (int a, int b)
{
    return a - b;
};

Console.WriteLine(op(10, 3)); // Output: 7

// more example 

Action<string> print = msg => Console.WriteLine(msg);
print("Hi!");

Func<int, int, int> add = (a, b) => a + b;
Console.WriteLine(add(5, 3));

Predicate<int> isPositive = n => n > 0;
Console.WriteLine(isPositive(-1)); // false

```

## Ref

<https://www.saladpuk.com/>
<https://roadmap.thaiprogrammer.org/paths/aspnet-core/2024-bonus-track/fundamentals.html>
