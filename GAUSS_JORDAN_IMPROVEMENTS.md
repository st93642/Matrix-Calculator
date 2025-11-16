# Gauss-Jordan Inverse Algorithm - Implementation Details

## Overview

This document details the improvements made to the matrix inverse calculation using Gauss-Jordan elimination.

## Problem Statement

**Original Issues:**

1. Floating-point arithmetic accumulates rounding errors
2. No intelligent row swapping strategy
3. Poor numerical stability with fractional pivots
4. No verification of results
5. Difficult to follow for educational purposes

**Desired Solution:**

- Use exact integer arithmetic (fractions) throughout
- Interchanging rows to select convenient pivot points
- Avoid fractions until final steps
- Cross-check results with alternative method
- Clear step-by-step visualization

## Implementation

### 1. Fraction Class (Lines 1992-2063)

#### Design

```javascript
class Fraction {
  constructor(num, den = 1)
  gcd(a, b)                    // Greatest common divisor
  static from(val)             // Convert number to fraction
  add(other)                   // Addition
  subtract(other)              // Subtraction
  multiply(other)              // Multiplication
  divide(other)                // Division
  isZero()                     // Test if zero
  isOne()                      // Test if one
  toFloat()                    // Convert to number
  toString()                   // Display as "3/2"
  toLatex()                    // LaTeX format
}
```

#### Key Features

**Automatic Reduction (GCD)**

```javascript
constructor(num, den = 1) {
  if (den === 0) throw new Error('Denominator cannot be zero');
  const g = this.gcd(Math.abs(num), Math.abs(den));
  this.num = Math.sign(den) * (num / g);     // Reduced numerator
  this.den = Math.abs(den) / g;              // Reduced denominator
}
```

- Fractions automatically simplify
- Example: new Fraction(6, 4) becomes Fraction(3, 2)

**Type Conversion**

```javascript
static from(val) {
  if (val instanceof Fraction) return val;
  if (Number.isInteger(val)) return new Fraction(val, 1);
  // Convert float to fraction with appropriate denominator
  const str = val.toString();
  if (str.includes('e') || str.includes('E')) {
    return new Fraction(val);  // Scientific notation
  }
  const decimalPlaces = (str.split('.')[1] || '').length;
  const multiplier = Math.pow(10, decimalPlaces);
  return new Fraction(Math.round(val * multiplier), multiplier);
}
```

**Arithmetic Operations**

```javascript
add(other) {
  // (a/b) + (c/d) = (ad + bc) / bd
  other = Fraction.from(other);
  return new Fraction(
    this.num * other.den + other.num * this.den,
    this.den * other.den
  );
}

subtract(other) {
  // (a/b) - (c/d) = (ad - bc) / bd
  other = Fraction.from(other);
  return new Fraction(
    this.num * other.den - other.num * this.den,
    this.den * other.den
  );
}

multiply(other) {
  // (a/b) × (c/d) = (ac) / (bd)
  other = Fraction.from(other);
  return new Fraction(this.num * other.num, this.den * other.den);
}

divide(other) {
  // (a/b) ÷ (c/d) = (ad) / (bc)
  other = Fraction.from(other);
  if (other.num === 0) throw new Error('Division by zero');
  return new Fraction(this.num * other.den, this.den * other.num);
}
```

### 2. Improved calculateInverseCalc (Lines 2125-2212)

#### Algorithm Flow

```
1. Initialize
   - Create augmented matrix [A | I] with Fractions
   - Track row swaps

2. For each column (pivot column):
   a) Find best pivot
      - Scan rows below/on diagonal
      - Score: prefer integer (den=1), then largest |value|
      - Store best row index
   
   b) Swap if needed
      - If best_row ≠ current_row, interchange rows
      - Record swap in metadata
   
   c) Normalize pivot row
      - If pivot ≠ 1, divide entire row by pivot value
      - Maintains exact arithmetic (fraction/fraction = fraction)
   
   d) Eliminate column
      - For each other row: subtract (factor × pivot row)
      - Factor = entry in current column
      - Reduces all non-pivot entries to zero

3. Extract result
   - Right side (columns n to 2n) is A⁻¹
   - Convert Fractions to floats for display
   - Store row swap metadata

4. Return
   - 2D array of numbers (inverse matrix)
   - Attach metadata: inverse._rowSwaps
```

