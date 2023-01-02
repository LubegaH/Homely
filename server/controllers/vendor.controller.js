import Vendor from '../models/Vendor.model.js';

/* READ Vendor */
export const getVendorById = async (req, res) => {
  try {
    // Find the vendor
    const { vendorId } = req.params;
    const vendor = await Vendor.findById(vendorId);

    // Check if the vendor belongs to the user
    if (vendor.createdBy.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: 'User is not authorised to access this vendor' });
    }

    res.json(vendor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* ADD A VENDOR */
export const addVendor = async (req, res) => {
  try {
    // Validate the request body
    const { name, location } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ message: 'Please provide a name for the vendor' });
    }

    // Create a new vendor
    const vendor = new Vendor({
      name: name,
      location: location,
      createdBy: req.user.id,
    });

    // Save the vendor
    const newVendor = await vendor.save();
    res.status(201).json({ vendor: newVendor });
  } catch (err) {
    // Check for duplicate keys in name
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ message: 'A vendor with the same name already exists' });
    }
    res.status(500).json({ message: err.message });
  }
};
