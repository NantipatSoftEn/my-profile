---
author: Army
pubDatetime: 2025-05-16T12:03:00.000Z
title: API protocols
slug: api_protocols
featured: false
tags:
  - tech
  - fundamental
description:  api_protocols_th
---


## 🔶 REST (Representational State Transfer)

- **ประเภท:** สไตล์การออกแบบ
- **จุดเด่น:**
  - การสื่อสารแบบ stateless
  - ใช้ HTTP methods เช่น GET, POST, PUT, DELETE
  - ใช้ URL เป็นตัวแทน resource
  - นิยมใช้ JSON เป็นรูปแบบข้อมูล
- **การใช้งาน:** API ทั่วไป, Web/Mobile backend

---

## 🔁 Webhooks

- **ประเภท:** กลไกแจ้งเตือนแบบ Event
- **จุดเด่น:**
  - แจ้งเตือนเมื่อเกิด event ผ่าน HTTP POST
  - เรียลไทม์ ไม่ต้อง polling
- **การใช้งาน:** แจ้งสถานะชำระเงิน, GitHub webhook, แจ้งเตือนระบบ

---

## 🔮 GraphQL

- **ประเภท:** ภาษาสำหรับดึงข้อมูลจาก API
- **จุดเด่น:**
  - ดึงเฉพาะข้อมูลที่ต้องการ
  - ลด over-fetch และ under-fetch
  - ใช้ endpoint เดียว
- **การใช้งาน:** แอปที่ frontend ซับซ้อน ต้องการข้อมูลยืดหยุ่น

---

## 💌 SOAP (Simple Object Access Protocol)

- **ประเภท:** โปรโตคอล
- **จุดเด่น:**
  - ใช้ XML ในการส่งข้อมูล
  - มีมาตรฐานสูง เช่น WS-Security
  - รองรับการดำเนินการที่ซับซ้อน
- **การใช้งาน:** ระบบองค์กร, ธนาคาร, บริการภาครัฐ

---

## 🌐 WebSocket

- **ประเภท:** การเชื่อมต่อแบบสองทาง (full-duplex)
- **จุดเด่น:**
  - เปิดการเชื่อมต่อค้างไว้
  - ส่งข้อมูลแบบ real-time ทั้งสองทาง
- **การใช้งาน:** แชท, เกม, ตลาดหุ้น, ระบบทำงานร่วมกัน

---

## ⚡ EDA (Event-Driven Architecture)

- **ประเภท:** รูปแบบสถาปัตยกรรม
- **จุดเด่น:**
  - ใช้ producer/consumer
  - ขยายระบบง่าย
  - รองรับ async และ scalable
- **การใช้งาน:** ระบบที่ต้องการประมวลผลแบบ event เช่น Kafka

---

## 🧾 EDI (Electronic Data Interchange)

- **ประเภท:** มาตรฐานข้อมูล B2B
- **จุดเด่น:**
  - ใช้แลกเปลี่ยนข้อมูลธุรกิจแบบอัตโนมัติ
  - เช่น ใบสั่งซื้อ ใบแจ้งหนี้
- **การใช้งาน:** ซัพพลายเชน, โลจิสติกส์, B2B

---

## 🔁 SSE (Server-Sent Events)

- **ประเภท:** การส่งข้อมูลจาก server ไป client แบบต่อเนื่อง
- **จุดเด่น:**
  - ใช้ HTTP connection
  - ส่งข้อมูลจาก server ไป client ฝั่งเดียว
- **การใช้งาน:** การแจ้งเตือน, Dashboard, Stock update

---

## 🔄 AMQP (Advanced Message Queuing Protocol)

- **ประเภท:** โปรโตคอลสำหรับ message broker
- **จุดเด่น:**
  - คิว, routing, publish-subscribe
  - รับประกันการส่งข้อมูล
- **การใช้งาน:** ระบบการเงิน, IoT, microservices (RabbitMQ)

---

## 📡 MQTT (Message Queuing Telemetry Transport)

- **ประเภท:** โปรโตคอลเบา
- **จุดเด่น:**
  - เหมาะกับ bandwidth ต่ำ
  - ใช้ pub-sub model
- **การใช้งาน:** IoT, Smart sensor, ระบบเครือข่ายไม่เสถียร

---

## 🔷 gRPC (Google Remote Procedure Call)

- **ประเภท:** Framework สำหรับ RPC
- **จุดเด่น:**
  - ใช้ Protocol Buffers (binary)
  - ประสิทธิภาพสูง รองรับหลายภาษา
- **การใช้งาน:** สื่อสารระหว่าง microservices, backend-to-backend

---

## 🧭 ตารางสรุป

| โปรโตคอล / เทคโนโลยี | ประเภท             | การใช้งานหลัก                        |
|------------------------|---------------------|--------------------------------------|
| REST                   | HTTP                | API CRUD ทั่วไป                      |
| Webhooks               | Event Notification  | แจ้งเตือนเรียลไทม์                  |
| GraphQL                | API Query Language  | ดึงข้อมูลแบบกำหนดเอง                |
| SOAP                   | XML Protocol        | ระบบที่ต้องปลอดภัยสูงและซับซ้อน     |
| WebSocket              | Full-Duplex         | แชท, เกม, real-time data             |
| EDA                    | Event Architecture  | ระบบกระจายงาน, Kafka                |
| EDI                    | B2B Standard        | ธุรกิจ B2B, ข้อมูลการค้า            |
| SSE                    | Push Over HTTP      | Dashboard, แจ้งเตือนจาก server      |
| AMQP                   | Messaging Protocol  | ระบบกระจายข้อความ, RabbitMQ         |
| MQTT                   | Lightweight Protocol| IoT, อุปกรณ์ edge                    |
| gRPC                   | RPC Framework       | Microservices, Backend APIs          |
