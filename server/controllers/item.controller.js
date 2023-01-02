import PurchaseList from '../models/PurchaseList.models.js';
import Item from '../models/Item.model.js';

//TO COMPLETE
/* ADD ITEM */
export const addItemToPurchaseList = async (req, res) => {
  try {
    // Find the purchase List
    const { purchaseListId } = req.params;
    const purchaseList = await PurchaseList.findById(purchaseListId);

    // check if the purchase list belongs to the user
    if (purchaseList.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: 'User is not authorised to update this list' });
    }
    // Validate the request body
    const { name, unitPrice, itemCount, category, vendor, expiryDate } =
      req.body;
    if (!name || !unitPrice || !itemCount || !category || !vendor) {
      return res.status(400).json({
        message: 'Please provide provide all the required fields',
      });
    }

    // Calculate total price for the item
    const totalPrice = unitPrice * itemCount;

    // Create a new item
    const item = new Item({
      name: name,
      itemCount: itemCount,
      expiryDate: expiryDate,
      unitPrice: unitPrice,
      totalPrice: totalPrice,
      vendor: vendor,
      category: category,
      purchaseList: purchaseListId,
    });

    // Save the item
    const newItem = await item.save();
    purchaseList.items.push(newItem._id);
    await purchaseList.save();
    res.status(201).json({ item: newItem });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* UPDATE ITEM */
export const updateItemInPurchaseList = async (req, res) => {
  try {
    const { purchaseListId, itemId } = req.params;
    const purchaseList = await PurchaseList.findById(purchaseListId);
    const itemIndex = purchaseList.items.findIndex(
      (item) => item._id.toString() === itemId
    );
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not in purchase list' });
    }

    if (purchaseList.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: 'User not authorized to update this list' });
    }

    const { name, unitPrice, itemCount, category, vendor, expiryDate } =
      req.body;
    if (!name || !unitPrice || !itemCount || !category || !vendor) {
      return res.status(400).json({
        message: 'Please provide provide all the required fields',
      });
    }

    // Calculate the new total price for the item
    const newTotalPrice = unitPrice * itemCount;

    // Update the item
    purchaseList.items[itemIndex] = {
      ...purchaseList.items[itemIndex],
      name: name,
      unitPrice: unitPrice,
      itemCount: itemCount,
      totalPrice: newTotalPrice,
      category: category,
      vendor: vendor,
      expiryDate: expiryDate,
    };
    const updatedPurchaseList = await purchaseList.save();
    res.json(updatedPurchaseList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* DELETE ITEM */
export const deleteItemFromPurchaseList = async (req, res) => {
  try {
    // find the item and the purchase list
    const { id } = req.params;
    const item = await Item.findById(id);
    const purchaseList = await PurchaseList.findById(id);

    // remove the item from the list
    purchaseList.items = purchaseList.items.filter((a) => a._id !== item._id);

    // save the update purchase list
    await purchaseList.save();
    res.json(purchaseList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
