import fs from 'node:fs/promises';
import bodyParser from 'body-parser';
import express from 'express';
import multer from 'multer';

const app = express();

app.use(express.static('images'));
app.use(bodyParser.json());

// CORS

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Reading the cars JSON file
app.get('/cars', async (req, res) => {
  const fileContent = await fs.readFile('./data/cars.json');
  const carsData = JSON.parse(fileContent);
  res.status(200).json({ cars: carsData });
});

// Updating the cars JSON file
app.put('/cars', async (req, res) => {
  let { newCar } = req.body;
  const fileContent = await fs.readFile('./data/cars.json');
  const carsData = JSON.parse(fileContent);
  newCar.id = carsData.length + 1;
  const updatedCars = [...carsData, newCar];
  await fs.writeFile('./data/cars.json', JSON.stringify(updatedCars));
  res.status(200).json({ message: 'List of cars updated' });
});


// uploading the car image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images');
  },
  filename: async (req, file, cb) => {
    try {
      const fileContent = await fs.readFile('./data/cars.json', 'utf-8');
      const carsData = JSON.parse(fileContent);
      const fileName = String(carsData.length + ".jpg");
      cb(null, fileName);
    } catch (error) {
      console.error(error.message);
      cb(error);
    }
  },
});
const upload = multer({ storage: storage });
app.post('/upload', upload.single('image'), (req, res) => {
  res.status(200).json({ message: 'Image uploaded successfully' });
});

// Updating the users JSON file
app.put('/users', async (req, res) => {
  try {
      let { newUser } = req.body;
      const fileContent = await fs.readFile('./data/users.json');
      const usersData = JSON.parse(fileContent);
      newUser.id = usersData.length + 1;
      const updatedUserList = [...usersData, newUser];
      await fs.writeFile('./data/users.json', JSON.stringify(updatedUserList));
      res.status(200).json({ message: 'Zarejestrowano' });

  } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// handling login
app.put('/login', async (req, res) => {
  try {
    const { loginCredentials } = req.body;
    const fileContent = await fs.readFile('./data/users.json');
    const usersData = JSON.parse(fileContent);

    // Find the user that matches the login credentials
    const filteredData = usersData.filter(user => user.email === loginCredentials.email && user.password === loginCredentials.password);

    if (filteredData.length === 0) {
      // No matching user found
      res.status(401).json({ message: 'Nieprawidłowy login lub hasło' });
    } else {
      // Matching user found
      const { id, name, phone } = filteredData[0];
      const userSubset = { id, name, phone };
      res.status(200).json({ message: 'Zalogowano', user: userSubset }); 
    }

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// 404
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  res.status(404).json({ message: '404 - Not Found' });
});

app.listen(3001);
