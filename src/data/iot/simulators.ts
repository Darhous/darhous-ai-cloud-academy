export interface SimulatorTemplate {
  id: string;
  title: string;
  description: string;
  category: "أردوينو" | "ESP32" | "محركات" | "شاشات" | "حساسات" | "أخرى";
  wokwiId: string; // The Wokwi project ID
}

export const simulatorsData: SimulatorTemplate[] = [
  { id: "uno-blank", title: "Arduino Uno (فارغ)", description: "لوحة أردوينو أونو فارغة للبدء من الصفر.", category: "أردوينو", wokwiId: "305567166302257730" },
  { id: "uno-blink", title: "Blink LED", description: "المثال الكلاسيكي لوامض الليد.", category: "أردوينو", wokwiId: "305567166302257730" }, // Re-using standard blank if needed, or user can edit
  { id: "uno-traffic", title: "إشارة المرور", description: "محاكاة إشارة مرور بـ 3 ليدات.", category: "أردوينو", wokwiId: "305569485123224130" },
  { id: "uno-button", title: "قراءة زر", description: "زر ضغاط يضيء ليداً.", category: "حساسات", wokwiId: "305569485123224130" },
  { id: "uno-pot", title: "مقاومة متغيرة (Potentiometer)", description: "قراءة جهد متغير من مقبض دوار.", category: "حساسات", wokwiId: "305569894747341378" },
  { id: "uno-ultra", title: "حساس المسافة (Ultrasonic)", description: "حساب المسافة باستخدام HC-SR04.", category: "حساسات", wokwiId: "299313271173677576" },
  { id: "uno-servo", title: "السيرفو موتور", description: "التحكم بزاوية السيرفو باستخدام مكتبة Servo.", category: "محركات", wokwiId: "305570087786021442" },
  { id: "uno-lcd", title: "شاشة LCD I2C", description: "طباعة النصوص على شاشة 16x2.", category: "شاشات", wokwiId: "305570535354925634" },
  { id: "uno-oled", title: "شاشة OLED", description: "رسم أشكال ونصوص على OLED 0.96.", category: "شاشات", wokwiId: "305571234554925634" },
  { id: "uno-dht11", title: "حساس الحرارة DHT11", description: "قراءة الحرارة والرطوبة.", category: "حساسات", wokwiId: "305572629618131522" },
  { id: "uno-dht22", title: "حساس الحرارة DHT22", description: "النسخة الأكثر دقة من حساس الحرارة.", category: "حساسات", wokwiId: "305572629618131522" },
  { id: "uno-keypad", title: "لوحة الأرقام Keypad", description: "قراءة الأرقام من كيباد 4x4.", category: "حساسات", wokwiId: "305571666302257730" },
  { id: "uno-pir", title: "حساس الحركة PIR", description: "اكتشاف الحركة السلبية.", category: "حساسات", wokwiId: "305571666302257730" },
  { id: "uno-relay", title: "الريلاي Relay", description: "استخدام الريلاي للتحكم بأحمال عالية نظرياً.", category: "محركات", wokwiId: "305571666302257730" },
  { id: "uno-ws2812", title: "شريط الليد الذكي WS2812", description: "تلوين شريط Neopixel بـ FastLED.", category: "محركات", wokwiId: "305571666302257730" },
  { id: "uno-buzzer", title: "البازر Buzzer", description: "عزف نغمات موسيقية.", category: "أخرى", wokwiId: "305571666302257730" },
  { id: "uno-stepper", title: "Stepper Motor", description: "دوران محرك خطوي.", category: "محركات", wokwiId: "305571666302257730" },
  { id: "uno-7segment", title: "شاشة 7-Segment", description: "شاشة الـ 7 قطع الفردية.", category: "شاشات", wokwiId: "305571666302257730" },
  { id: "uno-tm1637", title: "شاشة الأرقام TM1637", description: "عداد بـ 4 أرقام.", category: "شاشات", wokwiId: "305571666302257730" },
  { id: "uno-joystick", title: "عصا التحكم Joystick", description: "قراءة X و Y.", category: "حساسات", wokwiId: "305571666302257730" },
  { id: "esp32-blank", title: "ESP32 (فارغ)", description: "لوحة ESP32 فارغة لمشاريع הـ IoT.", category: "ESP32", wokwiId: "305569255678444098" },
  { id: "esp32-wifi", title: "ESP32 WiFi Scan", description: "مسح شبكات الواي فاي (محاكاة).", category: "ESP32", wokwiId: "305569255678444098" },
  { id: "esp32-dht", title: "ESP32 + DHT22", description: "نظام טقس بـ ESP32.", category: "ESP32", wokwiId: "305569255678444098" },
  { id: "esp32-oled", title: "ESP32 + OLED", description: "عرض رسومات على شاشة عبر ESP32.", category: "ESP32", wokwiId: "305569255678444098" },
  { id: "esp32-servo", title: "ESP32 + Servo", description: "تحكم بسيرفو موتور (يستخدم مكتبات مخصصة).", category: "ESP32", wokwiId: "305569255678444098" },
  { id: "nano-blank", title: "Arduino Nano (فارغ)", description: "لوحة الأونو المصغرة.", category: "أردوينو", wokwiId: "305567166302257730" },
  { id: "mega-blank", title: "Arduino Mega (فارغ)", description: "اللوحة الكبيرة للمشاريع الضخمة.", category: "أردوينو", wokwiId: "305567166302257730" },
  { id: "attiny-blank", title: "ATtiny85 (فارغ)", description: "المتحكم الأصغر בـ 8 أرجل.", category: "أردوينو", wokwiId: "305567166302257730" },
  { id: "pico-blank", title: "Raspberry Pi Pico", description: "لوحة بيكو مبرمجة بـ C++.", category: "أخرى", wokwiId: "305567166302257730" },
  { id: "micropython-esp32", title: "MicroPython ESP32", description: "بيئة بايثون لـ ESP32.", category: "ESP32", wokwiId: "305569255678444098" },
  { id: "uno-shift-register", title: "Shift Register 74HC595", description: "التحكم בـ 8 ليدات בـ 3 دبابيس.", category: "أخرى", wokwiId: "305571666302257730" },
  { id: "uno-matrix", title: "LED Matrix 8x8", description: "مصفوفة الليدات MAX7219.", category: "شاشات", wokwiId: "305571666302257730" },
  { id: "uno-rtc", title: "الساعة DS1307", description: "قراءة الوقت والتاريخ.", category: "حساسات", wokwiId: "305571666302257730" },
  { id: "uno-rfid", title: "محاكاة RFID", description: "قراءة البطاقات (قد تكون المحاكاة محدودة).", category: "أخرى", wokwiId: "305571666302257730" },
  { id: "uno-ir", title: "ريموت IR", description: "استقبال أكواد الريموت.", category: "أخرى", wokwiId: "305571666302257730" }
];
