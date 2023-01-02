import mongoose from 'mongoose';
import PurchaseList from '../models/PurchaseList.models.js';

const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

const categoryIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

const vendorIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const users = [
  {
    _id: userIds[0],
    firstName: 'Ham',
    lastName: 'Lubega',
    email: 'hle@gmail.com',
    password: 'sjdhsdfh$@&&@BBjdhbs3277BJH@/her',
  },

  {
    _id: userIds[1],
    firstName: 'Pennie',
    lastName: 'Igaga',
    email: 'ige@gmail.com',
    password: 'sjdhsdfh$@&&@BBjdhbs3235323BJH@/her',
  },
  {
    _id: userIds[2],
    firstName: 'Tia',
    lastName: 'Naiga',
    email: 'nai@gmail.com',
    password: 'sjdhh$@&&@BBjdhbs3235323BJH@/her',
  },
];

export const items = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Apples',
    unitPrice: 0.5,
    itemCount: 10,
    totalPrice: 5,
    category: categoryIds[0]._id,
    vendor: vendorIds[0]._id,
  },

  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Bulb',
    unitPrice: 0.5,
    itemCount: 10,
    category: categoryIds[1]._id,
    vendor: vendorIds[1]._id,
  },
];

export const purchaseLists = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Grocery List Week 1',
    dateCreated: Date.now(),
    user: userIds[0]._id,
    items: items.map((item) => item._id),
  },
];

export const vendor = [
  {
    _id: vendorIds[0],
    name: 'Quality Supermarket',
    location: 'Naalya',
  },
  {
    _id: vendorIds[1],
    name: 'Market',
    location: 'Kyaliwajjala',
  },
];
export const category = [
  {
    _id: categoryIds[0],
    name: 'Fruits',
  },
  {
    _id: categoryIds[1],
    name: 'Electronics',
  },
];
