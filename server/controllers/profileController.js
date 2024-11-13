const User = require('../models/User');
const bcrypt = require('bcryptjs');

const getProfile = async (req, res) => {
    try {
        console.log("getProfile", req.userId)
        const user = await User.findById(req.userId).select('-password');
        console.log(user)
        if (!user) return res.status(404).json({ msg: 'User not found' });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

const updateProfile = async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        if (name) user.name = name;
        if (email) user.email = email;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

module.exports = { getProfile, updateProfile };
