// Simple test to check if the functions are properly defined
const fs = require('fs');

// Read the HTML file
const html = fs.readFileSync('/home/engine/project/vector-calculator.html', 'utf8');

// Check for function definitions
console.log('Checking for function definitions...');

// Check if plotVectors function is properly defined
const plotVectorsMatch = html.match(/function plotVectors\(\)\s*\{/);
if (plotVectorsMatch) {
  console.log('✅ plotVectors function definition found');
} else {
  console.log('❌ plotVectors function definition NOT found');
}

// Check if plotCoordinateSystem function is properly defined
const plotCoordinateSystemMatch = html.match(/function plotCoordinateSystem\(\)\s*\{/);
if (plotCoordinateSystemMatch) {
  console.log('✅ plotCoordinateSystem function definition found');
} else {
  console.log('❌ plotCoordinateSystem function definition NOT found');
}

// Check if plotOperationResult function is properly defined
const plotOperationResultMatch = html.match(/function plotOperationResult\(\)\s*\{/);
if (plotOperationResultMatch) {
  console.log('✅ plotOperationResult function definition found');
} else {
  console.log('❌ plotOperationResult function definition NOT found');
}

// Check for syntax errors in template literals
console.log('\nChecking for template literal syntax issues...');

// Look for nested backticks in template literals
const templateLiteralIssues = html.match(/\$\{.*?\`.*?\$\{.*?\`.*?\}/g);
if (templateLiteralIssues) {
  console.log('❌ Found nested backticks in template literals:');
  templateLiteralIssues.forEach((issue, index) => {
    console.log(`  ${index + 1}: ${issue.substring(0, 100)}...`);
  });
} else {
  console.log('✅ No nested backticks found in template literals');
}

// Check for any remaining syntax issues
const scriptSection = html.substring(html.indexOf('<script>') + 8, html.indexOf('</script>'));
try {
  // This is a simple syntax check
  new Function(scriptSection);
  console.log('✅ JavaScript syntax appears to be valid');
} catch (e) {
  console.log('❌ JavaScript syntax error:', e.message);
}

console.log('\nChecking for onclick handlers...');

// Check if buttons have proper onclick handlers
const coordButtonMatch = html.match(/onclick="plotCoordinateSystem\(\)"/);
if (coordButtonMatch) {
  console.log('✅ Coordinate system button has proper onclick handler');
} else {
  console.log('❌ Coordinate system button onclick handler NOT found');
}

const plotButtonMatch = html.match(/onclick="plotVectors\(\)"/);
if (plotButtonMatch) {
  console.log('✅ Plot vectors button has proper onclick handler');
} else {
  console.log('❌ Plot vectors button onclick handler NOT found');
}

console.log('\nValidation complete!');