#!/bin/bash

# Script to create realistic placeholder images for dynamic identity system

cd "$(dirname "$0")/.." || exit

ASSETS_DIR="public/assets/dynamic-identity"

# Create high-quality hero images using ImageMagick
create_hero_image() {
    local entity=$1
    local color=$2
    local text=$3
    local num=$4
    local output="${ASSETS_DIR}/${entity}_image${num}.jpg"
    
    # Create gradient background with overlay text
    convert -size 1200x400 \
        gradient:"${color}"-"#FFFFFF" \
        -gravity center \
        -pointsize 72 -fill white -font Arial-Bold \
        -draw "text 0,0 '${text}'" \
        -quality 95 \
        "$output"
}

# Create payment share images
create_share_image() {
    local entity=$1
    local color=$2
    local text_ar=$3
    local output="${ASSETS_DIR}/${entity}_payment.jpg"
    
    convert -size 1200x630 \
        gradient:"${color}"-"#FFFFFF" \
        -gravity center \
        -pointsize 60 -fill white -font Arial-Bold \
        -draw "text 0,-100 '${text_ar}'" \
        -pointsize 40 -fill white \
        -draw "text 0,0 'منصة الدفع الإلكتروني'" \
        -pointsize 30 -fill white \
        -draw "text 0,60 'آمن وموثوق'" \
        -quality 95 \
        "$output"
}

echo "🎨 Creating realistic identity assets..."

# Check if ImageMagick is available
if command -v convert &> /dev/null; then
    echo "✓ ImageMagick found, creating high-quality images..."
    
    # Chalets
    create_hero_image "chalets" "#FF6F00" "حجز الشاليهات" "1"
    create_hero_image "chalets" "#FFA000" "شاليهات مميزة" "2"
    create_hero_image "chalets" "#FF8F00" "احجز الآن" "3"
    create_share_image "chalets" "#FF6F00" "حجز الشاليهات"
    
    # Government
    create_hero_image "gov" "#004080" "الخدمات الحكومية" "1"
    create_hero_image "gov" "#0073E6" "سداد رسوم حكومية" "2"
    create_share_image "gov" "#004080" "الدفع الحكومي"
    
    # Health
    create_hero_image "health" "#008080" "الخدمات الصحية" "1"
    create_hero_image "health" "#20B2AA" "حجز المواعيد الطبية" "2"
    create_share_image "health" "#008080" "الخدمات الصحية"
    
    echo "✅ High-quality images created!"
else
    echo "⚠️  ImageMagick not found, using SVG placeholders"
fi

echo "✨ Asset creation complete!"
