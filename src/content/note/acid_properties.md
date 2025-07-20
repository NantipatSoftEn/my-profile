---
author: Army
pubDatetime: 2025-05-16T12:03:00.000Z
title: ACID properties
slug: acid_properties
featured: false
tags:
    - tech
    - fundamental
description: acid_properties
---

# 💾 What does ACID Mean?

**ACID** คือคุณสมบัติที่สำคัญของ Database Transaction เพื่อให้มั่นใจว่า Database ยังคงถูกต้อง และปลอดภัยแม้มีปัญหาเกิดขึ้น เช่น system crash หรือ concurrent access

---

## 🔹 Atomicity

**"All or Nothing"**

- ธุรกรรม (Transaction) จะต้อง **ทำทั้งหมด** หรือ **ไม่ทำเลย**
- หากการเขียน (write) ใดล้มเหลว ระบบจะยกเลิกทั้งหมด
- ช่วยป้องกันข้อมูลค้างครึ่งเดียว (partial update)

**ตัวอย่าง:**  
หากต้องโอนเงินจากบัญชี A ไป B

- ถ้าเงินถูกหักจาก A แต่ยังไม่เพิ่มให้ B แล้วระบบล่ม → ต้อง rollback

---

## 🔸 Consistency

**"Preserving Database Invariants"**

- ฐานข้อมูลต้อง **เปลี่ยนจากสถานะที่ถูกต้องหนึ่ง ไปยังอีกสถานะที่ถูกต้องหนึ่ง**
- ต้องไม่ละเมิดกฎหรือ constraint ของระบบ

**ตัวอย่าง:**

- ห้ามมี balance ติดลบ
- ทุก foreign key ต้องชี้ไปยัง key จริง

---

## 🔻 Isolation

**"Concurrent Transactions are Isolated"**

- ธุรกรรมหลายรายการที่รันพร้อมกันจะ **ต้องไม่รบกวนกัน**
- ผลลัพธ์ควรเหมือนกับการรันทีละรายการ

**ตัวอย่าง:**  
Transaction A และ B เขียนข้อมูลพร้อมกัน → แต่ละ transaction จะไม่เห็นการเปลี่ยนแปลงของอีกฝั่งจนกว่า commit

---

## 🔷 Durability

**"Persisted Even After Crash"**

- เมื่อ commit แล้ว ข้อมูลจะ **ยังคงอยู่** แม้ระบบล่ม
- ใช้การเขียนลง disk และ replication เพื่อให้มั่นใจว่าข้อมูลจะไม่หาย

**ตัวอย่าง:**  
เมื่อ user กด "ยืนยันคำสั่งซื้อ" แล้วข้อมูลถูก commit → แม้ server crash ก็ยังสามารถกู้กลับได้

---

## ✅ สรุป

| คุณสมบัติ       | คำอธิบาย                     |
| --------------- | ---------------------------- |
| **Atomicity**   | ทำทั้งหมดหรือไม่ทำเลย        |
| **Consistency** | รักษาความถูกต้องของฐานข้อมูล |
| **Isolation**   | ธุรกรรมแยกจากกันอย่างอิสระ   |
| **Durability**  | ข้อมูลคงอยู่แม้ระบบล่ม       |

ACID คือหัวใจของความน่าเชื่อถือในระบบฐานข้อมูลเชิงธุรกรรม เช่น MySQL, PostgreSQL, Oracle, SQL Server
