#!/usr/bin/env python3
"""Generate Open Graph images for banks and payment services"""

from PIL import Image, ImageDraw, ImageFont
import json
import os

# Configuration
OG_WIDTH = 1200
OG_HEIGHT = 630
OUTPUT_DIR = "public"

# Bank data
BANKS = {
    "SA": [
        {"id": "alrajhi_bank", "name": "Al Rajhi Bank", "nameAr": "مصرف الراجحي", "color": "#006C35"},
        {"id": "alahli_bank", "name": "Saudi National Bank", "nameAr": "البنك الأهلي السعودي", "color": "#00843D"},
        {"id": "riyad_bank", "name": "Riyad Bank", "nameAr": "بنك الرياض", "color": "#0066B2"},
        {"id": "samba_bank", "name": "Samba Financial Group", "nameAr": "مجموعة سامبا المالية", "color": "#E31E24"},
        {"id": "saudi_investment_bank", "name": "Saudi Investment Bank", "nameAr": "البنك السعودي للاستثمار", "color": "#004B87"},
        {"id": "arab_national_bank", "name": "Arab National Bank", "nameAr": "البنك العربي الوطني", "color": "#00A551"},
        {"id": "saudi_fransi_bank", "name": "Banque Saudi Fransi", "nameAr": "البنك السعودي الفرنسي", "color": "#ED1C24"},
        {"id": "alinma_bank", "name": "Alinma Bank", "nameAr": "بنك الإنماء", "color": "#00A650"},
        {"id": "albilad_bank", "name": "Bank AlBilad", "nameAr": "بنك البلاد", "color": "#1C4587"},
        {"id": "aljazira_bank", "name": "Bank AlJazira", "nameAr": "بنك الجزيرة", "color": "#005EB8"},
    ],
    "AE": [
        {"id": "emirates_nbd", "name": "Emirates NBD", "nameAr": "بنك الإمارات دبي الوطني", "color": "#D50032"},
        {"id": "adcb", "name": "Abu Dhabi Commercial Bank", "nameAr": "بنك أبوظبي التجاري", "color": "#004B87"},
        {"id": "fab", "name": "First Abu Dhabi Bank", "nameAr": "بنك أبوظبي الأول", "color": "#000000"},
        {"id": "dib", "name": "Dubai Islamic Bank", "nameAr": "بنك دبي الإسلامي", "color": "#00923F"},
        {"id": "mashreq_bank", "name": "Mashreq Bank", "nameAr": "بنك المشرق", "color": "#E31E24"},
        {"id": "cbd", "name": "Commercial Bank of Dubai", "nameAr": "بنك دبي التجاري", "color": "#004B87"},
        {"id": "rakbank", "name": "RAKBANK", "nameAr": "بنك رأس الخيمة الوطني", "color": "#E31E24"},
        {"id": "ajman_bank", "name": "Ajman Bank", "nameAr": "بنك عجمان", "color": "#00A651"},
    ],
    "KW": [
        {"id": "nbk", "name": "National Bank of Kuwait", "nameAr": "بنك الكويت الوطني", "color": "#005EB8"},
        {"id": "gulf_bank", "name": "Gulf Bank", "nameAr": "بنك الخليج", "color": "#004B87"},
        {"id": "cbk", "name": "Commercial Bank of Kuwait", "nameAr": "البنك التجاري الكويتي", "color": "#00A651"},
        {"id": "burgan_bank", "name": "Burgan Bank", "nameAr": "بنك برقان", "color": "#E31E24"},
        {"id": "ahli_united_bank", "name": "Ahli United Bank", "nameAr": "الأهلي المتحد", "color": "#00843D"},
        {"id": "kfh", "name": "Kuwait Finance House", "nameAr": "بيت التمويل الكويتي", "color": "#00923F"},
        {"id": "boubyan_bank", "name": "Boubyan Bank", "nameAr": "بنك بوبيان", "color": "#0066B2"},
    ],
    "QA": [
        {"id": "qnb", "name": "Qatar National Bank", "nameAr": "بنك قطر الوطني", "color": "#6E1D3E"},
        {"id": "cbq", "name": "Commercial Bank of Qatar", "nameAr": "البنك التجاري القطري", "color": "#004B87"},
        {"id": "doha_bank", "name": "Doha Bank", "nameAr": "بنك الدوحة", "color": "#E31E24"},
        {"id": "qib", "name": "Qatar Islamic Bank", "nameAr": "بنك قطر الإسلامي", "color": "#00923F"},
        {"id": "masraf_alrayan", "name": "Masraf Al Rayan", "nameAr": "مصرف الريان", "color": "#00A651"},
        {"id": "ahlibank", "name": "Ahlibank", "nameAr": "الأهلي بنك", "color": "#00843D"},
    ],
    "OM": [
        {"id": "bank_muscat", "name": "Bank Muscat", "nameAr": "بنك مسقط", "color": "#E31E24"},
        {"id": "national_bank_oman", "name": "National Bank of Oman", "nameAr": "البنك الوطني العماني", "color": "#00A651"},
        {"id": "bank_dhofar", "name": "Bank Dhofar", "nameAr": "بنك ظفار", "color": "#E31E24"},
        {"id": "ahli_bank_oman", "name": "Ahli Bank", "nameAr": "البنك الأهلي", "color": "#00843D"},
        {"id": "nizwa_bank", "name": "Bank Nizwa", "nameAr": "بنك نزوى", "color": "#00923F"},
        {"id": "sohar_international", "name": "Sohar International Bank", "nameAr": "بنك صحار الدولي", "color": "#0066B2"},
    ],
    "BH": [
        {"id": "nbb", "name": "National Bank of Bahrain", "nameAr": "بنك البحرين الوطني", "color": "#E31E24"},
        {"id": "bbk", "name": "Bank of Bahrain and Kuwait", "nameAr": "بنك البحرين والكويت", "color": "#004B87"},
        {"id": "ahli_united_bahrain", "name": "Ahli United Bank", "nameAr": "الأهلي المتحد", "color": "#00843D"},
        {"id": "bisb", "name": "Bahrain Islamic Bank", "nameAr": "بنك البحرين الإسلامي", "color": "#00923F"},
        {"id": "ithmaar_bank", "name": "Ithmaar Bank", "nameAr": "بنك إثمار", "color": "#00A651"},
        {"id": "khaleeji_bank", "name": "Khaleeji Commercial Bank", "nameAr": "بنك الخليج التجاري", "color": "#0066B2"},
    ],
}