#### Pseudocode

```javascript
function calculateInverseCalc(A) {
  const n = A.length;
  
  // Create [A | I] with Fractions
  const augmented = Array(n).fill().map(() => Array(2*n).fill(null));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      augmented[i][j] = Fraction.from(A[i][j]);
    }
    for (let j = 0; j < n; j++) {
      augmented[i][n+j] = Fraction.from(i === j ? 1 : 0);
    }
  }
  
  // Gauss-Jordan elimination
  for (let col = 0; col < n; col++) {
    // Find best pivot row
    let bestRow = col;
    let bestScore = -1;
    for (let row = col; row < n; row++) {
      const val = augmented[row][col];
      if (val.isZero()) continue;
      let score = Math.abs(val.toFloat());
      if (val.den === 1) score += 1000;  // Integer bonus
      if (score > bestScore) {
        bestScore = score;
        bestRow = row;
      }
    }
    
    // Check for singularity
    if (augmented[bestRow][col].isZero()) {
      throw new Error('Matrix is singular');
    }
    
    // Swap rows if needed
    if (bestRow !== col) {
      [augmented[col], augmented[bestRow]] = 
      [augmented[bestRow], augmented[col]];
      rowSwaps.push({ from: bestRow, to: col });
    }
    
    // Normalize pivot to 1
    const pivot = augmented[col][col];
    if (!pivot.isOne()) {
      for (let j = 0; j < 2*n; j++) {
        augmented[col][j] = augmented[col][j].divide(pivot);
      }
    }
    
    // Eliminate other entries in column
    for (let row = 0; row < n; row++) {
      if (row !== col) {
        const factor = augmented[row][col];
        if (!factor.isZero()) {
          for (let j = 0; j < 2*n; j++) {
            augmented[row][j] = 
              augmented[row][j].subtract(
                factor.multiply(augmented[col][j])
              );
          }
        }
      }
    }
  }
  
  // Extract inverse and convert to floats
  const inverse = [];
  for (let i = 0; i < n; i++) {
    inverse[i] = [];
    for (let j = 0; j < n; j++) {
      inverse[i][j] = augmented[i][n+j].toFloat();
    }
  }
  
  inverse._rowSwaps = rowSwaps;
  return inverse;
}
```

#### Key Points

**Integer Arithmetic Preservation**

- If pivot is integer (den=1), all operations maintain integers
- Example: Row with [2, 3, 5] divided by 2 gives [1, 3/2, 5/2]
- Avoids floating-point errors

**Pivot Selection Strategy**

```javascript
let score = Math.abs(val.toFloat());
if (val.den === 1) score += 1000;  // Strongly prefer integers
```

- Integer value: gets +1000 bonus
- Non-integer: gets its absolute value
- Result: Always picks integers first, then largest

**Row Swapping Metadata**

```javascript
rowSwaps.push({ from: bestRow, to: col });
```

- Records all interchanges for display
- Helps visualize transformation
- Used for step-by-step animation

### 3. Enhanced calculateInverse Display (Lines 1612-1744)

#### Visualization Flow

```
1. Display Setup
   - Show [A | I] initial augmented matrix
   - Explain pivot strategy

2. For each column:
   - Report pivot selection (value and reason)
   - If row swap: show interchange details
   - Show intermediate [A | I] after swap
   - Show normalization operation and result
   - For each elimination: show operation and result

3. Final Steps:
   - Show final inverse matrix A⁻¹ (as decimals)
   - Cross-check with cofactor method
   - Display theoretical explanation
```

#### Display Functions

