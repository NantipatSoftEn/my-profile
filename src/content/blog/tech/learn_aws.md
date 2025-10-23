---
author: Army
title: Learn AWS
slug: learn_aws
featured: true
tags:
    - fundamental
description: ไม่เคยใช้ AWS ศึกษาและอ่านดู
---

## EC2

✅ 1. Elastic Compute Cloud (EC2) - 9 นาที
อธิบายพื้นฐานของ EC2 ว่าคืออะไร ใช้ทำอะไร เช่น:

Virtual Server บน Cloud ของ AWS

เหมาะสำหรับการรัน Web App, API, Backend หรือ Software ต่าง ๆ

แนะนำประเภทของ instance: General, Compute Optimized, Memory Optimized ฯลฯ

✅ 2. EC2 Storage Options - 3 นาที
อธิบายตัวเลือก storage ที่สามารถใช้กับ EC2:

EBS (Elastic Block Store): ใช้เหมือน HDD/SSD

Instance Store: เร็วแต่ข้อมูลหายเมื่อ stop instance

EFS (Elastic File System): ใช้แชร์ไฟล์ระหว่างหลาย EC2

✅ 3. Elastic File System (EFS) - 2 นาที
เน้นเรื่องการแชร์ไฟล์หลายเครื่อง:

NFS-based system ที่ autoscale

ใช้กับหลาย instance พร้อมกันได้

เหมาะกับการเก็บไฟล์ร่วมกัน เช่น media, config

✅ 4. EC2 Hands-on – Create, Backup and Terminate Instance - 16 นาที
สาธิตการใช้งานจริง:

สร้าง EC2 instance

ตั้งค่า OS, Key Pair, Security Group

สร้าง snapshot สำหรับ backup

ลบ (terminate) instance

✅ 5. IP Addressing - 3 นาที
อธิบายการใช้ IP:

Public IP: เปลี่ยนทุกครั้งที่ stop/start

Elastic IP: Static IP ที่ต้อง reserve

ใช้ IP ในการเชื่อมต่อจากภายนอก

✅ 6. Security Group - 3 นาที
Firewall ระดับ Instance:

กำหนดได้ว่าเปิดพอร์ตไหนบ้าง (เช่น 22, 80, 443)

สามารถ allow/deny แบบ inbound/outbound

มี default deny

✅ 7. EC2 Hands-on – Access your Instance - 10 นาที
ฝึกเชื่อมต่อ instance:

ใช้ SSH (หรือ PuTTY บน Windows)

ตั้ง permission ให้ .pem key

ใช้ Public IP + key pair เพื่อเข้าเครื่อง

✅ 8. EC2 Pricing & Cost Saving - 9 นาที
สอนการประหยัดค่าใช้จ่าย:

เลือก instance ให้เหมาะสม

ปิดเครื่องเมื่อไม่ใช้งาน

เปรียบเทียบ On-Demand vs Reserved vs Spot

✅ 9. EC2 Hands-on – Reserved Instance / Savings Plan - 6 นาที
เน้นการลดค่าใช้จ่าย:

Reserved Instance = จองล่วงหน้า 1–3 ปี

Savings Plan = flexible กว่า แต่ยังลดราคาได้

เหมาะกับ workload ที่ predictable

✅ 10. Lightsail - 2 นาที
อธิบาย Lightsail:

ทางเลือกง่ายกว่า EC2

เหมาะกับมือใหม่

ใช้ deploy WordPress, Static Site, App ง่าย ๆ

✅ 11. Lightsail Hands-on - 5 นาที
ตัวอย่างใช้งานจริง Lightsail:

สร้าง instance

เชื่อมต่อด้วย SSH ผ่าน browser

Deploy เว็บไซต์อย่างง่าย

## Simple Storage Service (s3)

✅ 1. Simple Storage Service (S3) - 8 นาที
แนะนำภาพรวมของ S3:

บริการเก็บวัตถุ (Object Storage) ที่สามารถ scale ได้ไม่จำกัด

เก็บข้อมูลใน "Buckets" ซึ่งเป็น container สำหรับ objects

