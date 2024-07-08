const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../User/schemas/user.schema');
require("dotenv").config();


const authControllers = {
    loginUser :  async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    
            const payload = { userId: user._id };
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    
            res.status(200).json({ token, userId: user._id });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    verifyToken: (req, res) => {
        const { token } = req.body;
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            res.status(200).json({ valid: true });
        } catch (error) {
            res.status(401).json({ valid: false });
        }
    }

}

module.exports = authControllers