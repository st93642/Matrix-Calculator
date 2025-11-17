# Matrix Calculator - Core Operations

**For Using the Calculator:**

- Open: `matrix-calculator.html` in your browser
- Three core matrix operations available through the UI

## Supported Operations

### Matrix Operations

✅ **Matrix Multiplication** - Multiply matrices A × B with step-by-step visualization
✅ **Determinant Calculation** - Calculate det(A) using Gaussian elimination with integer-first arithmetic
✅ **Matrix Inverse** - Calculate A⁻¹ using Gauss-Jordan elimination with Fraction class for exact arithmetic

## Key Components

| Component | Purpose |
|-----------|---------|
| Fraction Class | Exact rational arithmetic for inverse calculations |
| calculateInverseCofactor() | Alternative inverse method for cross-verification |
| calculateInverseCalc() | Core inverse algorithm using Fractions |
| calculateInverse() | Enhanced inverse visualization with integer-first heuristics |
| calculateDeterminant() | Gaussian elimination determinant with optional Fractions |
| multiplyMatrices() | Matrix multiplication with visual step-by-step display |
| displayAugmented() | Display helper for augmented matrices |
| Test infrastructure | Automated tests for all three operations |
| UI framework | Clean, responsive interface |

---

## Quick Feature Summary

### What Was Implemented

✅ **Exact Integer Arithmetic**

- Fraction class for rational calculations
- No floating-point rounding errors
- Results shown as fractions (e.g., "3/2" not "1.5")

✅ **Smart Pivot Selection**

- Prefers integer pivot values
- Falls back to largest absolute value
- Avoids numerical instability

✅ **Row Interchanging**

- Automatically swaps rows for better pivots
- Tracks and displays all swaps
- Shows which rows are interchanged and why

✅ **Enhanced Visualization**

- Shows initial augmented matrix [A | I]
- Displays all intermediate steps
- Shows elimination operations step-by-step
- Fractions visible throughout

✅ **Cross-Verification**

- Alternative calculation via cofactor method
- Automatic comparison of results
- Success/warning indicator in UI

---

## Usage Guide

### Running the Calculator

1. **Open in Browser**

   ```bash
   Open matrix-calculator.html in any modern browser
   ```

2. **Set Matrix Sizes**
   - Change "Matrix A Size" and "Matrix B Size" dropdowns to desired sizes (1×1 to 5×5)
   - Matrix values auto-generate randomly

3. **Choose an Operation**
   - **✖️ Multiply A × B** - Matrix multiplication with visual step-by-step process
   - **📊 Det(A)** - Calculate determinant using Gaussian elimination
   - **🔄⁻¹ Inverse A⁻¹** - Calculate inverse with Gauss-Jordan elimination
   
4. **View Step-by-Step Results**
   - Watch animations and intermediate steps
   - See fractions displayed for inverse (e.g., "3/2")
   - Observe row swaps and pivot selection
   - Cross-verification with cofactor method (for inverse)
   - Read theoretical explanations

---

## Technology Stack

### Frontend

- **HTML5**: Structure
- **CSS3**: Styling with animations
- **JavaScript ES6**: Logic with classes and arrow functions
- **Bootstrap 5 CDN**: Responsive layout

### No External Dependencies

- All code self-contained in single HTML file
- Bootstrap only for styling (replaceable)
- Works offline except for Bootstrap CDN

### Browser Requirements

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6 support (class, const/let, arrow functions)
- Responsive design works on desktop and tablet

---

## Performance Characteristics

### Strengths

✅ Exact arithmetic (no rounding errors with Fraction class)
✅ Educational value (step-by-step visualization)
✅ Integer-first pivot selection for numerical stability
✅ Clear visualization with animations
✅ Cross-verification (cofactor method for inverse)

### Features

- **Gauss-Jordan elimination**: Integer-first heuristics for inverse calculation
- **Fraction class**: Exact rational arithmetic when needed
- **Gaussian elimination**: Efficient determinant calculation
- **Matrix multiplication**: Visual step-by-step process
- **Comprehensive testing**: Built-in test infrastructure

---

## Quick Links

📂 **Main Application**: `matrix-calculator.html`

📖 **Documentation**:

- Overview: `INDEX.md` (you are here)
- Developer Guide: `.github/copilot-instructions.md`
