#!/bin/bash

# Comprehensive test script for Dynamic Identity System

echo "🧪 Testing Dynamic Identity System..."
echo "======================================"

cd "$(dirname "$0")/.."

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counters
PASSED=0
FAILED=0

# Test 1: Check if all required files exist
echo -e "\n${YELLOW}Test 1: Checking required files...${NC}"
required_files=(
    "src/lib/dynamicIdentity.ts"
    "src/components/DynamicIdentityProvider.tsx"
    "src/components/PaymentPageWrapper.tsx"
    "src/hooks/useAutoApplyIdentity.ts"
    "src/components/DynamicMetaTags.tsx"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file exists"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} $file missing"
        ((FAILED++))
    fi
done

# Test 2: Check asset directories
echo -e "\n${YELLOW}Test 2: Checking asset directories...${NC}"
if [ -d "public/assets/dynamic-identity" ]; then
    echo -e "${GREEN}✓${NC} Assets directory exists"
    ((PASSED++))
    
    # Count assets
    svg_count=$(find public/assets/dynamic-identity -name "*.svg" | wc -l)
    jpg_count=$(find public/assets/dynamic-identity -name "*.jpg" -o -name "*.jpeg" | wc -l)
    png_count=$(find public/assets/dynamic-identity -name "*.png" | wc -l)
    
    echo "  📊 Assets found:"
    echo "     SVG: $svg_count"
    echo "     JPG: $jpg_count"
    echo "     PNG: $png_count"
else
    echo -e "${RED}✗${NC} Assets directory missing"
    ((FAILED++))
fi

# Test 3: Check entity configurations
echo -e "\n${YELLOW}Test 3: Checking entity configurations...${NC}"
entities=(
    "chalets"
    "government_payment"
    "local_payment"
    "invoices"
    "contracts"
    "health_links"
    "bank_pages"
)

for entity in "${entities[@]}"; do
    if grep -q "\"$entity\":" src/lib/dynamicIdentity.ts; then
        echo -e "${GREEN}✓${NC} Entity '$entity' configured"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} Entity '$entity' not found"
        ((FAILED++))
    fi
done

# Test 4: Check updated payment pages
echo -e "\n${YELLOW}Test 4: Checking updated payment pages...${NC}"
payment_pages=(
    "src/pages/PaymentRecipient.tsx"
    "src/pages/PaymentBankSelector.tsx"
)

for page in "${payment_pages[@]}"; do
    if grep -q "PaymentPageWrapper" "$page"; then
        echo -e "${GREEN}✓${NC} $page uses PaymentPageWrapper"
        ((PASSED++))
    else
        echo -e "${YELLOW}⚠${NC}  $page not yet updated"
    fi
done

# Test 5: Check CSS variables
echo -e "\n${YELLOW}Test 5: Checking CSS variables...${NC}"
if grep -q "dynamic-primary" src/index.css; then
    echo -e "${GREEN}✓${NC} Dynamic CSS variables defined"
    ((PASSED++))
else
    echo -e "${RED}✗${NC} Dynamic CSS variables missing"
    ((FAILED++))
fi

# Test 6: Check TypeScript compilation
echo -e "\n${YELLOW}Test 6: Checking TypeScript compilation...${NC}"
if command -v tsc &> /dev/null; then
    if tsc --noEmit 2>/dev/null; then
        echo -e "${GREEN}✓${NC} TypeScript compiles without errors"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} TypeScript compilation errors"
        ((FAILED++))
    fi
else
    echo -e "${YELLOW}⚠${NC}  TypeScript not installed, skipping"
fi

# Summary
echo -e "\n======================================"
echo -e "📊 Test Summary:"
echo -e "  ${GREEN}Passed: $PASSED${NC}"
echo -e "  ${RED}Failed: $FAILED${NC}"

if [ $FAILED -eq 0 ]; then
    echo -e "\n${GREEN}✅ All tests passed!${NC}"
    echo -e "System is ready for production."
    exit 0
else
    echo -e "\n${RED}⚠️  Some tests failed.${NC}"
    echo -e "Please review the errors above."
    exit 1
fi
