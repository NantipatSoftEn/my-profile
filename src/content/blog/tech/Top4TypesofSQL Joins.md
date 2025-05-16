---
author: Army
pubDatetime: 2025-05-16T12:03:00.000Z
title: Top 4 Types of SQL Joins
slug: Top4TypesofSQLJoins
featured: false
tags:
  - tech
  - fundamental
description:  Top 4 Types of SQL Joins
---

การใช้ `JOIN` เป็นหัวใจสำคัญของการดึงข้อมูลจากหลายตารางในฐานข้อมูล SQL ด้านล่างคือ 4 ประเภทที่ใช้บ่อยที่สุด พร้อมตัวอย่างและการใช้งาน

---

## 🟩 1. INNER JOIN

- ดึงเฉพาะข้อมูลที่ **มีอยู่ในทั้งสองตาราง**
- ถ้าไม่มีการจับคู่ `User_ID` ในตารางใดตารางหนึ่ง จะไม่แสดงผล

```sql
SELECT *
FROM USER_TABLE a
INNER JOIN ORDER_TABLE b
ON a.USER_ID = b.USER_ID;
```

**ผลลัพธ์:**

| User ID | User Name | Order ID |
|---------|-----------|----------|
| 123     | Bob       | 333      |
| 123     | Bob       | 222      |

✅ เหมาะกับกรณีที่ต้องการดูเฉพาะข้อมูลที่สัมพันธ์กันเท่านั้น

---

## 🟪 2. LEFT JOIN

- แสดงข้อมูล **ทั้งหมดจากตารางซ้าย (User Table)**
- ถ้าไม่มีข้อมูลตรงกันใน Order Table จะใส่ `NULL`

```sql
SELECT *
FROM USER_TABLE a
LEFT JOIN ORDER_TABLE b
ON a.USER_ID = b.USER_ID;
```

**ผลลัพธ์:**

| User ID | User Name | Order ID |
|---------|-----------|----------|
| 123     | Bob       | 333      |
| 124     | Alice     | 111      |
| 125     | Carrie    | NULL     |

✅ เหมาะกับกรณีที่ต้องการรายชื่อผู้ใช้ทั้งหมด ไม่ว่ามีคำสั่งซื้อหรือไม่

---

## 🟦 3. RIGHT JOIN

- แสดงข้อมูล **ทั้งหมดจากตารางขวา (Order Table)**
- ถ้าไม่มีข้อมูลผู้ใช้ จะใส่ `NULL`

```sql
SELECT *
FROM USER_TABLE a
RIGHT JOIN ORDER_TABLE b
ON a.USER_ID = b.USER_ID;
```

**ผลลัพธ์:**

| User ID | User Name | Order ID |
|---------|-----------|----------|
| 123     | Bob       | 333      |
| 124     | Alice     | 111      |
| NULL    | NULL      | 666      |

✅ เหมาะกับกรณีที่ต้องการดูคำสั่งซื้อทั้งหมด ไม่ว่าผู้ใช้จะมีอยู่หรือไม่

---

## 🟨 4. FULL OUTER JOIN

- แสดงข้อมูลจาก **ทั้งสองตาราง**
- ถ้าไม่มีการจับคู่ในอีกฝั่ง จะใส่ `NULL`

```sql
SELECT *
FROM USER_TABLE a
FULL OUTER JOIN ORDER_TABLE b
ON a.USER_ID = b.USER_ID;
```

**ผลลัพธ์:**

| User ID | User Name | Order ID |
|---------|-----------|----------|
| 123     | Bob       | 333      |
| 124     | Alice     | 111      |
| 125     | Carrie    | NULL     |
| 126     | NULL      | 666      |

✅ เหมาะกับกรณีที่ต้องการรวมข้อมูลทั้งหมด จากทั้งสองตาราง ไม่ว่าจะมีการแมตช์หรือไม่

---

## 📌 ตารางเปรียบเทียบ

| JOIN Type        | แสดงข้อมูลจาก...                   |
|------------------|-------------------------------------|
| `INNER JOIN`     | เฉพาะรายการที่ตรงกันในทั้งสองตาราง  |
| `LEFT JOIN`      | ทั้งหมดจากตารางซ้าย + ขวาที่แมตช์  |
| `RIGHT JOIN`     | ทั้งหมดจากตารางขวา + ซ้ายที่แมตช์  |
| `FULL OUTER JOIN`| แสดงข้อมูลทั้งหมดจากทั้งสองตาราง |

---

### 💡 Tip:

- ใช้ `INNER JOIN` เมื่อคุณสนใจเฉพาะข้อมูลที่สัมพันธ์กันเท่านั้น
- ใช้ `LEFT/RIGHT JOIN` เมื่อคุณต้องการ "เก็บทุกแถว" จากฝั่งใดฝั่งหนึ่ง
- ใช้ `FULL OUTER JOIN` เมื่อคุณไม่อยากพลาดข้อมูลฝั่งใดเลย