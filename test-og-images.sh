#!/bin/bash

# Test all OG images on GitHub Raw CDN

echo "Testing Open Graph images on GitHub Raw CDN..."
echo "=============================================="
echo ""

BASE_URL="https://raw.githubusercontent.com/you3333ef/Youssef-Dafa/main/public"

IMAGES=(
  "og-aramex.jpg"
  "og-dhl.jpg"
  "og-fedex.jpg"
  "og-ups.jpg"
  "og-smsa.jpg"
  "og-naqel.jpg"
  "og-zajil.jpg"
  "og-bahpost.jpg"
  "og-empost.jpg"
  "og-saudipost.jpg"
  "og-kwpost.jpg"
  "og-qpost.jpg"
  "og-omanpost.jpg"
)

SUCCESS=0
FAILED=0

for img in "${IMAGES[@]}"; do
  URL="${BASE_URL}/${img}"
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$URL")
  
  if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ $img - HTTP $HTTP_CODE"
    SUCCESS=$((SUCCESS + 1))
  else
    echo "❌ $img - HTTP $HTTP_CODE"
    FAILED=$((FAILED + 1))
  fi
done

echo ""
echo "=============================================="
echo "Results: $SUCCESS successful, $FAILED failed"
echo "=============================================="
