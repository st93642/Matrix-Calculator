const puppeteer = require('puppeteer');

(async () => {
  let browser;
  try {
    browser = await puppeteer.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    // Listen for console events
    page.on('console', msg => {
      console.log('CONSOLE:', msg.type(), msg.text());
    });
    
    page.on('pageerror', error => {
      console.error('PAGE ERROR:', error.message);
    });
    
    page.on('requestfailed', request => {
      console.error('REQUEST FAILED:', request.url(), request.failure().errorText);
    });
    
    // Navigate to the vector calculator
    await page.goto('http://localhost:8000/vector-calculator.html');
    
    // Wait for page to load
    await page.waitForSelector('#dimension', { timeout: 10000 });
    console.log('Page loaded successfully');
    
    // Test coordinate system button
    console.log('Testing coordinate system button...');
    const coordButtonExists = await page.evaluate(() => {
      const button = document.querySelector('button[onclick="plotCoordinateSystem()"]');
      return button ? true : false;
    });
    
    console.log('Coordinate system button exists:', coordButtonExists);
    
    if (coordButtonExists) {
      // Test the function exists
      const functionExists = await page.evaluate(() => {
        return typeof window.plotCoordinateSystem === 'function';
      });
      console.log('plotCoordinateSystem function exists:', functionExists);
      
      if (functionExists) {
        // Call the function directly
        await page.evaluate(() => {
          window.plotCoordinateSystem();
        });
        console.log('plotCoordinateSystem function called');
      }
    }
    
    // Test plot vectors button
    console.log('Testing plot vectors button...');
    const plotButtonExists = await page.evaluate(() => {
      const button = document.querySelector('button[onclick="plotVectors()"]');
      return button ? true : false;
    });
    
    console.log('Plot vectors button exists:', plotButtonExists);
    
    if (plotButtonExists) {
      // Test the function exists
      const functionExists = await page.evaluate(() => {
        return typeof window.plotVectors === 'function';
      });
      console.log('plotVectors function exists:', functionExists);
      
      if (functionExists) {
        // Add some input first
        await page.evaluate(() => {
          document.getElementById('vecA').value = '1,2,3';
        });
        
        // Call the function directly
        await page.evaluate(() => {
          window.plotVectors();
        });
        console.log('plotVectors function called');
      }
    }
    
    console.log('Test completed successfully');
    
  } catch (error) {
    console.error('Error during test:', error);
  } finally {
    if (browser) {
      await browser.close();
    }
    process.exit(0);
  }
})();