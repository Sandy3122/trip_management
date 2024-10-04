// services/userService.js

const User = require('../models/userModel');
const Response = require('../utils/response');
const bcrypt = require('bcryptjs');


// Dynamic function to handle CRUD operations
class UserService {
    async createUser(userData) {
        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        const newUser = await User.create({ 
            userName: userData.userName,
            phoneNumber: userData.phoneNumber,
            email: userData.email,
            password: hashedPassword
        });
        return newUser;
    }

    async create(data) {
        try {
            const user = await User.create(data);
            return { success: true, data: user };
        } catch (error) {
            console.error("Error creating user:", error);
            return { success: false, error: error.message };
        }
    }

    async update(id, data) {
        try {
            const user = await User.findByIdAndUpdate(id, data, { new: true });
            return user ? { success: true, data: user } : { success: false, error: 'User not found' };
        } catch (error) {
            console.error("Error updating user:", error);
            return { success: false, error: error.message };
        }
    }

    async findOne(query) {
        try {
            const user = await User.findOne(query);
            return user ? { success: true, data: user } : { success: false, error: 'User not found' };
        } catch (error) {
            console.error("Error finding user:", error.message);
            return { success: false, error: error.message };
        }
    }
    

    async find(query) {
        try {
            const users = await User.find(query);
            return { success: true, data: users };
        } catch (error) {
            console.error("Error finding users:", error);
            return { success: false, error: error.message };
        }
    }

    async findById(id) {
        try {
            const user = await User.findById(id);
            return user ? { success: true, data: user } : { success: false, error: 'User not found' };
        } catch (error) {
            console.error("Error finding user by ID:", error);
            return { success: false, error: error.message };
        }
    }

    async findByIdAndUpdate(id, data) {
        try {
            const user = await User.findByIdAndUpdate(id, data, { new: true });
            return user ? { success: true, data: user } : { success: false, error: 'User not found' };
        } catch (error) {
            console.error("Error finding and updating user by ID:", error);
            return { success: false, error: error.message };
        }
    }

    async findByIdAndDelete(id) {
        try {
            const user = await User.findByIdAndDelete(id);
            return user ? { success: true, data: user } : { success: false, error: 'User not found' };
        } catch (error) {
            console.error("Error finding and deleting user by ID:", error);
            return { success: false, error: error.message };
        }
    }
}

module.exports = new UserService();
