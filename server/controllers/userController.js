const User = require('../models/User');
const csvWriter = require('csv-writer').createObjectCsvStringifier;

// Create User
exports.registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, mobile, gender, status, location } = req.body;
        const profile = req.file ? req.file.filename : null;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({
            firstName,
            lastName,
            email,
            mobile,
            gender,
            status,
            profile,
            location
        });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Get Users (with Pagination & Search)
exports.getUsers = async (req, res) => {
    try {
        const { page = 1, limit = 5, search = '' } = req.query;
        const query = {
            $or: [
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ]
        };

        const users = await User.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: 1 });

        const count = await User.countDocuments(query);

        res.status(200).json({
            users,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Get Single User
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Update User
exports.updateUser = async (req, res) => {
    try {
        const { firstName, lastName, email, mobile, gender, status, location } = req.body;
        let updateData = { firstName, lastName, email, mobile, gender, status, location };

        if (req.file) {
            updateData.profile = req.file.filename;
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Delete User
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Export to CSV
exports.exportUsers = async (req, res) => {
    try {
        const users = await User.find({});
        const csvStringifier = csvWriter({
            header: [
                { id: 'firstName', title: 'First Name' },
                { id: 'lastName', title: 'Last Name' },
                { id: 'email', title: 'Email' },
                { id: 'mobile', title: 'Mobile' },
                { id: 'gender', title: 'Gender' },
                { id: 'status', title: 'Status' },
                { id: 'location', title: 'Location' }
            ]
        });

        const records = users.map(user => ({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            mobile: user.mobile,
            gender: user.gender,
            status: user.status,
            location: user.location
        }));

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=\"users.csv\"');
        res.send(csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(records));
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
