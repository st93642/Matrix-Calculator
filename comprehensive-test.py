#!/usr/bin/env python3
"""
Comprehensive test for vector calculator plotting functionality
"""

import subprocess
import time
import tempfile
import os

def test_syntax():
    """Test JavaScript syntax"""
    print("🔍 Testing JavaScript syntax...")
    
    # Extract JavaScript and check syntax with Node.js
    with tempfile.NamedTemporaryFile(mode='w', suffix='.js', delete=False) as f:
        subprocess.run(['sed', '-n', '431,2009p', '/home/engine/project/vector-calculator.html'], 
                      stdout=f, check=True)
        js_file = f.name
    
    try:
        result = subprocess.run(['node', '-c', js_file], 
                              capture_output=True, text=True)
        if result.returncode == 0:
            print("✅ JavaScript syntax is valid")
            return True
        else:
            print(f"❌ JavaScript syntax error: {result.stderr}")
            return False
    finally:
        os.unlink(js_file)

def test_function_definitions():
    """Test that all required functions are defined"""
    print("\n🔍 Testing function definitions...")
    
    with open('/home/engine/project/vector-calculator.html', 'r') as f:
        content = f.read()
    
    functions = [
        ('function plotVectors()', 'plotVectors'),
        ('function plotCoordinateSystem()', 'plotCoordinateSystem'),
        ('function plotOperationResult(', 'plotOperationResult')
    ]
    
    all_found = True
    for func_def, func_name in functions:
        if func_def in content:
            print(f"✅ {func_name} function definition found")
        else:
            print(f"❌ {func_name} function definition NOT found")
            all_found = False
    
    return all_found

def test_button_handlers():
    """Test that buttons have proper onclick handlers"""
    print("\n🔍 Testing button onclick handlers...")
    
    with open('/home/engine/project/vector-calculator.html', 'r') as f:
        content = f.read()
    
    handlers = [
        ('onclick="plotCoordinateSystem()"', 'Coordinate System button'),
        ('onclick="plotVectors()"', 'Plot Vectors button')
    ]
    
    all_found = True
    for handler, button_name in handlers:
        if handler in content:
            print(f"✅ {button_name} has proper onclick handler")
        else:
            print(f"❌ {button_name} onclick handler NOT found")
            all_found = False
    
    return all_found

def test_template_literals():
    """Test for template literal syntax issues"""
    print("\n🔍 Testing template literal syntax...")
    
    with open('/home/engine/project/vector-calculator.html', 'r') as f:
        content = f.read()
    
    # Look for nested backticks in template literals (which cause syntax errors)
    if '${`' in content:
        print("❌ Found nested backticks in template literals (syntax issue)")
        return False
    else:
        print("✅ No nested backticks found in template literals")
        return True

def test_server_functionality():
    """Test that the page loads correctly via HTTP server"""
    print("\n🔍 Testing HTTP server functionality...")
    
    # Start server
    server_process = subprocess.Popen(['python3', '-m', 'http.server', '8000'], 
                                    stdout=subprocess.DEVNULL, 
                                    stderr=subprocess.DEVNULL)
    
    try:
        # Wait for server to start
        time.sleep(2)
        
        # Test page load
        result = subprocess.run(['curl', '-s', 'http://localhost:8000/vector-calculator.html'], 
                              capture_output=True, text=True)
        
        if result.returncode == 0 and len(result.stdout) > 1000:
            print("✅ Page loads successfully via HTTP server")
            return True
        else:
            print("❌ Page failed to load via HTTP server")
            return False
            
    finally:
        server_process.terminate()
        server_process.wait()

def main():
    """Run all tests"""
    print("🚀 Running Vector Calculator Plotting Functionality Tests\n")
    
    tests = [
        ("JavaScript Syntax", test_syntax),
        ("Function Definitions", test_function_definitions),
        ("Button Handlers", test_button_handlers),
        ("Template Literals", test_template_literals),
        ("Server Functionality", test_server_functionality)
    ]
    
    results = []
    for test_name, test_func in tests:
        try:
            result = test_func()
            results.append((test_name, result))
        except Exception as e:
            print(f"❌ {test_name} test failed with exception: {e}")
            results.append((test_name, False))
    
    # Summary
    print("\n" + "="*50)
    print("📊 TEST SUMMARY")
    print("="*50)
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} {test_name}")
    
    print(f"\nOverall: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! The plotting functionality should now work correctly.")
        return True
    else:
        print("⚠️  Some tests failed. Please review the issues above.")
        return False

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)