**New: displayAugmentedFractions (Lines 1747-1807)**

```javascript
function displayAugmentedFractions(matrix, label = '') {
  // Create div for augmented matrix
  // For each row:
  //   - Display matrix A part (columns 0 to n-1)
  //   - Show separator "|"
  //   - Display identity/inverse part (columns n to 2n-1)
  // 
  // Special handling for Fractions:
  //   if (val instanceof Fraction) {
  //     cell.textContent = val.toString();  // Shows "3/2"
  //   }
}
```

Features:

- Displays Fraction objects as "3/2" not "1.5"
- Clear vertical separator between A and I parts
- Readable layout for augmented matrix
- Integrates with existing `.matrix-display` styling

### 4. Cross-Checking with Cofactor Method (Lines 1984-2123)

#### Purpose

Verifies Gauss-Jordan result using independent calculation method

#### Implementation

```javascript
function calculateInverseCofactor(A) {
  const n = A.length;
  const det = calculateDeterminantCofactor(A);
  
  if (n === 1) {
    return [[1 / A[0][0]]];
  }
  
  if (n === 2) {
    return [
      [A[1][1]/det, -A[0][1]/det],
      [-A[1][0]/det, A[0][0]/det]
    ];
  }
  
  // For larger matrices:
  // 1. Calculate cofactor for each position
  // 2. Build adjugate matrix (transpose of cofactor matrix)
  // 3. A⁻¹ = adjugate(A) / det(A)
  
  const adjugate = [];
  for (let i = 0; i < n; i++) {
    adjugate[i] = [];
    for (let j = 0; j < n; j++) {
      const minor = getMinor(A, j, i);
      const cofactor = Math.pow(-1, i+j) * 
                      calculateDeterminantCofactor(minor);
      adjugate[i][j] = cofactor / det;
    }
  }
  return adjugate;
}
```

#### Verification in Display

```javascript
const inverseCofactor = calculateInverseCofactor(A);
let matches = true;
for (let i = 0; i < n && matches; i++) {
  for (let j = 0; j < n && matches; j++) {
    if (Math.abs(inverse[i][j] - inverseCofactor[i][j]) > 1e-6) {
      matches = false;
    }
  }
}

if (matches) {
  addStep('Cross-Check', 
    '✓ Verified: Result matches inverse via cofactor method', 1200);
}
```

### 5. Step-by-Step Visualization (Lines 1617-1741)

#### Steps for 3×3 Example

**Setup**

```
Step 1: Gauss-Jordan Elimination Setup
  - Show [A | I]
  - Explain improved approach with fractions

Step 2: Pivot Strategy
  - Explain selection criteria
```

**Column 1 Processing**

```
Step 3: Column 1: Row Swap (if needed)
  - Show which rows are interchanged
  - Explain why better pivot chosen

Step 4: Column 1: Pivot Selected
  - Show pivot value (as fraction if not 1)

Step 5: Column 1: Normalize Pivot
  - Show division operation
  - Display new [A | I]

Step 6: Column 1: Eliminate Row 2
  - Show subtraction operation
  - Display intermediate matrix

Step 7: Column 1: Eliminate Row 3
  - Show subtraction operation
  - Display intermediate matrix

Step 8: Column 1 Complete
  - Confirm column has correct form
```

**Columns 2 and 3 (similar pattern)**

**Verification**

```
Final: Inverse Matrix A⁻¹
  - Show as decimals

Cross-Check: Cofactor Method
  - ✓ Verified or ✗ Warning

Theory
  - Comprehensive explanation of algorithm
```

## Example: 2×2 Matrix Inverse

### Input Matrix

```
A = [4  7]
    [2  6]
```

### Step-by-Step with Fractions

**Step 1: Augmented Matrix [A | I]**

```
[4  7 | 1  0]
[2  6 | 0  1]
```

**Step 2: Column 1 - Choose Pivot**

- Row 1: value = 4 (integer) → score = 4 + 1000 = 1004
- Row 2: value = 2 (integer) → score = 2 + 1000 = 1002
- Select Row 1 (best score)

