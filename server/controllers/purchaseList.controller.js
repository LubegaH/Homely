import User from '../models/User.models.js';
import PurchaseList from '../models/PurchaseList.models.js';

/* READ  */
export const getUserPurchaseList = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    // Check if the user exists
    if (user === null) {
      return res.status(404).json({ message: 'Can not find User' });
    }
    // find the purchase list
    const purchaseList = await PurchaseList.findById(req.params.id).populate(
      'items'
    );
    if (purchaseList === null) {
      return res.status(404).json({ message: 'Can not find purchase list' });
    }
    if (purchaseList.user.toString() !== user._id.toString()) {
      return res
        .status(403)
        .json({ message: 'You are not authorized to view this list' });
    }
    return res.status(201).json(purchaseList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserPurchaseLists = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user === null) {
      return res.status(404).json({ message: 'Cannot find user' });
    }
    //   Find purchase lists belonging to a user
    const purchaseLists = await PurchaseList.find({ user: user._id }).populate(
      'items'
    );
    res.status(200).json(purchaseLists);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

/* CREATE PURCHASE LIST */
export const createUserPurchaseList = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await user.findById(id);
    const { name, items } = req.body;
    if (!name && !items) {
      return res
        .status(400)
        .json({ message: 'Please provide a name and at least one item' });
    }

    // Calculate total price for items
    // let totalAmount = 0;
    // items.forEach((item) => {
    //   totalAmount += item.totalPrice;
    // });
    const totalAmount = items.reduce((acc, item) => acc + item.totalPrice, 0);

    // Create new purchaseList
    const purchaseList = new PurchaseList({
      user: user.id,
      name: name,
      items: items,
      dateCreated: Date.now(),
      totalAmount: totalAmount,
    });

    // Save the purchaseList
    const newPurchaseList = await purchaseList.save();
    user.purchaseLists.push(newPurchaseList._id);
    await user.save();
    res.status(201).json({
      purchaseList: newPurchaseList,
      totalAmount: totalAmount,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* UPDATE A PURCHASE LIST */
export const updateUserPurchaseList = async (req, res) => {
  try {
    // Find the purchase list
    const { id } = req.params;
    const { name, items, dateCreated } = req.body();

    const purchaseList = await PurchaseList.findById(req.params._id);

    // Check if purchase list belongs to the user
    if (purchaseList.user.toString() !== id) {
      return res
        .status(401)
        .json({ message: 'User is not authorised to update this list' });
    }
    purchaseList.name = name || purchaseList.name;
    purchaseList.items = items || purchaseList.items;
    purchaseList.dateCreated = dateCreated || purchaseList.dateCreated;
    let totalAmount = 0;
    purchaseList.items.forEach((item) => (totalAmount += item.price));
    purchaseList.totalAmount = totalAmount;

    // save the updated Purchase List
    const updatedPurchaseList = await purchaseList.save();
    return res.json(updatedPurchaseList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* DELETING A PURCHASE LIST */
export const deleteUserPurchaseList = async (req, res) => {
  try {
    // find the purchase list
    const { purchaseList } = req.params;
    const userPurchaseList = PurchaseList.findById(purchaseList.id);
    // Check if that purchase list belongs to the user
    if (userPurchaseList.user.toString() !== req.params.user.id) {
      return res
        .status(401)
        .json({ message: 'Not authorized to delete this purchase list' });
    }
    // delete the purchase list
    await userPurchaseList.remove();
    res.json({ message: 'Purchase list deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
