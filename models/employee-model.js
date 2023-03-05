const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    hireDate: Date,
    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    departmentName: {
        type: String,
    },
    designationId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    designationName: {
        type: String,
    },
},
);

employeeSchema.methods.getAnnualDays = function () {
    const hireYear = this.hireDate.getFullYear();
    const currentYear = new Date().getFullYear();
    const yearsWorked = currentYear - hireYear;

    if (yearsWorked < 1) {
        return 0;
    } else if (yearsWorked < 5) {
        return 10;
    } else if (yearsWorked < 10) {
        return 15;
    } else {
        return 20;
    }
};



module.exports = mongoose.model('Employee', employeeSchema);

// const mongoose = require('mongoose');

// const employeeSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     hireDate: {
//         type: Date,
//         required: true
//     },
//     departmentId: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         validate: {
//             validator: async (value) => {
//                 const department = await mongoose.model('Department').findById(value);
//                 return department !== null;
//             },
//             message: 'Invalid departmentId'
//         }
//     },
//     departmentName: {
//         type: String,
//         required: true
//     },
//     designationId: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         validate: {
//             validator: async (value) => {
//                 const designation = await mongoose.model('Designation').findById(value);
//                 return designation !== null;
//             },
//             message: 'Invalid designationId'
//         }
//     },
//     designationName: {
//         type: String,
//         required: true
//     },
// });

// employeeSchema.methods.getAnnualDays = function () {
//     const hireYear = this.hireDate.getFullYear();
//     const currentYear = new Date().getFullYear();
//     const yearsWorked = currentYear - hireYear;

//     if (yearsWorked < 1) {
//         return 0;
//     } else if (yearsWorked < 5) {
//         return 10;
//     } else if (yearsWorked < 10) {
//         return 15;
//     } else {
//         return 20;
//     }
// };

// module.exports = mongoose.model('Employee', employeeSchema);
