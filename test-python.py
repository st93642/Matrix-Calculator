#!/usr/bin/env python3

import subprocess
import time
import os

# Start the server
server_process = subprocess.Popen(['python3', '-m', 'http.server', '8000'], 
                                stdout=subprocess.DEVNULL, 
                                stderr=subprocess.DEVNULL)

try:
    # Wait for server to start
    time.sleep(2)
    
    # Test with curl to see if the page loads
    result = subprocess.run(['curl', '-s', 'http://localhost:8000/vector-calculator.html'], 
                          capture_output=True, text=True)
    
    if result.returncode == 0:
        print("✅ Server is running and page loads successfully")
        
        # Check if the functions are present in the HTML
        if 'function plotVectors()' in result.stdout:
            print("✅ plotVectors function definition found")
        else:
            print("❌ plotVectors function definition NOT found")
            
        if 'function plotCoordinateSystem()' in result.stdout:
            print("✅ plotCoordinateSystem function definition found")
        else:
            print("❌ plotCoordinateSystem function definition NOT found")
            
        if 'function plotOperationResult(' in result.stdout:
            print("✅ plotOperationResult function definition found")
        else:
            print("❌ plotOperationResult function definition NOT found")
            
        # Check for onclick handlers
        if 'onclick="plotCoordinateSystem()"' in result.stdout:
            print("✅ Coordinate system button onclick handler found")
        else:
            print("❌ Coordinate system button onclick handler NOT found")
            
        if 'onclick="plotVectors()"' in result.stdout:
            print("✅ Plot vectors button onclick handler found")
        else:
            print("❌ Plot vectors button onclick handler NOT found")
            
        # Check for template literal issues
        if '${`' in result.stdout:
            print("❌ Found potential template literal syntax issues")
        else:
            print("✅ No obvious template literal syntax issues found")
            
    else:
        print("❌ Server failed to start or page not accessible")
        
finally:
    # Clean up
    server_process.terminate()
    server_process.wait()
    print("✅ Server stopped")