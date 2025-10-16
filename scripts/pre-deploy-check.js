#!/usr/bin/env node

/**
 * Pre-deployment Check Script
 * Verifies all configurations before deploying to Vercel
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 ManisCore E-Commerce - Pre-Deployment Check\n');

let hasErrors = false;

// Check 1: Verify vercel.json exists
console.log('📄 Checking vercel.json...');
if (fs.existsSync('vercel.json')) {
  console.log('✅ vercel.json found\n');
} else {
  console.log('❌ vercel.json NOT found\n');
  hasErrors = true;
}

// Check 2: Verify environment files
console.log('🔐 Checking environment files...');
const envFiles = ['.env.local', '.env.production'];
const envFound = envFiles.filter(file => fs.existsSync(file));

if (envFound.length > 0) {
  console.log(`✅ Found: ${envFound.join(', ')}\n`);
  
  // Check for required variables
  console.log('🔑 Checking required environment variables...');
  const requiredVars = [
    'NEXT_PUBLIC_DASHBOARD_API_URL',
    'NEXT_PUBLIC_SITE_URL',
    'NEXT_PUBLIC_DEFAULT_COMPANY'
  ];
  
  envFound.forEach(file => {
    console.log(`\n  Checking ${file}:`);
    const content = fs.readFileSync(file, 'utf-8');
    requiredVars.forEach(varName => {
      if (content.includes(varName)) {
        console.log(`  ✅ ${varName}`);
      } else {
        console.log(`  ❌ ${varName} missing`);
        hasErrors = true;
      }
    });
  });
  console.log('');
} else {
  console.log('⚠️  No environment files found (.env.local or .env.production)\n');
  console.log('⚠️  Make sure to set environment variables in Vercel Dashboard\n');
}

// Check 3: Verify next.config.js
console.log('⚙️  Checking next.config.js...');
if (fs.existsSync('next.config.js')) {
  const config = fs.readFileSync('next.config.js', 'utf-8');
  if (config.includes('remotePatterns')) {
    console.log('✅ next.config.js configured with remotePatterns\n');
  } else {
    console.log('⚠️  next.config.js may need remotePatterns for images\n');
  }
} else {
  console.log('❌ next.config.js NOT found\n');
  hasErrors = true;
}

// Check 4: Verify package.json scripts
console.log('📦 Checking package.json...');
if (fs.existsSync('package.json')) {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
  const requiredScripts = ['dev', 'build', 'start'];
  
  requiredScripts.forEach(script => {
    if (pkg.scripts && pkg.scripts[script]) {
      console.log(`✅ ${script} script found`);
    } else {
      console.log(`❌ ${script} script missing`);
      hasErrors = true;
    }
  });
  console.log('');
} else {
  console.log('❌ package.json NOT found\n');
  hasErrors = true;
}

// Check 5: Verify API client
console.log('🌐 Checking API client...');
const apiClientPath = path.join('src', 'lib', 'api', 'client.ts');
if (fs.existsSync(apiClientPath)) {
  console.log('✅ API client found\n');
} else {
  console.log('❌ API client NOT found\n');
  hasErrors = true;
}

// Check 6: Verify key components
console.log('🧩 Checking key components...');
const components = [
  'src/app/[company]/layout.tsx',
  'src/app/[company]/page.tsx',
  'src/components/layout/Navigation.tsx',
  'src/components/catalog/ProductCard.tsx'
];

components.forEach(comp => {
  if (fs.existsSync(comp)) {
    console.log(`✅ ${comp}`);
  } else {
    console.log(`❌ ${comp} missing`);
    hasErrors = true;
  }
});
console.log('');

// Final summary
console.log('=' .repeat(50));
if (hasErrors) {
  console.log('❌ Pre-deployment check FAILED');
  console.log('⚠️  Please fix the errors above before deploying\n');
  process.exit(1);
} else {
  console.log('✅ Pre-deployment check PASSED');
  console.log('🚀 Ready to deploy to Vercel!\n');
  console.log('Next steps:');
  console.log('  1. git add .');
  console.log('  2. git commit -m "Ready for deployment"');
  console.log('  3. git push');
  console.log('  4. Set environment variables in Vercel Dashboard');
  console.log('');
}