**Step 3: Normalize Pivot**

- Divide Row 1 by 4

```
[1   7/4 | 1/4   0 ]
[2   6   | 0     1 ]
```

**Step 4: Eliminate Column 1**

- Row 2 = Row 2 - 2 × Row 1

```
[1   7/4  | 1/4     0 ]
[0   6-7/2| -1/2    1 ]
= 
[1   7/4  | 1/4     0 ]
[0   5/2  | -1/2    1 ]
```

**Step 5: Column 2 - Normalize Pivot**

- Divide Row 2 by 5/2

```
[1   7/4  | 1/4     0   ]
[0   1    | -1/5    2/5 ]
```

**Step 6: Eliminate Column 2**

- Row 1 = Row 1 - (7/4) × Row 2

```
[1   0    | 1/4 + 7/20   -7/10 ]
[0   1    | -1/5         2/5  ]
=
[1   0    | 6/5      -7/10 ]
[0   1    | -1/5      2/5  ]
```

### Final Result (as decimals)

```
A⁻¹ = [1.2    -0.7 ]
      [-0.2    0.4 ]
```

## Performance Analysis

### Time Complexity

- Fraction creation: O(1) per value
- GCD computation: O(log min(numerator, denominator))
- Matrix elimination: O(n³) iterations
- Total: **O(n³)** with larger constant than float version

### Space Complexity

- Augmented matrix: O(2n²) = O(n²)
- Fraction objects: Similar to float storage
- Additional metadata: O(n) for row swaps

### Numerator/Denominator Growth

- Worst case: denominators can grow exponentially
- Example: 4×4 matrix might have denominators ~10⁶
- Mitigation: GCD reduction keeps size bounded in practice

## Advantages

1. **Exact Arithmetic**
   - No floating-point rounding errors
   - Results are mathematically exact
   - Safe for educational demonstrations

2. **Pedagogical Value**
   - Shows actual fractions: 3/2 instead of 1.5
   - Clearer understanding of operations
   - Visible row swapping strategy

3. **Numerical Stability**
   - Integer pivots prevent ill-conditioning
   - Reduced likelihood of singular matrix detection errors
   - Better behavior with integer input matrices

4. **Verification**
   - Cofactor method cross-check catches errors
   - Two independent calculation methods
   - High confidence in correctness

## Disadvantages

1. **Performance**
   - Fraction arithmetic slower than float
   - Significant overhead for large matrices
   - GCD calculation adds cost

2. **Denominator Growth**
   - Large fractions consume more memory
   - Display can become cluttered
   - JavaScript number limits for very large values

3. **Limited Scale**
   - Practical for matrices up to ~5×5
   - Beyond that, fraction explosion likely
   - No benefit over high-precision floating-point

## Usage

```javascript
// Example in calculateInverse UI function
const inverse = calculateInverseCalc(matrixA);

// The function handles:
// - Fraction arithmetic internally
// - Row selection and swapping
// - Step-by-step calculation
// - Automatic float conversion for display

// Access metadata if needed:
console.log(inverse._rowSwaps);  
// [{from: 1, to: 0}, ...]  // Shows which rows were swapped
```

## Future Enhancements

1. **Better Denominator Handling**
   - Limit fraction size to avoid explosion
   - Switch to float after certain threshold

2. **Performance**
   - Cache GCD computations
   - Use BigInt for very large numerators

3. **Visualization**
   - Show fraction simplification steps
   - Highlight which operations use integers

4. **Alternative Methods**
   - LU decomposition with fractions
   - QR decomposition (with Gram-Schmidt)
   - Comparison of methods side-by-side

---

## Conclusion

The improved Gauss-Jordan elimination with Fraction arithmetic and intelligent row swapping provides a robust, educational, and mathematically exact matrix inverse calculation. While slower than floating-point methods, it offers superior accuracy and clarity for pedagogical purposes.
