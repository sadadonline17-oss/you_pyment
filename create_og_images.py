from PIL import Image, ImageDraw, ImageFont
import os

output_dir = "/project/workspace/you3333ef/Youssef-Dafa/public"

companies = {
    "aramex": {
        "title": "دفع آمن - أرامكس",
        "subtitle": "شحن عالمي سريع وموثوق",
        "color": "#DC291E",
        "color2": "#E74C3C"
    },
    "dhl": {
        "title": "دفع آمن - DHL",
        "subtitle": "الشبكة العالمية للشحن السريع",
        "color": "#FFCC00",
        "color2": "#FFD700"
    },
    "fedex": {
        "title": "دفع آمن - FedEx",
        "subtitle": "الشحن الدولي الموثوق",
        "color": "#4D148C",
        "color2": "#6A1B9A"
    },
    "ups": {
        "title": "دفع آمن - UPS",
        "subtitle": "خدمات لوجستية عالمية",
        "color": "#351C15",
        "color2": "#5D4037"
    },
    "smsa": {
        "title": "دفع آمن - SMSA",
        "subtitle": "رائدة الشحن السعودي",
        "color": "#662D91",
        "color2": "#8E24AA"
    },
    "naqel": {
        "title": "دفع آمن - ناقل",
        "subtitle": "شحن سريع في السعودية",
        "color": "#0066B2",
        "color2": "#1976D2"
    },
    "zajil": {
        "title": "دفع آمن - زاجل",
        "subtitle": "خدمات توصيل احترافية",
        "color": "#00A859",
        "color2": "#43A047"
    },
    "saudipost": {
        "title": "دفع آمن - البريد السعودي",
        "subtitle": "الشبكة الأوسع في المملكة",
        "color": "#0066B2",
        "color2": "#1976D2"
    },
    "empost": {
        "title": "دفع آمن - البريد الإماراتي",
        "subtitle": "خدمات بريدية متميزة",
        "color": "#C74634",
        "color2": "#D84315"
    },
    "qpost": {
        "title": "دفع آمن - البريد القطري",
        "subtitle": "خدمات بريدية احترافية",
        "color": "#8D1B3D",
        "color2": "#AD1457"
    },
    "kwpost": {
        "title": "دفع آمن - البريد الكويتي",
        "subtitle": "خدمات بريدية موثوقة",
        "color": "#007A3D",
        "color2": "#388E3C"
    },
    "omanpost": {
        "title": "دفع آمن - البريد العُماني",
        "subtitle": "خدمات بريدية متميزة",
        "color": "#E1191A",
        "color2": "#E53935"
    },
    "bahpost": {
        "title": "دفع آمن - البريد البحريني",
        "subtitle": "خدمات بريدية سريعة",
        "color": "#CE1126",
        "color2": "#D32F2F"
    },
    "chalets": {
        "title": "دفع آمن - الشاليهات",
        "subtitle": "حجز شاليهات فاخرة",
        "color": "#FF6B35",
        "color2": "#FF7043"
    },
    "contracts": {
        "title": "دفع آمن - العقود",
        "subtitle": "عقود واتفاقيات قانونية",
        "color": "#1E3A8A",
        "color2": "#1976D2"
    },
    "invoices": {
        "title": "دفع آمن - الفواتير",
        "subtitle": "دفع الفواتير إلكترونياً",
        "color": "#7C3AED",
        "color2": "#9C27B0"
    },
    "government_payment": {
        "title": "دفع آمن - الخدمات الحكومية",
        "subtitle": "سداد الرسوم الحكومية",
        "color": "#059669",
        "color2": "#10B981"
    },
    "health_links": {
        "title": "دفع آمن - الخدمات الصحية",
        "subtitle": "دفع الفواتير الطبية",
        "color": "#DC2626",
        "color2": "#EF4444"
    },
    "local_payment": {
        "title": "دفع آمن - المدفوعات المحلية",
        "subtitle": "خدمات دفع محلية سريعة",
        "color": "#EA580C",
        "color2": "#F97316"
    },
    "bank_pages": {
        "title": "دفع آمن - البنوك الخليجية",
        "subtitle": "أكثر من 50 بنك خليجي",
        "color": "#1E40AF",
        "color2": "#3B82F6"
    }
}

def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

for key, data in companies.items():
    img = Image.new('RGB', (1200, 630), color='white')
    draw = ImageDraw.Draw(img)
    
    color1 = hex_to_rgb(data['color'])
    color2 = hex_to_rgb(data['color2'])
    
    for i in range(630):
        ratio = i / 630
        r = int(color1[0] * (1 - ratio) + color2[0] * ratio)
        g = int(color1[1] * (1 - ratio) + color2[1] * ratio)
        b = int(color1[2] * (1 - ratio) + color2[2] * ratio)
        draw.rectangle([0, i, 1200, i+1], fill=(r, g, b))
    
    try:
        font_title = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 80)
        font_subtitle = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 40)
    except:
        font_title = ImageFont.load_default()
        font_subtitle = ImageFont.load_default()
    
    title_bbox = draw.textbbox((0, 0), data['title'], font=font_title)
    title_width = title_bbox[2] - title_bbox[0]
    title_x = (1200 - title_width) // 2
    
    subtitle_bbox = draw.textbbox((0, 0), data['subtitle'], font=font_subtitle)
    subtitle_width = subtitle_bbox[2] - subtitle_bbox[0]
    subtitle_x = (1200 - subtitle_width) // 2
    
    draw.text((title_x, 200), data['title'], fill='white', font=font_title)
    draw.text((subtitle_x, 320), data['subtitle'], fill='white', font=font_subtitle)
    
    draw.rectangle([400, 400, 800, 410], fill='white')
    
    output_path = os.path.join(output_dir, f"og-{key}.jpg")
    img.save(output_path, 'JPEG', quality=95)
    print(f"✓ Created {key}")

print(f"\n✅ Created {len(companies)} OG images successfully!")