รองรับ use case เช่น backup, static web hosting, big data

✅ 2. S3 Hands-On - 5 นาที
ฝึกใช้งานจริง:

สร้าง S3 Bucket

อัปโหลดไฟล์

ตั้ง permission: public/private

การสร้าง folder ใน bucket (เป็น logical folder)

✅ 3. Versioning and Storage Classes - 5 นาที
จัดการไฟล์และค่าใช้จ่าย:

Versioning: เก็บหลาย version ของไฟล์ไว้ใน bucket

Storage Classes:

Standard: เข้าถึงบ่อย

IA (Infrequent Access): เข้าถึงน้อย

Glacier: สำหรับ archive

Intelligent-Tiering: จัดการอัตโนมัติตามการใช้งาน

✅ 4. Object Lifecycle - 3 นาที
บริหารอายุข้อมูลแบบอัตโนมัติ:

สร้าง Lifecycle Policy เพื่อ:

ย้ายไฟล์ไป storage class ที่ถูกกว่า

ลบ version เก่า

ลบไฟล์ที่หมดอายุ

ช่วยประหยัดค่าใช้จ่ายในระยะยาว

✅ 5. Static Website Hosting - 2 นาที
เปลี่ยน S3 ให้เป็น Web Hosting ได้:

เปิด static website hosting ใน bucket

ตั้งค่า index.html, error.html

ปรับให้ไฟล์ public (หรือใช้ CloudFront)

เหมาะกับเว็บที่ไม่ต้องใช้ backend (HTML, CSS, JS)

✅ 6. S3 Hands-on – Versioning, Lifecycle, Monitoring, S3 Storage Lens - 7 นาที
การใช้งานจริงแบบรวมหลายฟีเจอร์:

เปิด versioning แล้วทดลองอัปโหลดไฟล์ใหม่

สร้าง lifecycle policy เพื่อจัดการเวอร์ชัน

ใช้ S3 Storage Lens ดูสถิติการใช้งาน เช่น จำนวนไฟล์, ขนาดรวม, การเข้าถึง

ติดตามการใช้งานและ optimize cost

## RDS

✅ 1. Relational Database Service (RDS) – 5 นาที
แนะนำภาพรวม:

เป็นบริการจัดการฐานข้อมูลแบบ relational (SQL)

รองรับ: MySQL, PostgreSQL, MariaDB, SQL Server, Oracle

AWS ดูแลเรื่อง provisioning, patching, backup, monitoring

✅ 2. RDS Hands-On – Create New DB Instance & Connect to DB – 14 นาที
สาธิตการใช้งานจริง:

สร้าง RDS instance (เลือก engine, version, spec, storage)

ตั้งค่า master username/password

เชื่อมต่อผ่าน MySQL client / DBeaver / pgAdmin

ตั้ง Security Group ให้อนุญาตการเข้าถึง

✅ 3. Multi-AZ DB Instance – 2 นาที
แนวคิดความเสถียร:

RDS ทำ replication ไปยัง instance สำรองในอีก Availability Zone

หาก zone หลักมีปัญหา → failover อัตโนมัติ

เหมาะกับ production workload

✅ 4. Multi-AZ DB Cluster – 2 นาที
อัปเกรดจาก DB Instance:

Multi-AZ Cluster ใช้แบบ reader-writer แบบ Aurora

ใช้ Failover ภายในวินาที

มี endpoint สำหรับ reader/writer แยกกัน

✅ 5. Backing up and Restoring – 2 นาที
การสำรองและกู้คืน:

AWS มี automated backups และ manual snapshots

สามารถ restore ไปยัง timestamp ที่ต้องการ

ใช้เพื่อ test/clone ฐานข้อมูลก็ได้

✅ 6. RDS Hands-On – Multi-AZ & Failover, Backup & Restore, Monitoring – 12 นาที
ลงมือทำจริง:

เปิด Multi-AZ

จำลอง failover เพื่อทดสอบ

ดูการทำงานผ่าน CloudWatch และ Enhanced Monitoring

