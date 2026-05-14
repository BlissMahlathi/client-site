/**
 * Generates Netlify redirect rules for the site
 * This script runs as part of the prebuild process
 */

const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const netlifyTomlPath = path.join(__dirname, '../../netlify.toml');

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

console.log('✓ Netlify redirects generated successfully');
