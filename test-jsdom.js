const fs = require('fs');
const { JSDOM } = require('jsdom');

// Read the HTML file
const html = fs.readFileSync('/home/engine/project/vector-calculator.html', 'utf8');

// Create a virtual DOM
const dom = new JSDOM(html, { runScripts: "dangerously" });
const window = dom.window;

// Execute the scripts
try {
  // Check if the plotting functions are defined
  console.log('Checking if functions are defined...');
  
  // Check if window.plotVectors exists after script execution
  setTimeout(() => {
    if (typeof window.plotVectors === 'function') {
      console.log('✅ plotVectors function is defined');
    } else {
      console.log('❌ plotVectors function is NOT defined');
    }
    
    if (typeof window.plotCoordinateSystem === 'function') {
      console.log('✅ plotCoordinateSystem function is defined');
    } else {
      console.log('❌ plotCoordinateSystem function is NOT defined');
    }
    
    if (typeof window.plotOperationResult === 'function') {
      console.log('✅ plotOperationResult function is defined');
    } else {
      console.log('❌ plotOperationResult function is NOT defined');
    }
    
    // Check for any script errors
    console.log('Script execution completed');
  }, 100);
  
} catch (error) {
  console.error('Error executing script:', error);
}