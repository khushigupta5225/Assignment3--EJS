const express = require('express');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = 3000;

// Sample product data (in-memory for this example)
const products = [
  { name: 'Product 1', description: 'Description of Product 1', image: '/uploads/product1.jpg' },
  { name: 'Product 2', description: 'Description of Product 2', image: '/uploads/product2.jpg' },
  { name: 'Product 3', description: 'Description of Product 3', image: '/uploads/product3.jpg' },
];

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from "public" and "uploads" folders
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Route to render the product catalog
app.get('/', (req, res) => {
  res.render('catalog', { products });
});

// Route to render the upload form
app.get('/upload', (req, res) => {
  res.render('upload');
});

// Route to handle form submission with image upload
app.post('/upload', upload.single('image'), (req, res) => {
  const { name, description } = req.body;
  const imagePath = `/uploads/${req.file.filename}`;

  // Add new product to the catalog (in-memory for now)
  products.push({ name, description, image: imagePath });

  // Redirect back to catalog
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
