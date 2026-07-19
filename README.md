# Piant teach Piant

เว็บเรียนภาษาอังกฤษออนไลน์ สำหรับนักเรียนระดับ ป.5–ม.3 ไม่ต้องมีเซิร์ฟเวอร์ ใช้ localStorage เก็บข้อมูล

**URL:** https://pepper99.github.io/piant-teach-piant/

## คุณสมบัติ

- 60 บทเรียน (12 บทต่อระดับชั้น)
- คำศัพท์ 600 คำ พร้อมคำอ่านและตัวอย่างประโยค
- แบบฝึกหัด 900 ข้อ (เลือกตอบ, เติมคำ, เขียนประโยค)
- คำศัพท์ประจำวัน
- แบบฝึกหัดประจำวัน
- สถิติการเรียน
- โหมดมืด
- ทำงานแบบ Offline ได้ (PWA-ready)

## ระดับชั้นที่ครอบคลุม

| ระดับ | ชั้น |
|-------|------|
| p5 | ป.5 |
| p6 | ป.6 |
| m1 | ม.1 |
| m2 | ม.2 |
| m3 | ม.3 |

## เริ่มต้นพัฒนา

```bash
npm install        # ติดตั้ง dependencies
npm run dev        # เปิด dev server
npm test           # รัน tests
npm run build      # build สำหรับ production
npm run deploy     # deploy ขึ้น GitHub Pages
```

## โครงสร้าง Project

```
src/
├── components/     # UI components
├── pages/          # หน้าเว็บต่าง ๆ
├── hooks/          # Custom hooks
├── context/        # Global state
├── data/           # เนื้อหาบทเรียน (JSON)
└── utils/          # Utility functions
```

## เทคโนโลยี

React 18, Vite, Tailwind CSS, React Router v6, Vitest

## License

MIT