# Payment service types
PAYMENT_SERVICES = [
    {"id": "government_payment", "nameAr": "الدفع الحكومي", "nameEn": "Government Payment", "color": "#1E40AF", "icon": "🏛️"},
    {"id": "local_payment", "nameAr": "الدفع المحلي", "nameEn": "Local Payment", "color": "#059669", "icon": "💳"},
    {"id": "health_links", "nameAr": "الخدمات الصحية", "nameEn": "Health Services", "color": "#DC2626", "icon": "🏥"},
    {"id": "contracts", "nameAr": "العقود", "nameEn": "Contracts", "color": "#7C3AED", "icon": "📄"},
    {"id": "invoices", "nameAr": "الفواتير", "nameEn": "Invoices", "color": "#EA580C", "icon": "🧾"},
    {"id": "chalets", "nameAr": "الشاليهات", "nameEn": "Chalets", "color": "#0891B2", "icon": "🏖️"},
    {"id": "bank_pages", "nameAr": "الخدمات البنكية", "nameEn": "Banking Services", "color": "#0066B2", "icon": "🏦"},
]


def hex_to_rgb(hex_color):
    """Convert hex color to RGB tuple"""
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))


def create_gradient_background(draw, width, height, color1, color2):
    """Create a gradient background"""
    for y in range(height):
        ratio = y / height
        r = int(color1[0] * (1 - ratio) + color2[0] * ratio)
        g = int(color1[1] * (1 - ratio) + color2[1] * ratio)
        b = int(color1[2] * (1 - ratio) + color2[2] * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))


def create_bank_og_image(bank_data, country_code):
    """Create OG image for a bank"""
    img = Image.new('RGB', (OG_WIDTH, OG_HEIGHT), color='white')
    draw = ImageDraw.Draw(img)
    
    # Create gradient background
    main_color = hex_to_rgb(bank_data['color'])
    darker_color = tuple(max(0, c - 40) for c in main_color)
    create_gradient_background(draw, OG_WIDTH, OG_HEIGHT, main_color, darker_color)
    
    # Add overlay for better text contrast
    overlay = Image.new('RGBA', (OG_WIDTH, OG_HEIGHT), (*main_color, 180))
    img.paste(overlay, (0, 0), overlay)
    
    try:
        # Try to load custom fonts
        font_large = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 80)
        font_medium = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 50)
        font_small = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 36)
    except:
        # Fallback to default font
        font_large = ImageFont.load_default()
        font_medium = ImageFont.load_default()
        font_small = ImageFont.load_default()
    
    # Add bank icon
    draw.text((100, 100), "🏦", font=font_large, fill='white')
    
    # Add Arabic name (centered)
    arabic_text = bank_data['nameAr']
    bbox = draw.textbbox((0, 0), arabic_text, font=font_large)
    text_width = bbox[2] - bbox[0]
    x = (OG_WIDTH - text_width) // 2
    draw.text((x, 200), arabic_text, font=font_large, fill='white')
    
    # Add English name
    english_text = bank_data['name']
    bbox = draw.textbbox((0, 0), english_text, font=font_medium)
    text_width = bbox[2] - bbox[0]
    x = (OG_WIDTH - text_width) // 2
    draw.text((x, 320), english_text, font=font_medium, fill='rgba(255,255,255,0.9)')
    
    # Add payment badge
    badge_text = "الخدمات المصرفية الإلكترونية"
    bbox = draw.textbbox((0, 0), badge_text, font=font_small)
    text_width = bbox[2] - bbox[0]
    x = (OG_WIDTH - text_width) // 2
    
    # Draw badge background
    padding = 20
    draw.rounded_rectangle(
        [(x - padding, 450 - padding), (x + text_width + padding, 450 + 50 + padding)],
        radius=15,
        fill='white'
    )
    draw.text((x, 460), badge_text, font=font_small, fill=bank_data['color'])
    
    # Add country flag/name at bottom
    country_names = {"SA": "🇸🇦 السعودية", "AE": "🇦🇪 الإمارات", "KW": "🇰🇼 الكويت", 
                     "QA": "🇶🇦 قطر", "OM": "🇴🇲 عمان", "BH": "🇧🇭 البحرين"}
    country_text = country_names.get(country_code, country_code)
    draw.text((50, OG_HEIGHT - 70), country_text, font=font_small, fill='white')
    
    # Save image
    filename = f"og-bank-{bank_data['id']}.jpg"
    output_path = os.path.join(OUTPUT_DIR, filename)
    img.convert('RGB').save(output_path, 'JPEG', quality=90, optimize=True)
    print(f"✅ Created: {filename}")
    
    return filename


