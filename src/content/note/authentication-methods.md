---
author: Army
pubDatetime: 2025-02-06T10:25:54.000Z
title: Authentication Methods
slug: authentication-methods
featured: false
tags:
  - god
description:  Authentication Methods
ogImage: 
---
# REST API Authentication Methods

## 1. No Auth

- ไม่มีการยืนยันตัวตน
- ใช้สำหรับ API สาธารณะหรือการทดสอบ
- ❌ ไม่ปลอดภัยหากใช้ใน production

---

## 2. API Key

- ใช้ `key` ธรรมดา ส่งผ่าน header หรือ query string
- เหมาะสำหรับโครงการขนาดเล็กหรือ internal
- ตัวอย่าง: `Authorization: ApiKey <your-key>`

---

## 3. Bearer Token

- ใช้ token สำหรับการยืนยันตัวตน
- ใช้ร่วมกับ OAuth หรือ JWT
- ตัวอย่าง: `Authorization: Bearer <token>`

---

## 4. JWT Bearer

- ใช้ JSON Web Token (JWT)
- มีการเซ็นด้วยลายเซ็นดิจิทัล ปลอดภัยกว่าการใช้ Bearer ทั่วไป
- Payload มักบรรจุ user info และ claims

---

## 5. Basic Auth

- ใช้ `username:password` ที่ถูก base64-encoded
- ตัวอย่าง: `Authorization: Basic dXNlcjpwYXNz`
- ควรใช้ร่วมกับ HTTPS เท่านั้น

---

## 6. Digest Auth

- ปลอดภัยกว่า Basic โดยใช้การ hash credential
- ป้องกันการถูกดักฟังแบบ plaintext
- นิยมลดลงในปัจจุบัน

---

## 7. OAuth 1.0

- ใช้ HMAC-SHA1 เพื่อยืนยันตัวตน
- ต้องใช้ nonce และ timestamp
- ปลอดภัยแต่ซับซ้อน และถูกแทนที่โดย OAuth 2.0

---

## 8. OAuth 2.0

- โปรโตคอลยอดนิยมในการยืนยันตัวตนกับ 3rd-party (Google, Facebook ฯลฯ)
- รองรับหลาย grant types:
  - Authorization Code
  - Client Credentials
  - Implicit Flow (เลิกแนะนำ)
  - Resource Owner Password
- ใช้งานกับทั้ง frontend และ backend ได้

---

## 9. Hawk Authentication

- ใช้ HMAC และ timestamp เพื่อป้องกัน replay attack
- ปลอดภัยสูง ใช้สำหรับ REST API ที่ต้องการระดับความปลอดภัยสูง

---

## 10. AWS Signature

- ใช้เฉพาะกับบริการของ Amazon (เช่น S3, DynamoDB)
- ต้องเซ็น request ด้วย Secret Key (Signature v4)
- ตัวอย่าง: ใช้ SDK หรือ `Authorization: AWS4-HMAC-SHA256 ...`

---

## 11. NTLM Authentication (Beta)

- ใช้ในระบบของ Microsoft (Windows Domain)
- เป็น protocol แบบ challenge-response
- เหมาะกับ Intranet, SharePoint, IIS

---

## 12. Akamai EdgeGrid

- ใช้กับ Akamai APIs
- ต้องมี `client_token`, `access_token`, `client_secret`
- เหมาะกับระบบ CDN หรือ cloud-based ที่ใช้ Akamai
