// Test script for Dashboard Public APIs
// Run with: node scripts/test-apis.js

const BASE_URL = process.env.DASHBOARD_URL || 'http://localhost:3000';
const COMPANY_SLUG = 'maniscor';

async function testAPI(endpoint, description) {
  try {
    console.log(`\n🧪 Testing: ${description}`);
    console.log(`   URL: ${endpoint}`);
    
    const response = await fetch(endpoint);
    const data = await response.json();
    
    if (response.ok) {
      console.log(`   ✅ Success (${response.status})`);
      console.log(`   Data:`, JSON.stringify(data, null, 2).substring(0, 200));
    } else {
      console.log(`   ❌ Failed (${response.status})`);
      console.log(`   Error:`, data);
    }
  } catch (error) {
    console.log(`   ❌ Error:`, error.message);
  }
}

async function runTests() {
  console.log('🚀 Starting API Tests...');
  console.log(`📡 Base URL: ${BASE_URL}`);
  console.log(`🏢 Company: ${COMPANY_SLUG}\n`);

  // Test Company API
  await testAPI(
    `${BASE_URL}/api/public/companies/${COMPANY_SLUG}`,
    'Get Company Details'
  );

  // Test Products API
  await testAPI(
    `${BASE_URL}/api/public/products?companySlug=${COMPANY_SLUG}&limit=5`,
    'Get Products'
  );

  // Test Reviews API
  await testAPI(
    `${BASE_URL}/api/public/reviews?companySlug=${COMPANY_SLUG}`,
    'Get Reviews'
  );

  // Test FAQs API
  await testAPI(
    `${BASE_URL}/api/public/faqs?companySlug=${COMPANY_SLUG}`,
    'Get FAQs'
  );

  // Test Banners API
  await testAPI(
    `${BASE_URL}/api/public/banners?companySlug=${COMPANY_SLUG}`,
    'Get Banners'
  );

  // Test Testimonials API
  await testAPI(
    `${BASE_URL}/api/public/testimonials?companySlug=${COMPANY_SLUG}`,
    'Get Testimonials'
  );

  console.log('\n✨ Tests Complete!\n');
}

runTests();
