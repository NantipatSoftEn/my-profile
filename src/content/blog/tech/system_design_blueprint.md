---
author: Army
pubDatetime: 2025-05-16T12:03:00.000Z
title: System Design Blueprint
slug: system_design_blueprint
featured: false
tags:
  - tech
  - fundamental
description:  ลองศึกษา system design blueprint
---

## 🟥 1. DNS Resolution (การแปลงชื่อโดเมนเป็น IP)

- ผู้ใช้ร้องขอเข้าเว็บไซต์ → Resolver

1. **User เข้าเว็บไซต์** เช่น พิมพ์ `www.example.com` ในเบราว์เซอร์
2. **Browser ตรวจสอบ DNS Cache ในเครื่อง** ก่อน ว่าเคย resolve ไว้ไหม
3. ถ้าไม่พบ → จะส่งคำร้องไปยัง **Recursive Resolver** ของ ISP หรือ DNS Server ที่กำหนด (เช่น 8.8.8.8 ของ Google)

- DNS Resolver ไปยัง:
  - Root Server
  - TLD Server
  - Authoritative Nameserver
- ส่ง IP กลับให้ client ผ่าน ISP
- ISP มี cache เพื่อลดเวลาในการ resolve ครั้งต่อไป

> ### 🔄 ขั้นตอนการ resolve (ลึกลงไปในระบบ)

#### 1. **Root Server**

- ตอบกลับว่า TLD (Top-Level Domain) สำหรับ `.com` อยู่ที่ไหน

#### 2. **TLD Server (.com)**

- ชี้ไปยัง **Authoritative Name Server** สำหรับ `example.com`

#### 3. **Authoritative Name Server**

- เป็นเซิร์ฟเวอร์ที่มีข้อมูลแท้จริงของ domain (เช่น A record, CNAME, MX)
- ตอบกลับด้วย IP address ที่แท้จริงของ `www.example.com`

#### 4. **Resolver ส่ง IP กลับให้ Browser**

- แล้วเบราว์เซอร์นำ IP ไปเชื่อมต่อกับ Server ที่เกี่ยวข้อง (เช่น Web Server)

### 🔐 ประเภทของ DNS Records

- `A`: ชี้โดเมนไปยัง IPv4
- `AAAA`: ชี้โดเมนไปยัง IPv6
- `CNAME`: ชี้โดเมนไปยังอีกโดเมนหนึ่ง
- `MX`: สำหรับการรับอีเมล
- `NS`: ชี้ว่าโดเมนนี้ใช้ DNS server ไหน
- `TXT`: ใช้ใส่ข้อมูลอื่น ๆ เช่น SPF, DKIM

### 📦 การ Caching DNS

เพื่อประหยัดเวลาและลดปริมาณการใช้งาน DNS Server:

- DNS Resolver จะ cache คำตอบไว้ชั่วคราว
- Cache ที่ระดับ: เบราว์เซอร์, ระบบปฏิบัติการ, DNS Resolver ของ ISP


### ⚠️ ข้อควรระวัง

- DNS Spoofing / Poisoning: การโจมตีที่หลอกให้ resolver ได้ IP ปลอม
- DNS over HTTPS (DoH) และ DNS over TLS (DoT): ช่วยเข้ารหัสคำขอ DNS ป้องกันการสอดแนม


### 🧠 สรุปภาพรวม

| ขั้นตอน | ชื่อเซิร์ฟเวอร์ | หน้าที่ |
|--------|------------------|--------|
| 1 | Root Server | ชี้ไปยัง TLD |
| 2 | TLD Server (.com) | ชี้ไปยัง Authoritative Server |
| 3 | Authoritative Server | ตอบ IP แท้จริงของโดเมน |
| 4 | DNS Resolver | ส่ง IP กลับไปยัง client |
| 5 | Browser | นำ IP ไปเรียกเว็บ |

---

## ⬛ 2. User Request Flow (เส้นทางของ Request)