สร้าง snapshot และ restore instance จาก snapshot

✅ 7. Reserved Instance – 2 นาที
ประหยัดค่าใช้จ่าย:

เหมาะกับ workload ที่ใช้งานต่อเนื่องยาว ๆ

จ่ายล่วงหน้าแบบ 1 หรือ 3 ปี → ได้ส่วนลด 30-60%

✅ 8. Amazon Aurora – 2 นาที
บริการฐานข้อมูลระดับ enterprise:

เขียนบน engine ของ AWS เอง รองรับ MySQL และ PostgreSQL

เร็วกว่า RDS ปกติ 3–5 เท่า

รองรับ auto-scaling, fault tolerance สูง

✅ 9. Purpose-Built Databases – 1 นาที
ทางเลือกที่เหมาะกับแต่ละ use case:

RDS = SQL

DynamoDB = NoSQL

Neptune = Graph

ElastiCache = In-memory

Keyspaces = Cassandra

## VPC

✅ 1. Why Should I Use VPC? – 3 นาที
อธิบายเหตุผลที่ต้องใช้ VPC:

เพื่อสร้างเครือข่ายส่วนตัวของคุณบน AWS

ควบคุมระดับ network, routing, firewall (Security Groups/ACLs)

ใช้แยกสภาพแวดล้อม dev/test/prod

✅ 2. What is VPC – 12 นาที
อธิบายองค์ประกอบของ VPC:

CIDR block: ระบุ IP range เช่น 10.0.0.0/16

Subnets: แบ่งเป็น public/private

Route Tables: เส้นทางระหว่าง subnet/Internet

Internet Gateway: อนุญาตให้ subnet เชื่อมต่ออินเทอร์เน็ต

NAT Gateway: ให้ private subnet ออกเน็ตได้โดยไม่เปิดรับขาเข้า

✅ 3. Default VPC – 2 นาที
AWS มี VPC ให้โดยอัตโนมัติ 1 ชุดต่อ region

พร้อมใช้งาน มี public subnet, IGW และ route แล้ว

เหมาะกับ testing หรือเริ่มต้นเร็ว ๆ

✅ 4. VPC Hands-On – 12 นาที
สาธิตการสร้าง VPC เอง:

สร้าง VPC ใหม่

สร้าง 2 subnet (public/private)

Attach IGW

สร้าง NAT Gateway

Routing เพื่อให้ public subnet ออกอินเทอร์เน็ต และ private subnet ใช้ NAT

✅ 5. VPC Overview – 5 นาที
สรุปความเข้าใจเชิงภาพรวม:

VPC = เครือข่ายจำลองแบบ isolated

ใช้ควบคุมการเข้าถึง EC2, RDS และ services อื่น ๆ

ช่วยให้แยก environment หรือ workload ได้อย่างปลอดภัย

✅ 6. Access AWS Services – 5 นาที
การเชื่อมต่อ service เช่น S3 จาก VPC โดยไม่ผ่าน public internet

ใช้ VPC Endpoint (Gateway/Interface) เพื่อลด latency, เพิ่ม security

ใช้ร่วมกับ S3, DynamoDB ฯลฯ

✅ 7. VPC Hands-On – Gateway Endpoint for S3 – 4 นาที
สาธิตการสร้าง VPC Gateway Endpoint:

เพื่อให้ EC2 ใน private subnet อ่าน/เขียนไฟล์ S3 โดยไม่ออกอินเทอร์เน็ต

ปลอดภัยกว่า และไม่เสีย NAT ค่า bandwidth

🔶 8. VPC Connectivity Options – 3 นาที (ยังไม่ได้ดู)
เนื้อหาที่คุณยังไม่ได้เรียน แต่คาดว่าเกี่ยวข้องกับ:

VPN: เชื่อมต่อ on-premise กับ AWS

Direct Connect: เชื่อมต่อผ่านสายตรง/leased line

Peering: เชื่อม VPC กับ VPC อื่น (ข้าม region ก็ได้)

Transit Gateway: สำหรับเชื่อมหลาย VPC แบบรวมศูนย์
