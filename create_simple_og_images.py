#!/usr/bin/env python3
"""Create simple OG images using basic PIL without complex fonts"""

from PIL import Image, ImageDraw
import os

OG_WIDTH = 1200
OG_HEIGHT = 630
OUTPUT_DIR = "public"

# Banks data
BANKS_DATA = [
    # Saudi Arabia
    ("alrajhi_bank", "#006C35", "🇸🇦"),
    ("alahli_bank", "#00843D", "🇸🇦"),
    ("riyad_bank", "#0066B2", "🇸🇦"),
    ("samba_bank", "#E31E24", "🇸🇦"),
    ("saudi_investment_bank", "#004B87", "🇸🇦"),
    ("arab_national_bank", "#00A551", "🇸🇦"),
    ("saudi_fransi_bank", "#ED1C24", "🇸🇦"),
    ("alinma_bank", "#00A650", "🇸🇦"),
    ("albilad_bank", "#1C4587", "🇸🇦"),
    ("aljazira_bank", "#005EB8", "🇸🇦"),
    # UAE
    ("emirates_nbd", "#D50032", "🇦🇪"),
    ("adcb", "#004B87", "🇦🇪"),
    ("fab", "#000000", "🇦🇪"),
    ("dib", "#00923F", "🇦🇪"),
    ("mashreq_bank", "#E31E24", "🇦🇪"),
    ("cbd", "#004B87", "🇦🇪"),
    ("rakbank", "#E31E24", "🇦🇪"),
    ("ajman_bank", "#00A651", "🇦🇪"),
    # Kuwait
    ("nbk", "#005EB8", "🇰🇼"),
    ("gulf_bank", "#004B87", "🇰🇼"),
    ("cbk", "#00A651", "🇰🇼"),
    ("burgan_bank", "#E31E24", "🇰🇼"),
    ("ahli_united_bank", "#00843D", "🇰🇼"),
    ("kfh", "#00923F", "🇰🇼"),
    ("boubyan_bank", "#0066B2", "🇰🇼"),
    # Qatar
    ("qnb", "#6E1D3E", "🇶🇦"),
    ("cbq", "#004B87", "🇶🇦"),
    ("doha_bank", "#E31E24", "🇶🇦"),
    ("qib", "#00923F", "🇶🇦"),
    ("masraf_alrayan", "#00A651", "🇶🇦"),
    ("ahlibank", "#00843D", "🇶🇦"),
    # Oman
    ("bank_muscat", "#E31E24", "🇴🇲"),
    ("national_bank_oman", "#00A651", "🇴🇲"),
    ("bank_dhofar", "#E31E24", "🇴🇲"),
    ("ahli_bank_oman", "#00843D", "🇴🇲"),
    ("nizwa_bank", "#00923F", "🇴🇲"),
    ("sohar_international", "#0066B2", "🇴🇲"),
    # Bahrain
    ("nbb", "#E31E24", "🇧🇭"),
    ("bbk", "#004B87", "🇧🇭"),
    ("ahli_united_bahrain", "#00843D", "🇧🇭"),
    ("bisb", "#00923F", "🇧🇭"),
    ("ithmaar_bank", "#00A651", "🇧🇭"),
    ("khaleeji_bank", "#0066B2", "🇧🇭"),
]

# Payment services
SERVICES_DATA = [
    ("government_payment", "#1E40AF"),
    ("local_payment", "#059669"),
    ("health_links", "#DC2626"),
    ("contracts", "#7C3AED"),
    ("invoices", "#EA580C"),
    ("chalets", "#0891B2"),
    ("bank_pages", "#0066B2"),
]


def hex_to_rgb(hex_color):
    """Convert hex color to RGB"""
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))


def create_bank_image(bank_id, color, flag):
    """Create simple bank OG image"""
    img = Image.new('RGB', (OG_WIDTH, OG_HEIGHT))
    draw = ImageDraw.Draw(img)
    
    # Convert color
    rgb_color = hex_to_rgb(color)
    
    # Create gradient
    for y in range(OG_HEIGHT):
        ratio = y / OG_HEIGHT
        r = int(rgb_color[0] * (1 - ratio * 0.3))
        g = int(rgb_color[1] * (1 - ratio * 0.3))
        b = int(rgb_color[2] * (1 - ratio * 0.3))
        draw.line([(0, y), (OG_WIDTH, y)], fill=(r, g, b))
    
    # Add decorative circles
    for i in range(5):
        x = 200 + i * 200
        y = 150 + (i % 2) * 200
        draw.ellipse([x-80, y-80, x+80, y+80], fill=(255, 255, 255, 30))
    
    # Add white rectangles for text areas
    draw.rounded_rectangle([(200, 200), (1000, 350)], radius=20, fill=(255, 255, 255, 240))
    draw.rounded_rectangle([(300, 400), (900, 480)], radius=15, fill=(255, 255, 255, 200))
    
    # Save
    filename = f"og-bank-{bank_id}.jpg"
    output_path = os.path.join(OUTPUT_DIR, filename)
    img.save(output_path, 'JPEG', quality=85)
    return filename


def create_service_image(service_id, color):
    """Create simple service OG image"""
    img = Image.new('RGB', (OG_WIDTH, OG_HEIGHT))
    draw = ImageDraw.Draw(img)
    
    # Convert color
    rgb_color = hex_to_rgb(color)
    
    # Create gradient
    for y in range(OG_HEIGHT):
        ratio = y / OG_HEIGHT
        r = int(rgb_color[0] * (1 - ratio * 0.3))
        g = int(rgb_color[1] * (1 - ratio * 0.3))
        b = int(rgb_color[2] * (1 - ratio * 0.3))
        draw.line([(0, y), (OG_WIDTH, y)], fill=(r, g, b))
    
    # Add geometric shapes
    draw.ellipse([100, 100, 400, 400], fill=(255, 255, 255, 40))
    draw.ellipse([800, 200, 1100, 500], fill=(255, 255, 255, 40))
    
    # Add white rectangle for text
    draw.rounded_rectangle([(150, 220), (1050, 410)], radius=25, fill=(255, 255, 255, 240))
    
    # Save
    filename = f"og-{service_id}.jpg"
    output_path = os.path.join(OUTPUT_DIR, filename)
    img.save(output_path, 'JPEG', quality=85)
    return filename


def main():
    print("🎨 Creating OG images...")
    
    # Create bank images
    print("\n📊 Creating bank images...")
    created = 0
    for bank_id, color, flag in BANKS_DATA:
        try:
            filename = create_bank_image(bank_id, color, flag)
            print(f"✅ {filename}")
            created += 1
        except Exception as e:
            print(f"❌ Failed {bank_id}: {e}")
    
    print(f"\n✅ Created {created}/{len(BANKS_DATA)} bank images")
    
    # Create service images
    print("\n📊 Creating service images...")
    created = 0
    for service_id, color in SERVICES_DATA:
        try:
            filename = create_service_image(service_id, color)
            print(f"✅ {filename}")
            created += 1
        except Exception as e:
            print(f"❌ Failed {service_id}: {e}")
    
    print(f"\n✅ Created {created}/{len(SERVICES_DATA)} service images")
    print("\n🎉 All done!")


if __name__ == "__main__":
    main()
