// adminCreationScript.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Ensure the correct path to your User model

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/saloon', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createAdmin = async (name, email, password) => {
  try {
    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = new User({
      name: name,
      email: email,
      password: hashedPassword,
      role: 'admin', // Set role as admin
    });

    await admin.save();
    console.log('Admin user created successfully');
    process.exit();
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

// Get the name, email, and password from command line arguments
const name = process.argv[2];
const email = process.argv[3];
const password = process.argv[4];

// Validate input
if (!name || !email || !password) {
  console.log('Please provide a name, email, and password to create an admin user.');
  console.log('Usage: node adminCreationScript.js <name> <email> <password>');
  process.exit(1);
}

// Call the function to create an admin
createAdmin(name, email, password);
