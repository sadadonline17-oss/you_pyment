const { handler } = require('./netlify/functions/generate-payment-meta.js');

async function testGenerator() {
  console.log('🧪 Testing Payment Metadata Generator\n');
  console.log('=' .repeat(80));
  
  const testCases = [
    {
      name: 'Saudi Shipping Company',
      params: {
        company: 'SMSA Express',
        title: 'COD Payment',
        currency: 'SAR'
      }
    },
    {
      name: 'UAE Logistics',
      params: {
        company: 'Aramex',
        title: 'Invoice #54321',
        currency: 'AED'
      }
    },
    {
      name: 'International Payment',
      params: {
        company: 'DHL Global',
        title: 'Shipping Fee',
        currency: 'USD'
      }
    }
  ];

  for (const testCase of testCases) {
    console.log(`\n📦 Test: ${testCase.name}`);
    console.log('-'.repeat(80));
    
    const event = {
      httpMethod: 'POST',
      body: JSON.stringify(testCase.params)
    };
    
    try {
      const result = await handler(event, {});
      
      if (result.statusCode === 200) {
        const data = JSON.parse(result.body);
        console.log('✅ Success!\n');
        console.log(JSON.stringify(data, null, 2));
      } else {
        console.log('❌ Error:', result.statusCode);
        console.log(result.body);
      }
    } catch (error) {
      console.log('❌ Exception:', error.message);
    }
  }
  
  console.log('\n' + '='.repeat(80));
  console.log('🎉 Testing Complete!');
}

testGenerator().catch(console.error);
