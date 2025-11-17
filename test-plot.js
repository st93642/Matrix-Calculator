const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  // Listen for console events
  page.on('console', msg => {
    console.log('CONSOLE:', msg.text());
  });
  
  page.on('pageerror', error => {
    console.error('PAGE ERROR:', error.message);
  });
  
  try {
    // Navigate to the vector calculator
    await page.goto('http://localhost:8000/vector-calculator.html');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    console.log('Page loaded successfully');
    
    // Test coordinate system button
    console.log('Testing coordinate system button...');
    const coordButton = page.locator('button:has-text("Coordinate System")');
    await coordButton.waitFor({ state: 'visible', timeout: 5000 });
    console.log('Coordinate system button found');
    
    // Click the button
    await coordButton.click();
    console.log('Coordinate system button clicked');
    
    // Wait a bit to see if popup appears
    await page.waitForTimeout(2000);
    
    // Test plot vectors button - first add some input
    console.log('Adding vector input...');
    await page.fill('#vecA', '1,2,3');
    
    console.log('Testing plot vectors button...');
    const plotButton = page.locator('button:has-text("Plot Vectors & Points")');
    await plotButton.waitFor({ state: 'visible', timeout: 5000 });
    console.log('Plot vectors button found');
    
    // Click the button
    await plotButton.click();
    console.log('Plot vectors button clicked');
    
    // Wait a bit to see if popup appears
    await page.waitForTimeout(2000);
    
    // Test an operation and its plot button
    console.log('Testing dot product operation...');
    await page.fill('#vecB', '4,5,6');
    
    const dotButton = page.locator('button:has-text("Dot Product")');
    await dotButton.click();
    console.log('Dot product button clicked');
    
    // Wait for result
    await page.waitForTimeout(2000);
    
    // Look for plot button in results
    const plotResultButton = page.locator('button:has-text("Plot")');
    if (await plotResultButton.isVisible()) {
      console.log('Plot result button found, clicking...');
      await plotResultButton.first().click();
      console.log('Plot result button clicked');
    } else {
      console.log('No plot result button found');
    }
    
    await page.waitForTimeout(3000);
    
  } catch (error) {
    console.error('Error during test:', error);
  } finally {
    await browser.close();
    process.exit(0);
  }
})();