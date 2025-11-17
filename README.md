# Matrix & Vector Calculator Suite

A comprehensive collection of single-file, interactive web applications for linear algebra operations. Featuring a **Matrix Calculator with symbolic algebra** and a **Vector Calculator with 2D/3D support** — both with full step-by-step visualization.

## 🚀 Quick Start

Both tools are single HTML files and can be opened directly or served locally.

### Option 1: Open Directly in Browser

```bash
# Matrix Calculator
open matrix-calculator.html

# Vector Calculator (NEW!)
open vector-calculator.html
```

### Option 2: Serve Locally (Recommended)

```bash
python3 -m http.server 8000
# Then visit:
# - Matrix Calculator: http://localhost:8000/matrix-calculator.html
# - Vector Calculator: http://localhost:8000/vector-calculator.html
```

---

## 📊 Tool Selection Guide

### Matrix Calculator
Perfect for symbolic matrix operations, formula derivation, and parametric analysis.

**Best for:**
- Matrix multiplication with variables
- Determinant and inverse calculations
- Symbolic algebra and polynomial expressions
- Educational demonstrations of linear algebra concepts

[**🔧 Matrix Calculator Documentation** ↓](#matrix-calculator-documentation)

### Vector Calculator (NEW!)
Dedicated to vector operations in 2D and 3D with comprehensive analysis tools.

**Best for:**
- Vector operations (dot product, cross product)
- Geometric calculations (distances, angles, projections)
- 2D/3D vector manipulation
- Educational visualization of vector concepts

[**📐 Vector Calculator Documentation** ↓](#vector-calculator-documentation)

---

# Matrix Calculator Documentation

## ✨ Features

### Matrix Operations

- **✖️ Matrix Multiplication** - Multiply matrices A × B with step-by-step visualization
- **📊 Determinant Calculation** - Calculate det(A) using Gaussian elimination
- **🔄 Matrix Inverse** - Calculate A⁻¹ using Gauss-Jordan elimination with cofactor verification
- **🧪 Comprehensive Testing** - Built-in test suite for all operations

### 🆕 Symbolic Algebra Support

- **Variables** - Use x, y, z, etc. in matrix cells
- **Polynomials** - Enter expressions like `2x^2+3x+1`
- **Rational Expressions** - Support for `(x+1)/(x-1)` with automatic simplification
- **Mixed Mode** - Freely combine numeric and symbolic values in the same matrix
- **Expression Evaluation** - Substitute variables with numeric values

### Exact Arithmetic

- **Fraction Class** - No floating-point rounding errors
- **Smart Pivot Selection** - Integer-first heuristics for numerical stability
- **Step-by-Step Display** - See all intermediate calculations
- **Cross-Verification** - Results verified using alternative methods

## 📖 Usage Examples

### Example 1: Basic Symbolic Matrix

**Set both matrices to 2×2**

Matrix A:

```
1    x
0    1
```

Matrix B:

```
1    0
y    1
```

Click **✖️ Multiply A × B**

**Result:**

```
1+xy    x
y       1
```

### Example 2: Symbolic Determinant

**Set Matrix A to 2×2**

Matrix A:

```
x    1
1    x
```

Click **📊 Det(A)**

**Result:** `x^2 - 1`

### Example 3: Mixed Numeric and Symbolic

Matrix A:

```
2    x
0    3
```

Matrix B:

```
1    0
5    1
```

**Result A × B:**

```
2+5x    x
15      3
```

## 📝 Expression Syntax

| Type | Example | Description |
|------|---------|-------------|
| Number | `5`, `3.14`, `-2` | Regular numbers |
| Variable | `x`, `y`, `z` | Single letter variables |
| Linear | `2x`, `x+1`, `3x-5` | Linear expressions |
| Polynomial | `x^2`, `2x^2+3x+1` | Polynomial expressions |
| Rational | `(x+1)/(x-1)`, `2/x` | Rational expressions |
| Multivariate | `xy`, `x*y`, `2xy+3z` | Multiple variables |

**Supported operators:** `+`, `-`, `*`, `/`, `^`

## 🏗️ Architecture

### Core Classes (~1,200 lines)

#### **Monomial** (~150 lines)

Represents single terms like `3x²y` with coefficient and variable powers.

#### **Polynomial** (~200 lines)

Represents sums of monomials with automatic like-term combination.

#### **RationalExpression** (~150 lines)

Represents polynomial quotients with simplification.

#### **SymbolicValue** (~300 lines)

Unified wrapper for Fraction, Polynomial, or RationalExpression with common interface.

### Parser (~150 lines)

Comprehensive expression parser supporting:

- Variables and numeric literals
- Operators: `+`, `-`, `*`, `/`, `^`
- Implied multiplication: `2x`, `xy`
- Parentheses for grouping
- Rational expressions

### Matrix Operations

All operations (multiply, determinant, inverse) fully support:

- Numeric values (exact Fraction arithmetic)
- Symbolic values (variables and expressions)
- Mixed numeric/symbolic matrices

## 🧪 Testing (Matrix Calculator)

Click **🧪 Test Symbolic Algebra** to run 10 comprehensive tests:

1. Expression Parsing - Numbers, variables, polynomials, rationals
2. Polynomial Arithmetic - Addition, multiplication, subtraction
3. Polynomial Expansion - (x+1)² → x²+2x+1
4. Rational Simplification - Constant factor cancellation
5. Symbolic Evaluation - Substitute values and compute
6. Multivariate Polynomials - Multiple variables
7. Symbolic Division - Rational expressions
8. Symbolic Negation - Negative expressions
9. Symbolic Matrix 2×2 - Matrix operations with variables
10. Symbolic Determinant - det([[x,1],[1,x]]) → x²-1

All tests show ✅ (pass) or ❌ (fail) with detailed results.

## 💡 Tips (Matrix Calculator)

1. **Start Simple** - Try just `x` or `y` first
2. **Use Parentheses** - For complex expressions: `(x+1)*(x-1)`
3. **Mix Freely** - Combine numbers and variables in the same matrix
4. **Test First** - Click the test button to see examples
5. **Check Results** - Symbolic results show expressions, not numbers

## 🎯 Use Cases (Matrix Calculator)

### Educational

- Demonstrate matrix operations symbolically
- Show determinant formulas
- Visualize matrix transformations
- Teach linear algebra with parameters

### Scientific

- Parametric matrix analysis
- Formula derivation
- Variable substitution
- Symbolic computation

---

# Vector Calculator Documentation

## 🎯 Features

### Vector Operations (10 Built-in Operations)

1. **• Dot Product (A·B)** - Scalar projection and similarity
2. **⨯ Cross Product (A×B)** - 3D only; perpendicular vector
3. **|| Norm (|A|)** - Vector magnitude/length
4. **∠ Angle Between** - Angle between two vectors (radians & degrees)
5. **→ Orthogonal Projection** - proj_B(A): component of A in B direction
6. **≋ Scalar Triple Product (A·(B×C))** - 3D only; parallelepiped volume
7. **⃗ Vector from Points (P₂ - P₁)** - Create vector between two points
8. **+ Add/Subtract Vectors** - Vector sum and difference
9. **× Scalar Multiplication (k×A)** - Scale vector by scalar
10. **📏 Point Distance (|P₂ - P₁|)** - Euclidean distance between points

### Dimension Support

- **2D Vectors** - (x, y) coordinates
- **3D Vectors** - (x, y, z) coordinates
- **Auto-Extend** - 2D vectors automatically extend to 3D with z=0 where valid
- **Flexible Input** - Easily switch between 2D and 3D modes

### Validation & Error Handling

- Real-time input validation with clear error messages
- Dimension mismatch detection
- Zero vector checks (for operations requiring non-zero vectors)
- Operation-specific constraints (e.g., cross product & scalar triple product = 3D only)
- Support for negative and decimal values

### Step-by-Step Visualization

- **Summary Panel** - Quick result overview
- **Detailed Steps** - Chronological breakdown of calculation steps
- **Animated Display** - Smooth step-in animations with auto-scroll
- **Color-Coded Output** - Easy-to-read formatted results
- **Reactive Updates** - Results update instantly when inputs change

## 📋 Supported Vector Topics

### Basic Operations
- Vector addition and subtraction
- Scalar multiplication
- Vector norm (magnitude)

### Geometric Analysis
- Dot product (scalar projection)
- Cross product (3D perpendicular vector)
- Angle between vectors (in radians and degrees)
- Orthogonal projection of one vector onto another

### Advanced Operations
- Scalar triple product (A·(B×C)) — 3D only
- Point-to-vector conversion (vector from P₁ to P₂)
- Distance calculation between two points

## 🔄 2D vs 3D Handling

### Auto-Extend Behavior
When dimension is set to **3D**, vectors entered as 2D automatically extend:
- Input: `1, 2` → Interpreted as: `(1, 2, 0)`
- This allows 2D problem mixing with 3D without reentry

### Dimension Mismatch Detection
- All vectors must be in the same dimension
- Points (P₁, P₂) must match the selected dimension
- Error messages clearly indicate mismatches

### 3D-Only Operations
The following operations require **3D vectors**:
- Cross Product (A×B)
- Scalar Triple Product (A·(B×C))

Attempting these with 2D vectors produces a clear error.

## 📥 Input Format

### Vector Input
Enter as **comma-separated numbers**:
- 2D: `1, 2` or `1.5, -2`
- 3D: `1, 2, 3` or `1.5, -2, 0.5`

### Supported Values
- Integers: `1, -5, 0`
- Decimals: `1.5, 3.14, -0.5`
- Negative: `-1, -2, -3`
- Mixed: `1.5, -2, 0`

### Points
Use the same format as vectors for points P₁ and P₂:
- 2D: `0, 0` and `3, 4`
- 3D: `1, 2, 3` and `4, 5, 6`

## 🧪 Testing (Vector Calculator)

Click **🧪 Run Tests** to execute 30+ comprehensive unit tests covering:

### Validation Tests
- Valid dimension checking (2D and 3D)
- Invalid dimension rejection (throws error)

### Parsing Tests
- 2D and 3D vector string parsing
- Decimal and negative number support
- 2D auto-extend to 3D with z=0
- Dimension mismatch detection
- Invalid number detection
- Empty string rejection

### Formatting Tests
- Integer component formatting
- Decimal component formatting
- Negative component formatting

### Vector Operation Tests
- Vector addition (2D and 3D)
- Vector subtraction
- Scalar multiplication (positive, negative, zero, fractional)
- Dimension mismatch error handling

### Mathematical Operation Tests
- Dot product (standard, orthogonal vectors, 2D)
- Cross product (standard, parallel vectors, 3D-only)
- Anti-commutative property (A×B = -(B×A))
- Vector norm (unit vectors, 3-4-5 triangle, 2D)

### Geometric Analysis Tests
- Angle between vectors (perpendicular, same, opposite)
- Orthogonal projection (onto axis, onto self)
- Zero vector rejection in projection

### Advanced Operation Tests
- Scalar triple product (unit cube, coplanar vectors, 3D-only)
- Component from points (3D and 2D)
- Point distance calculation

All tests display results with ✅ (pass) or ❌ (fail) status.

## 💡 Usage Tips

### Getting Started
1. **Select Dimension** - Choose 2D or 3D from the dropdown
2. **Enter Vectors** - Input comma-separated numbers
3. **Pick Operation** - Click any color-coded operation button
4. **View Results** - Summary and step-by-step breakdown appear

### Common Tasks

**Calculate angle between vectors:**
1. Set dimension to 3D
2. Enter Vector A: `1, 0, 0`
3. Enter Vector B: `0, 1, 0`
4. Click **∠ Angle Between**
5. Result: 90° (perpendicular vectors)

**Find distance between points:**
1. Enter Point P₁: `0, 0, 0`
2. Enter Point P₂: `3, 4, 0`
3. Click **📏 Distance P₁P₂**
4. Result: 5 (Euclidean distance)

**Project vector onto another:**
1. Enter Vector A: `1, 2, 3`
2. Enter Vector B: `1, 0, 0`
3. Click **→ Projection**
4. Result: Projection of A onto B direction

### Validation Tips
- If you see an error, check that:
  - All required fields are filled
  - Numbers are properly comma-separated
  - Vectors match the selected dimension (or are 2D when 3D selected)
  - Operation is valid for the dimension (cross product = 3D only)

## 🎯 Use Cases (Vector Calculator)

### Educational
- Visualize vector operations geometrically
- Teach linear algebra fundamentals
- Demonstrate 2D and 3D vector concepts
- Explore angle and projection relationships

### Physics & Engineering
- Calculate force components
- Analyze velocity and acceleration vectors
- Compute work (dot product) and torque (cross product)
- Find distances and angles in space

### Graphics & Animation
- Vector transformations
- 3D coordinate calculations
- Lighting and surface normal computations
- Camera direction and view calculations

---

## 🔧 Technical Details (All Tools)

### Technology Stack

- **HTML5** - Structure
- **CSS3** - Styling with animations
- **JavaScript ES6** - Classes, arrow functions, modern features
- **Bootstrap 5 CDN** - Responsive layout

### Browser Requirements

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6 support required
- Works offline (except Bootstrap CDN)

### Performance

**Matrix Calculator:**
- Polynomial operations: O(n*m) for n and m terms
- Matrix operations: O(n³) with symbolic overhead
- Parsing: O(n) for input length

**Vector Calculator:**
- Vector operations: O(n) for dimension n
- All calculations run instantly
- Test suite: ~50ms for 30+ tests

### File Size

- **matrix-calculator.html** - ~3,277 lines (~115KB)
- **vector-calculator.html** - ~1,516 lines (~36KB)
- Combined: ~4,793 lines (~151KB)
- No external dependencies except Bootstrap CDN

## 📋 Limitations

### Matrix Calculator

- Single-letter variables only (a-z, A-Z)
- Integer exponents only (no x^y)
- Basic simplification (combines like terms, constant factors)
- Limited polynomial GCD (constants only)
- Large expressions can become complex without full factorization

### Vector Calculator

- 2D and 3D only (no higher dimensions)
- All vectors/points must be numeric (no symbolic/variable values)
- Maximum reasonable vector size: ~10⁶ magnitude for precision
- No complex numbers support

## 🚀 Future Enhancements

### Matrix Calculator
- Multi-character variable names
- Full polynomial GCD and factorization
- Symbolic differentiation
- Better rational simplification
- Expression tree optimization
- Symbolic eigenvalue computation

### Vector Calculator
- 4D and higher dimensional support
- Symbolic vector components
- Matrix-vector operations
- Eigenvalue/eigenvector computation
- Advanced decompositions (SVD, QR)
- Visualization in 3D graphics

---

## 📚 Files

- **matrix-calculator.html** - Matrix operations with symbolic algebra (~3,277 lines)
- **vector-calculator.html** - 2D/3D vector operations with visualization (~1,516 lines)
- **README.md** - This documentation
- **.github/copilot-instructions.md** - Developer guide for AI assistants

## 🤝 Contributing

These are educational projects. Feel free to:

- Report issues
- Suggest improvements
- Fork and enhance
- Use in your own projects

## 📄 License

Open source - use freely for educational and personal projects.

## 🎉 Acknowledgments

Built with modern web technologies and a focus on:

- Educational value
- Mathematical correctness
- Step-by-step visualization
- Clean, maintainable code
- Responsive, accessible interfaces

---

**Happy calculating!** 🧮✨

For questions or issues:
- Check the test suites for usage examples
- Examine the source code (all logic is in the single HTML files)
- Review example calculations in the documentation above

