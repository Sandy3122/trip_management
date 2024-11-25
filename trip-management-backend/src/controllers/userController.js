const Response = require('../utils/response');
const UserService = require('../services/userService');
const existingDataCheck = require('../utils/existingDataCheck');
const jwtUtils  = require('../utils/jwtUtils')
const sessionStore = require('../utils/sessionStore')
const bcrypt = require('bcryptjs');
const {validateUserInput} = require('../utils/validateUser')

exports.registerUser = async (req, res) => {
    console.log('requestBody: ',req.body)
    var { userName, phoneNumber, email, password } = req.body;
    
    // Validate user input
    const validationError = validateUserInput({ userName, phoneNumber, email, password });
    if (validationError) {
        return res.status(400).json(Response.error(400, { errCode: 'INVALID_INPUT' }, validationError));
    }

    try {
        // Check if user already exists by phone number
        let existingUser = await existingDataCheck.checkExistingUser('phoneNumber', phoneNumber);
        if (existingUser.exists) {
            return res.status(409).json(Response.error(409, { errCode: existingUser.errorCode }, existingUser.message));
        }

        // Check if user already exists by email
        existingUser = await existingDataCheck.checkExistingUser('email', email);
        if (existingUser.exists) {
            return res.status(409).json(Response.error(409, { errCode: existingUser.errorCode }, existingUser.message));
        }

        // Create new user using the service
        const newUser = await UserService.createUser({ userName, phoneNumber, email, password });
        
        res.status(201).json(Response.success(201, {
            userId : newUser.userId,
            userName: newUser.userName,
            email: newUser.email,
        }, 'User registered successfully'));

    } catch (error) {
        console.error(error);
        res.status(500).json(Response.error(500, { errCode: 'SERVER_ERROR' }, 'Server Error'));
    }
};


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUserResponse = await UserService.findOne({ email });
        if (!existingUserResponse.success) {
            return res.status(404).json(Response.error(404, { errCode: 'USER_NOT_FOUND' }, 'User not found'));
        }

        const user = existingUserResponse.data;        

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json(Response.error(401, { errCode: 'INVALID_CREDENTIALS' }, 'Invalid Credentials'));
        }

        const payload = { id: user._id, email: user.email };

        // Generate tokens
        const accessToken = jwtUtils.generateAccessToken(payload);
        const refreshToken = jwtUtils.generateRefreshToken(payload);

        // Store refresh token in session
        sessionStore.storeData(refreshToken, user._id);

        // Successfully logged in
        res.status(200).json(Response.success(200, {
            id: user._id,
            userName: user.userName,
            email: user.email,
            accessToken,
            refreshToken
            
        }, 'User logged in successfully'));


    } catch (error) {
        console.error(error);
        res.status(500).json(Response.error(500, { errCode: 'SERVER_ERROR' }, 'Server Error'));
    }
};
