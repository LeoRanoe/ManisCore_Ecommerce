#!/usr/bin/env node

/**
 * E-Commerce Deployment Verification Script
 * 
 * This script verifies that the e-commerce site is working correctly
 * by testing the key API endpoints and pages.
 */

const DASHBOARD_API_URL = process.env.NEXT_PUBLIC_DASHBOARD_API_URL || 'https://manis-core-dashboard.vercel.app';
const DEFAULT_COMPANY = process.env.NEXT_PUBLIC_DEFAULT_COMPANY || 'maniscor';

const tests = [
  {
    name: 'Dashboard API - Health Check',
    url: `${DASHBOARD_API_URL}/api/health`,
    optional: true
  },
  {
    name: 'Dashboard API - Get Company',
    url: `${DASHBOARD_API_URL}/api/public/companies/${DEFAULT_COMPANY}`,
    validate: (data) => {
      if (!data.name) throw new Error('Company name missing');
      if (!data.slug) throw new Error('Company slug missing');
      console.log(`  ✓ Company: ${data.name} (${data.slug})`);
      return true;
    }
  },
  {
    name: 'Dashboard API - Get Products',
    url: `${DASHBOARD_API_URL}/api/public/products?companySlug=${DEFAULT_COMPANY}&page=1&limit=5`,
    validate: (data) => {
      if (!data.data) throw new Error('Products data missing');
      if (!Array.isArray(data.data)) throw new Error('Products data is not an array');
      console.log(`  ✓ Found ${data.pagination?.total || 0} total products`);
      console.log(`  ✓ Fetched ${data.data.length} products`);
      return true;
    }
  },
  {
    name: 'Dashboard API - Get Testimonials',
    url: `${DASHBOARD_API_URL}/api/public/testimonials?companySlug=${DEFAULT_COMPANY}`,
    validate: (data) => {
      if (!data.data) throw new Error('Testimonials data missing');
      if (!Array.isArray(data.data)) throw new Error('Testimonials data is not an array');
      console.log(`  ✓ Found ${data.data.length} testimonials`);
      return true;
    }
  },
  {
    name: 'Dashboard API - Get FAQs',
    url: `${DASHBOARD_API_URL}/api/public/faqs?companySlug=${DEFAULT_COMPANY}`,
    validate: (data) => {
      if (!data.data) throw new Error('FAQs data missing');
      if (!Array.isArray(data.data)) throw new Error('FAQs data is not an array');
      console.log(`  ✓ Found ${data.data.length} FAQs`);
      return true;
    }
  },
  {
    name: 'Dashboard API - Get Banners',
    url: `${DASHBOARD_API_URL}/api/public/banners?companySlug=${DEFAULT_COMPANY}`,
    validate: (data) => {
      if (!data.data) throw new Error('Banners data missing');
      if (!Array.isArray(data.data)) throw new Error('Banners data is not an array');
      console.log(`  ✓ Found ${data.data.length} banners`);
      return true;
    }
  }
];

async function runTest(test) {
  try {
    console.log(`\n🧪 Testing: ${test.name}`);
    console.log(`   URL: ${test.url}`);
    
    const response = await fetch(test.url, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    console.log(`   Status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorText = await response.text();
      if (test.optional) {
        console.log(`   ⚠️  Optional test failed: ${errorText}`);
        return { passed: true, optional: true };
      }
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    
    if (test.validate) {
      test.validate(data);
    }

    console.log(`   ✅ PASSED`);
    return { passed: true };

  } catch (error) {
    console.log(`   ❌ FAILED: ${error.message}`);
    return { passed: false, error: error.message };
  }
}

async function main() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║   E-Commerce Deployment Verification                       ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log('\n📋 Configuration:');
  console.log(`   Dashboard API: ${DASHBOARD_API_URL}`);
  console.log(`   Default Company: ${DEFAULT_COMPANY}`);
  console.log('\n🚀 Running tests...');

  const results = [];
  
  for (const test of tests) {
    const result = await runTest(test);
    results.push({ ...result, name: test.name });
  }

  console.log('\n\n╔════════════════════════════════════════════════════════════╗');
  console.log('║   Test Results Summary                                     ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;
  const total = results.length;

  results.forEach(result => {
    const icon = result.passed ? '✅' : '❌';
    const status = result.optional ? '⚠️  (Optional)' : (result.passed ? 'PASSED' : 'FAILED');
    console.log(`${icon} ${result.name}: ${status}`);
    if (result.error) {
      console.log(`   Error: ${result.error}`);
    }
  });

  console.log(`\n📊 Total: ${passed}/${total} tests passed`);

  if (failed > 0) {
    console.log('\n❌ Some tests failed. Please check the Dashboard API and environment variables.');
    console.log('\n💡 Troubleshooting:');
    console.log('   1. Verify NEXT_PUBLIC_DASHBOARD_API_URL is correct');
    console.log('   2. Check if the Dashboard API is running and accessible');
    console.log('   3. Verify the company slug exists in the database');
    console.log('   4. Check Vercel function logs for errors');
    process.exit(1);
  } else {
    console.log('\n✅ All tests passed! The e-commerce site should work correctly.');
    console.log('\n🚀 Next steps:');
    console.log('   1. Deploy to Vercel: git push');
    console.log('   2. Check Vercel deployment logs');
    console.log('   3. Test the live site');
    console.log(`   4. Visit: https://your-site.vercel.app/${DEFAULT_COMPANY}`);
  }
}

main().catch(error => {
  console.error('\n💥 Fatal error:', error);
  process.exit(1);
});