1. 🧑‍💻 ผู้ใช้ร้องขอ URL
2. DNS Resolution ให้ IP --> IP ที่ได้จะเป็นของ CDN หรือ Load Balancer --> จากนั้น browser เริ่มสร้าง TCP หรือ HTTPS Connection ไปยังปลายทาง
3. 🚦 ISP → CDN หรือ Load Balancer --> ถ้าโดเมนใช้ CDN (เช่น Cloudflare, CloudFront) ผู้ใช้จะเชื่อมต่อกับ edge server ที่ใกล้ที่สุด
4. Load Balancer (L4 หรือ L7)
  -ตรวจสอบว่า service ไหนควรรับคำร้องนี้ เช่น:
     - Static content → Frontend Server / CDN
     - Dynamic content → Backend Server
5. 🖥️ Frontend Server
   ในบางระบบอาจมี SSR (Server Side Rendering) เพื่อเร่งผลลัพธ์
   จัดการ rendering หน้า HTML หรือส่ง frontend assets (React/Vue)
6. Backend Processing
7. Response กลับถึงผู้ใช้

### 📊 Diagram (สรุป Flow)

```text
User Browser
   │
   ▼
DNS Resolution 
   │
   ▼
CDN / Load Balancer
   │
   ▼
Frontend Server (ส่ง HTML/JS)
   │
   ▼
API Request → API Gateway → Backend Service
   │
   ▼
Database / Cache / Auth
   │
   ▼
Response → Gateway → Load Balancer → Browser
```

---

## 🔵 3. Load Balancing (กระจายโหลด)

### 3.1 API Gateway

- JWT Validation
- Authentication & Authorization
- Rate Limiting / Throttling
- Request Routing

```text
Client
  ↓
Load Balancer (L7)
  ↓
API Gateway (เช่น Kong, NGINX, API Gateway ของ AWS)
  ↓
Backend Services (เช่น Auth, Order, Payment)
```

### 3.2 Load Balancer

- ทำงานแบบ Multi-layer (L4, L7)
- ตรวจจับเซิร์ฟเวอร์ล้มเหลว
- Blue/Green Deployment

### 3.3 Frontend Servers

- จัดการ HTTP/WebSocket
- รองรับผู้ใช้จำนวนมาก (Live Chat / Video)
- ใช้กับ CDN สำหรับ static content

### 3.4 CDN / Edge Servers

- แจกจ่าย static files (CSS, JS, รูปภาพ, วิดีโอ)
- ลด Latency โดยให้บริการใกล้ผู้ใช้
- รองรับ HTTP/3, TLS termination

---

## 🟣 4. Backend Servers (เซิร์ฟเวอร์หลักของระบบ)
- ทำงานในรูปแบบ Microservices หรือ Monolith
- บริการหลัก: Auth, Feed, Notification, Payment ฯลฯ
- ใช้ Message Dispatcher เพื่อส่ง Event แบบ Async

---

## 🟩 5. Upload Media (อัปโหลดไฟล์สื่อ)
- ใช้ Object Storage (เช่น AWS S3)
- Client อัปโหลดโดยใช้ Pre-signed URL
- มีระบบจัดคิว เช่น สร้าง thumbnail, ตรวจ malware

---

## 🟨 6. Common Fan-Out Services (บริการกระจายงาน)
- Notification System: Email, SMS, Push
- Search Engine: ElasticSearch
- Recommendation Engine
- Payment Gateway Integration

---

## 🟫 7. Data Layer (ชั้นข้อมูล)

### 7.1 In-memory Cache
- ใช้ Redis หรือ Memcached
- เก็บ session/token
- ใช้ LRU eviction strategy

### 7.2 Database (SQL / NoSQL)
- ใช้ Sharding / Partitioning ตาม user_id
- รองรับ Replication, Backup, Archiving
- มีการแยก Read/Write DB เพื่อเพิ่มประสิทธิภาพ

---

## ✅ สรุปแนวคิดหลักของระบบ

- **Scalability**: รองรับผู้ใช้จำนวนมาก
- **Availability**: ไม่ล่มง่าย, รองรับ Failover
- **Resilience**: ระบบยืดหยุ่น, ฟื้นตัวจาก error ได้
- **Modular Design**: ออกแบบแบบแยกส่วน ดูแลง่าย

