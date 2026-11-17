const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const Donor = require('./models/Donor');
const Hospital = require('./models/Hospital');
const BloodRequest = require('./models/BloodRequest');

const donors = [
  // paste your donors array items from dummyData.js here
  {
    id : 1 ,
    name : "khushi Sharma" ,
    age : 24 ,
    bloodGroup : "B+" ,
    phone : "9991841384" ,
    city : "Delhi" ,
    area : "Shahdara" ,
    isAvailable : true ,
    lastDonationDate : "2026-05-15" ,
    totalDonations : 2 ,
    gender : 'Female' 
},
{
    id: 2 ,
    name : "Priya Sharma" ,
    age : 27 ,
    bloodGroup : "O+" ,
    phone: "9871234567" ,
    city : "Delhi" ,
    area: "Pitampura",
    isAvailable: true,
    lastDonationDate: "2026-04-20",
    totalDonations: 8,
    gender: "Female"
},
{
    id: 3,
    name : "Amit Mehta" ,
    age: 32 ,
    bloodGroup : "A+" ,
    phone:  "9812345678",
    city: "Delhi" ,
    area :"Shalimar bagh" ,
    isAvailable : true ,
    lastDonationDate : "2026-03-10",
    totalDonations : 3 ,
    gender : "Male"
},
{
    id: 4 ,
    name: "Shashank Oberoi" ,
    age : 29,
    bloodGroup : "AB+" ,
    phone: "9823456789",
    city :"Delhi" ,
    area : "Ashok vihar" ,
    isAvailable : false ,
    lastDonationDate : "2026-07-01" ,
    totalDonations : 12 ,
    gender : "Male"
},
{
    id : 5 ,
    name : "Vikas Singh" ,
    age : 35 ,
    bloodGroup : "O-" ,
    phone : "9834567890" ,
    city : "Noida" ,
    area : "Sector 62" ,
    isAvailable : true ,
    lastDonationDate : "2026-06-05" ,
    totalDonations : 7 ,
    gender : "Male"
},
{
    id : 6 ,
    name : "Anjali Gupta" ,
    age : 26,
    bloodGroup : "A-" ,
    phone : "9845678901",
    city: "Noida" ,
    area : "sector 18" ,
    isAvailable : true ,
    lastDonationDate : "2026-02-28",
    totalDonations : 4 ,
    gender : "Female"
},
{
    id : 7,
    name : "Rohit Verma" ,
    age : 30 ,
    bloodGroup : "B-" ,
    phone : "9856789012" ,
    city : "Delhi",
    area : "Dwarka" ,
    isAvailable : true ,
    lastDonationDate : "2026-01-15",
    totalDonations : 2 ,
    gender : "Male"
},
{
    id : 8 ,
    name : "Meena Patel" ,
    age : 27 ,
    bloodGroup : "AB-" ,
    phone : "9867890123" ,
    city : "Gurgaon" ,
    area : "Sector 45" ,
    isAvailable : true ,
    lastDonationDate : "2026-05-30",
    totalDonations : 6 ,
    gender :"Female" 
},
{
    id : 9,
    name : "Shreya Rajput" ,
    age : 25 ,
    bloodGroup : "O+" ,
    phone : "9878901234",
    city : "Delhi" ,
    area : "Laxmi nagar",
    isAvailable : true ,
    lastDonationDate : "2026-07-10" ,
    totalDonations : 15 ,
    gender : "Female"
},
{
    id : 10 ,
    name : "Akshit Thakur" ,
    age : 28 ,
    bloodGroup : "A+",
    phone : "9889012345",
    city : "Delhi" ,
    area : "Janakpuri" ,
    isAvailable : true ,
    lastDonationDate : "2026-04-01" ,
    gender : "Male"
},
{ id: 11,
 name: "Rahul Kapoor", 
 age: 26,
  bloodGroup: "AB+", 
  phone: "9901234567",
  city: "Delhi", 
  area: "Rohini",
  isAvailable: true, 
  lastDonationDate: "2026-03-01",
  totalDonations: 2,
   gender: "Male" },
];
// Add sample emails to all dummy donors
const donorsWithEmails = donors.map((donor) => ({
    ...donor,
    email: `donor${donor.id}@example.com`
}));

