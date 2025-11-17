# Matrix Calculator with Symbolic Algebra

A single-file, interactive web application for matrix operations with full symbolic algebra support. Perform calculations with numbers, variables, polynomials, and rational expressions - all with step-by-step visualization.

## 🚀 Quick Start

```bash
# Option 1: Open directly in browser
open matrix-calculator.html

# Option 2: Serve locally (recommended)
python3 -m http.server 8000
# Then visit: http://localhost:8000/matrix-calculator.html
```

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

## 🧪 Testing

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

## 💡 Tips

1. **Start Simple** - Try just `x` or `y` first
2. **Use Parentheses** - For complex expressions: `(x+1)*(x-1)`
3. **Mix Freely** - Combine numbers and variables in the same matrix
4. **Test First** - Click the test button to see examples
5. **Check Results** - Symbolic results show expressions, not numbers

## 🎯 Use Cases

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

## 🔧 Technical Details

### Technology Stack

- **HTML5** - Structure
- **CSS3** - Styling with animations
- **JavaScript ES6** - Classes, arrow functions, modern features
- **Bootstrap 5 CDN** - Responsive layout (optional)

### Browser Requirements

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6 support required
- Works offline (except Bootstrap CDN)

### Performance

- **Polynomial operations**: O(n*m) for n and m terms
- **Matrix operations**: O(n³) with symbolic overhead
- **Parsing**: O(n) for input length
- **Memory**: Efficient allocation with minimal overhead

## 📋 Limitations

### Current Constraints

- Single-letter variables only (a-z, A-Z)
- Integer exponents only (no x^y)
- Basic simplification (combines like terms, constant factors)
- Limited polynomial GCD (constants only)

### Known Issues

- Large expressions can become complex without full factorization
- Rational simplification is basic (e.g., (x²-1)/(x-1) doesn't auto-reduce to x+1)
- Complex symbolic expressions may be verbose

## 🚀 Future Enhancements

- Multi-character variable names
- Full polynomial GCD and factorization
- Symbolic differentiation
- Better rational simplification
- Expression tree optimization
- Symbolic eigenvalue computation

## 📚 Files

- **matrix-calculator.html** - Complete application (single file)
- **README.md** - This documentation
- **.github/copilot-instructions.md** - Developer guide for AI assistants

## 🤝 Contributing

This is an educational project. Feel free to:

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

---

**Happy calculating!** 🧮✨

For questions or issues, check the test suite for usage examples or examine the source code - all logic is in the single HTML file.
