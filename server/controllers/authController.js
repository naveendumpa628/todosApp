const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const jwtKey = 'VEERA1234'; //process.env.JWT_SECRET
const signup = async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        console.log('inside signIn', req.body);
        //let user = await User.findOne({ email });
        //if (user) return res.status(400).json({ msg: 'User already exists' });

        let user = new User({ name, email, password });
        console.log('JWT Secret before save:', jwtKey);
        await user.save();
        console.log('JWT Secret after save:', jwtKey);
        const token = jwt.sign({ userId: user._id }, jwtKey, { expiresIn: '2h' });

        res.status(201).json({ token });
    } catch (err) {
        console.log('JWT Secret in error :', jwtKey);
        res.status(500).json({ msg: 'Server error' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        console.log('inside Login', req.body);
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
        console.log('inside Login user Details', user);
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('inside Login', req.body);

        console.log('inside Login isMatch', isMatch);

        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id }, jwtKey, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

module.exports = { signup, login };
