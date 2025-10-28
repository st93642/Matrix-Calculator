# Matrix & Vector Calculator

An interactive educational web application for matrix and vector operations with step-by-step visualizations and comprehensive testing.

## Features

### Matrix Operations

- **Addition & Subtraction**: Element-wise operations with visual step-by-step calculations
- **Multiplication**: Matrix-matrix multiplication with animated row-column dot products
- **Scalar Multiplication**: Multiply matrices by scalars with element-wise animations
- **Transpose**: Swap rows and columns with animated element movement
- **Determinant**: Calculate determinants using cofactor expansion with visual minors
- **Inverse**: Gauss-Jordan elimination with augmented matrix visualization

### Vector Operations

- **Addition & Subtraction**: Component-wise operations
- **Scalar Multiplication**: Multiply vectors by scalars
- **Norm (Magnitude)**: Calculate Euclidean norm ||v||
- **Distance**: Calculate distance between points in 3D space
- **Vector Components**: Find vectors between points

### Educational Features

- **Step-by-step animations**: Visual breakdown of complex operations
- **Theoretical explanations**: Mathematical concepts explained after each calculation
- **Interactive testing**: Comprehensive test suites for all operations
- **Visual feedback**: Color-coded highlighting and animations

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required - pure vanilla JavaScript

### Running the Application

1. **Option 1: Direct File Opening**
   - Open `matrix-calculator.html` directly in your web browser

2. **Option 2: Local Server (Recommended)**

   ```bash
   # Navigate to the project directory
   cd /path/to/matrix-calculator

   # Start a local HTTP server
   python3 -m http.server 8000

   # Open your browser and go to:
   # http://localhost:8000/matrix-calculator.html
   ```

### Usage

1. **Select Matrix/Vector Tab**: Choose between matrix and vector operations
2. **Set Dimensions**: Use dropdown menus to set matrix sizes (for matrices)
3. **Enter Values**: Input numbers in the generated input grids
4. **Choose Operation**: Click the desired operation button
5. **View Results**: Watch step-by-step animations and read theoretical explanations
6. **Run Tests**: Use the test buttons to verify all operations work correctly

## Project Structure

```text
matrix-calculator/
├── matrix-calculator.html    # Complete application (HTML + CSS + JS)
├── README.md                 # This file
└── .gitignore               # Git ignore rules
```

## Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **JavaScript (ES6+)**: Pure vanilla JavaScript, no frameworks
- **CSS Grid & Flexbox**: Modern layout techniques

## Key Implementation Details

### Matrix Representation

- 2D arrays where `matrix[row][col]` represents elements
- 0-based indexing in code, 1-based in UI labels

### Animation System

- Custom step-by-step animation framework
- CSS keyframes for highlights and transitions
- Timed delays for educational pacing

### Testing Framework

- Custom JavaScript testing suite
- Comprehensive coverage of all operations
- Pass/fail indicators with detailed error reporting

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly in multiple browsers
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Educational Value

This calculator serves as both a practical tool and an educational resource for:

- Linear algebra students
- Mathematics educators
- Anyone interested in understanding matrix operations
- Web development students learning vanilla JavaScript

The step-by-step visualizations help users understand the underlying mathematical concepts rather than just seeing final results.
