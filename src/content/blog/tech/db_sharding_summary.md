---
author: Army
title: Database Sharding
slug: db_sharding_summary
featured: false
tags:
  - tech
  - fundamental
description:  ลองศึกษา database sharding
---



## 🔷 1. Partition Strategies (กลยุทธ์การแบ่งพาร์ทิชัน)

### 1.1 Vertical Partition (แนวตั้ง)
- แยก **ตามคอลัมน์ (column)** เช่น:
  - Table A: `ID`, `First Name`
  - Table B: `Last Name`
- ✅ เหมาะสำหรับแยกข้อมูลที่มีการเข้าถึงต่างกัน เช่น รูปภาพ, ข้อมูลบ่อย

### 1.2 Horizontal Partition (แนวนอน)
- แยก **ตามแถว (row)** เช่น:
  - Table 1: ID 1–2
  - Table 2: ID 3–4
- ✅ ใช้เมื่อมีข้อมูลเยอะ และต้องการกระจายโหลด

---

## 🧩 2. Sharding คืออะไร?
- เป็นการนำ Horizontal Partition ไปใช้ในลักษณะ **Distributed Database**
- ข้อมูลถูกแยกเก็บในหลายๆ เครื่องหรือ Server (เรียกว่า “Shard”)

---

## 🔶 3. Range Based Sharding

### 🧠 แนวคิด
- แบ่ง shard ตาม **ช่วงของค่าบางฟิลด์** เช่น อายุ (`Age`)

### 🧪 ตัวอย่าง
```text
Age ≤ 30     → Shard 1
30 < Age ≤ 40 → Shard 2
Age > 40     → Shard 3
```

### ⚠️ ข้อเสีย
- ถ้าข้อมูลกระจุกในช่วงใดช่วงหนึ่ง → โหลดไม่สมดุล (Unbalanced Load)

---

## 🟢 4. Key Based Sharding (Hash Sharding)

### 🧠 แนวคิด
- ใช้ **Hash Function** กับคีย์ เช่น `ID` แล้ว mod จำนวน shard

### 🔍 ตัวอย่าง
```text
Shard = hash(ID) % 3
```

### ✅ ข้อดี
- โหลดกระจายได้ **สม่ำเสมอ (Even Distribution)**

### ⚠️ ข้อเสีย
- ขยายจำนวน shard ยาก (Re-hash ต้องทำใหม่หมด)

---

## 🟠 5. Directory Based Sharding

### 🧠 แนวคิด
- ใช้ Directory Server คอยเก็บ **Mapping ID ↔ Shard**

### 🔍 ตัวอย่าง Mapping
```text
ID 1,2 → Shard A
ID 3,4 → Shard B
```

### ✅ ข้อดี
- ยืดหยุ่น: ปรับเปลี่ยน mapping ได้ง่าย

### ⚠️ ข้อเสีย
- หาก Directory เสีย → **Single Point of Failure**

---

## 🧭 สรุปการเลือกใช้

| Sharding Type         | ข้อดี                        | ข้อเสีย                          |
|----------------------|-----------------------------|----------------------------------|
| Range Based          | เข้าใจง่าย                  | โหลดไม่สมดุลถ้าข้อมูลกระจุก     |
| Key Based (Hash)     | โหลดกระจายดี                | ขยายระบบยาก                    |
| Directory Based      | ยืดหยุ่น ปรับเปลี่ยนง่าย    | ต้องดูแล Directory Server เพิ่ม  |

---

## 🎯 เหมาะกับใคร?
- ระบบที่มี **ข้อมูลจำนวนมาก**
- ต้องการ **ขยายฐานข้อมูล** โดยไม่ลด performance
- เช่น Social Media, E-Commerce, หรือ Big Data Platform

---

## 📝 Reference
- Credit: ByteByteGo @ Sec.10 (Infographic)
