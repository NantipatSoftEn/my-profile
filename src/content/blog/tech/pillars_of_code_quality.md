---
author: Army
pubDatetime: 2025-10-18T12:03:00.000Z
title: 6 Pillars of Code Quality
featured: true
tags:
    - tech
    - fundamental
description: โค้ดที่มีคุณสมบัติที่ดี มักมีคนถามบ่อยๆ  จดไว้ซะหน่อยเพราะมักจะลืม
---

## 🧱 6 Pillars of Code Quality

## Make code readable

→ โค้ดต้อง “อ่านออก” เข้าใจง่าย เหมือนอ่านประโยคภาษาอังกฤษ ไม่ต้องตีความเยอะ เช่น ตั้งชื่อฟังก์ชันและตัวแปรให้สื่อความหมาย ใช้ format สม่ำเสมอ

## Avoid surprises

→ โค้ดไม่ควรทำสิ่งที่คนอ่าน “ไม่คาดคิด” เช่น ฟังก์ชันชื่อ getUser() ไม่ควรลบ user ไปด้วย

## Make code hard to misuse

→ เขียนโค้ดให้ “ยากต่อการใช้ผิด” เช่น ถ้าฟังก์ชันต้องรับพารามิเตอร์เป็น object ไม่ควรยอมให้ string หรือ number ผ่านเข้ามาโดยไม่ได้ validate

## Make code modular

→ แยกโค้ดเป็นส่วน ๆ ที่มีความรับผิดชอบชัดเจน (Single Responsibility Principle) เพื่อให้เปลี่ยนส่วนหนึ่งได้โดยไม่กระทบส่วนอื่น

## Make code reusable

→ ออกแบบให้สามารถนำกลับมาใช้ใหม่ได้ เช่น แยก logic ออกเป็น utility, component หรือ service ที่ไม่ผูกกับ context เฉพาะ

## Make code testable and test it properly

→ เขียนโค้ดที่สามารถเขียน test ได้ง่าย และมี test ครอบคลุมกรณีสำคัญ (unit test, integration test ฯลฯ) เพื่อให้มั่นใจว่าโค้ดไม่พังเมื่อเปลี่ยน

## ความหมายของ Syntactic Sugar

“In computer science, syntactic sugar is syntax within a programming language that is designed to make things easier to read or to express. It makes the language ‘sweeter’ for human use.”

แปลเป็นไทยคือ:

“ในวิทยาการคอมพิวเตอร์ syntactic sugar หมายถึง ไวยากรณ์ในภาษาการเขียนโปรแกรมที่ถูกออกแบบมาเพื่อให้เขียนและอ่านได้ง่ายขึ้น มันทำให้ภาษา ‘หวานขึ้น’ สำหรับมนุษย์ — กล่าวคือ ทำให้โค้ดดูชัดเจน กระชับ และเข้าใจง่ายกว่าเดิม”