def create_service_og_image(service_data):
    """Create OG image for a payment service"""
    img = Image.new('RGB', (OG_WIDTH, OG_HEIGHT), color='white')
    draw = ImageDraw.Draw(img)
    
    # Create gradient background
    main_color = hex_to_rgb(service_data['color'])
    darker_color = tuple(max(0, c - 40) for c in main_color)
    create_gradient_background(draw, OG_WIDTH, OG_HEIGHT, main_color, darker_color)
    
    # Add overlay
    overlay = Image.new('RGBA', (OG_WIDTH, OG_HEIGHT), (*main_color, 180))
    img.paste(overlay, (0, 0), overlay)
    
    try:
        font_xlarge = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 120)
        font_large = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 80)
        font_medium = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 50)
    except:
        font_xlarge = ImageFont.load_default()
        font_large = ImageFont.load_default()
        font_medium = ImageFont.load_default()
    
    # Add service icon (large)
    draw.text((OG_WIDTH // 2 - 60, 120), service_data['icon'], font=font_xlarge, fill='white')
    
    # Add Arabic name
    arabic_text = service_data['nameAr']
    bbox = draw.textbbox((0, 0), arabic_text, font=font_large)
    text_width = bbox[2] - bbox[0]
    x = (OG_WIDTH - text_width) // 2
    draw.text((x, 280), arabic_text, font=font_large, fill='white')
    
    # Add English name
    english_text = service_data['nameEn']
    bbox = draw.textbbox((0, 0), english_text, font=font_medium)
    text_width = bbox[2] - bbox[0]
    x = (OG_WIDTH - text_width) // 2
    draw.text((x, 400), english_text, font=font_medium, fill='rgba(255,255,255,0.9)')
    
    # Add subtitle
    subtitle = "خدمة دفع آمنة ومضمونة"
    bbox = draw.textbbox((0, 0), subtitle, font=font_medium)
    text_width = bbox[2] - bbox[0]
    x = (OG_WIDTH - text_width) // 2
    draw.text((x, 500), subtitle, font=font_medium, fill='white')
    
    # Save image
    filename = f"og-{service_data['id']}.jpg"
    output_path = os.path.join(OUTPUT_DIR, filename)
    img.convert('RGB').save(output_path, 'JPEG', quality=90, optimize=True)
    print(f"✅ Created: {filename}")
    
    return filename


def main():
    """Generate all OG images"""
    print("🎨 Generating Open Graph images...")
    print()
    
    # Create bank images
    print("📊 Creating bank OG images...")
    bank_images = {}
    for country_code, banks in BANKS.items():
        for bank in banks:
            filename = create_bank_og_image(bank, country_code)
            bank_images[bank['id']] = f"/{filename}"
    
    print()
    print("📊 Creating payment service OG images...")
    service_images = {}
    for service in PAYMENT_SERVICES:
        filename = create_service_og_image(service)
        service_images[service['id']] = f"/{filename}"
    
    print()
    print("✅ All images generated successfully!")
    print(f"📁 Total banks: {sum(len(banks) for banks in BANKS.values())}")
    print(f"📁 Total services: {len(PAYMENT_SERVICES)}")
    
    # Save mapping to JSON
    mapping = {
        "banks": bank_images,
        "services": service_images
    }
    
    with open("og_images_mapping.json", "w", encoding="utf-8") as f:
        json.dump(mapping, f, indent=2, ensure_ascii=False)
    
    print()
    print("💾 Saved mapping to og_images_mapping.json")


if __name__ == "__main__":
    main()
