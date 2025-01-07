const jwt = require('jsonwebtoken')
const User = require('./Models/User')


//create token


const generateToken = (userData) => {
  try {
    
    const payload = {
      userId: userData._id,  // Assuming _id is the unique user identifier
      email: userData.email,  // If you want to include email in the token
    };

    // Now pass the payload object to jwt.sign()
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5d' });
    
    return token;
  } catch (error) {
    console.error('Error while creating token:', error);
  }
};

const jwtAuthMiddleware = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(401).json({ error: 'Token not found' });
        }

        const token = authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Invalid token' });
            }

            //console.log('Decoded Token:', decoded);

            // Use decoded.userId instead of decoded.id
            const user = await User.findById(decoded.userId);
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            req.user = user; // Attach user to the request object
            next();
        });
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};



module.exports = {jwtAuthMiddleware,generateToken}