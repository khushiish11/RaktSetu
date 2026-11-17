// const dns = require('dns');
// dns.setServers(['8.8.8.8', '1.1.1.1']);
// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//    await mongoose.connect(process.env.MONGO_URI, {
//   serverSelectionTimeoutMS: 10000
// });
//     console.log('MongoDB connected');
//   } catch (err) {
//     console.error('MongoDB connection failed:', err.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log("Connecting to MongoDB...");

        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 15000
        });

        console.log("MongoDB connected successfully!");

    } catch (err) {
        console.log("MongoDB connection failed:");
        console.log(err.message);

        if (err.reason && err.reason.servers) {
            for (const [address, server] of err.reason.servers) {
                console.log("Server:", address);
                console.log("Reason:", server.error?.message);
            }
        }

        throw err;
    }
};

module.exports = connectDB;