const puppeteer = require('puppeteer');

(async () => {
  let browser;
  try {
    browser = await puppeteer.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
    });
    const page = await browser.newPage();
    
    // Listen for console events
    page.on('console', msg => {
      console.log('CONSOLE:', msg.type(), msg.text());
    });
    
    page.on('pageerror', error => {
      console.error('PAGE ERROR:', error.message);
    });
    
    // Navigate to the vector calculator
    await page.goto(`file:///home/engine/project/vector-calculator.html`);
    
    // Wait for page to load
    await page.waitForSelector('#dimension', { timeout: 10000 });
    console.log('Page loaded successfully');
    
    // Test coordinate system button
    console.log('Testing coordinate system button...');
    const coordButtonExists = await page.evaluate(() => {
      return !!document.querySelector('button[onclick="plotCoordinateSystem()"]');
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
          try {
            window.plotCoordinateSystem();
            return 'success';
          } catch (e) {
            return 'error: ' + e.message;
          }
        }).then(result => {
          console.log('plotCoordinateSystem function result:', result);
        });
      }
    }
    
    console.log('Test completed');
    
  } catch (error) {
    console.error('Error during test:', error);
  } finally {
    if (browser) {
      await browser.close();
    }
    process.exit(0);
  }
})();