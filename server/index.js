import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { register } from './controllers/auth.controllers.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/users.routes.js';
import itemRoutes from './routes/item.route.js';
import vendorRoutes from './routes/vendor.routes.js';
import categoryRoutes from './routes/category.routes.js';
import User from './models/User.models.js';
import Category from './models/Category.model.js';
import Item from './models/Item.model.js';
import PurchaseList from './models/PurchaseList.models.js';
import Vendor from './models/Vendor.model.js';
import {
  users,
  purchaseLists,
  items,
  vendor,
  category,
} from './data/index.data.js';

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
// Storing images locally in this case. When live better to store in cloud like S3
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/assets'),
  filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage });

/* ROUTE WITH FILES */
app.post('/auth/register', upload.single('picture'), register);

/* OTHER FEATURE ROUTES */
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/purchase-lists', userRoutes);
app.use('/items', itemRoutes);
app.use('/vendors', vendorRoutes);
app.use('/categories', categoryRoutes);

/* MONGOOSE SETUP */
// connecting to mongoDB via port
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    // Seed data to Db
    /*
    User.insertMany(users);
    Category.insertMany(category);
    Vendor.insertMany(vendor);
    Item.insertMany(items);
    PurchaseList.insertMany(purchaseLists); 
    */
  })
  .catch((error) => console.log(`${error} did not connect`));
// seedDB();