const hospitals = [
  // paste your hospitals array items from dummyData.js here
   {
      id: 1,
      name: "AIIMS DELHI",
      address: "Ansari Nagar East , New Delhi",
      city: "Delhi" ,
      phone: "011-26588500",
      type: "Government" ,
      emergency: true,
      bloodBankAvailable: true ,
      bloodBankTiming: "24/7",
      opdTiming: "8:00 AM - 12:00 PM" ,
      bloodInventory: {
          "A+" : 45 , "A-": 8,
          "B+" : 38 , "B-": 5,
          "O+" : 60 , "O-" :12,
          "AB+" : 20 , "AB-" : 4
      }
     },
     {
      id: 2 ,
      name: "Safdarjung Hospital" ,
      address: "Ansari Nagar West, New Delhi" ,
      city: "Delhi" ,
      phone:  "011-26730000",
      type: "Government" ,
      emergency : true,
      bloodBankAvailable: true,
      bloodBankTiming: "24/7",
      opdTiming: "8:00 AM - 12:00 PM",
      bloodInventory: {
          "A+": 30 , "A-": 5,
          "B+" : 25 , "B-": 3,
          "O+" : 40 , "O-" : 8,
          "AB+": 15 , "AB-": 2
      }
     },
     {
      id: 3 ,
      name: "GTB Hospital" , 
      address: "Dilshad Garden , Delhi",
      city: "DElhi",
      phone: "011-22582600",
      type: "Government" ,
      emergency : true,
      bloodBankAvailable: true,
      bloodBankTiming: "8:00 AM - 8:00 PM",
      opdTiming: "9:00 AM - 1:00 PM",
      bloodInventory: {
          "A+": 20 , "A-": 2 ,
          "B+" : 18 , "B-": 1,
          "O+": 25 , "O-": 4 ,
          "AB+" : 8 , "AB-" : 1
      }
     },
     {
      id: 4,
      name: "RML Hospital" ,
      address: "Baba Kharak Singh Marg, New Delhi",
      city : "Delhi", 
      phone: "011-23404304",
      type: "Government" ,
      emergency: true,
      bloodBankAvailable: true,
      bloodBankTiming: "24/7",
      opdTiming: "8:00 AM - 12:00 PM",
      bloodInventory: {
          "A+": 35 , "A-": 6,
          "B+": 28 , "B-": 4,
          "O+": 45 , "O-": 10,
          "AB+": 12 , "AB-": 3 
      }
     },
     {
      id:5,
      name: "Fortis Hospital Noida" , 
      address: "Sector 62 , Noida",
      city: "Noida",
      phone:  "0120-2777000",
      type: "Private",
      emergency: true, 
      bloodBankAvailable: true,
      bloodBankTiming: "24/7",
      opdTiming: "9:00 AM - 6:00 PM",
      bloodInventory: {
          "A+": 25 , "A-": 10,
          "B+": 20 , "B-": 8 ,
          "O+": 30 , "O-": 15,
          "AB+": 10 , "AB-": 5
      }
     },
];

const bloodRequests = [
  // paste your bloodRequests array items from dummyData.js here
    {
        id: 1, 
        requesterName: "Ramesh Gupta",
        bloodGroup: "O-",
        unitsNeeded: 2,
        urgencyLevel : "Critical",
        hospitalName: "AIIMS Delhi" ,
        city: "Delhi",
        contactNumber:  "9901234567",
        patientName: "Suresh Gupta",
        reason: "Surgery",
        status: "Pending",
        createdAt: "2026-08-26",
    },
    {
        id: 2,
        requesterName: "Anaisha Vyas",
        bloodGroup: "B+",
        unitsNeeded: 1,
        urgencyLevel: "Urgent",
        hospitalName: "Safdarjung Hospital",
        city: "Delhi",
        contactNumber: "9912345678",
        patientName : "Dhurv Pandit",
        reason: "Accident",
        status: "Fulfilled",
        createdAt: "2026-07-25",
    },
    {
        id: 3 ,
        requesterName: "Shashwat Singh",
        bloodGroup: "AB+",
        unitsNeeded: 3,
        urgencyLevel: "Normal",
        hospitalName: "GTB Hospital",
        city: "Delhi",
        contactNumber:  "9923456789",
        patientName: "Siya Sharma",
        reason: "Thalassemia",
        status: "Pending",
        createdAt: "2026-07-07",
    },
    {
        id:4,
        requesterName: "Sikha Yadav",
        bloodGroup: "AB-",
        unitsNeeded: 2,
        urgencyLevel: "Critical",
        hospitalName: "RML Hospital",
        city:"Delhi",
        contactNumber: "9934567890",
        patientName: "Shalini Yadav",
        reason : "Delivery Complication",
        status: "Pending",
        createdAt: "2026-08-21",
    },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected');

    await Donor.deleteMany();
    await Hospital.deleteMany();
    await BloodRequest.deleteMany();

   await Donor.insertMany(donorsWithEmails);
    await Hospital.insertMany(hospitals);
    await BloodRequest.insertMany(bloodRequests);

    console.log('Dummy data inserted into MongoDB');
    process.exit();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

seed();