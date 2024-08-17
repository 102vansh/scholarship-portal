const Scholarship = require('../models/scholarshipmodal')
const {ErrorHandler} = require('../middleware/error')
exports.getscholarship = async (req, res) => {
    try {
        const scholarship = await Scholarship.find();
        res.status(200).json({
            success: true,
            message: "Scholarship fetched successfully",
             scholarship
        });
    } catch (err) {
        res.status(500).json(err);
    }
}

exports.setScholarshipCriteria = async (req, res) => {
    try {
        const { criteria, guidelines } = req.body;
        // Assuming you have a Criteria model or schema
        const updatedCriteria = await Scholarship.findOneAndUpdate({}, { criteria, guidelines }, { new: true, upsert: true });

        res.status(200).json({ success: true, message: 'Criteria updated successfully', updatedCriteria });
    } catch (error) {
        console.error('Error in setScholarshipCriteria:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// exports.allocateFunds = async (req, res, next) => {
//     try {
//         const { scholarshipid, amount } = req.body;

//         const scholarship = await Scholarship.findById(scholarshipid);
//         if (!scholarship) {
//             return next(new ErrorHandler('Scholarship not found', 404));
//         }

//         if (scholarship.fundsAvailable < amount) {
//             return next(new ErrorHandler('Insufficient funds available', 400));
//         }

//         scholarship.fundsAvailable -= amount;
//         scholarship.fundallocated += amount;

//         await scholarship.save();

//         res.status(200).json({
//             success: true,
//             message: 'Funds allocated successfully',
//         });
//     } catch (error) {
//         next(error);
//     }
// }

exports.allocateFunds = async (req, res, next) => {
    try {
        const { scholarshipid, amount } = req.body;

        const scholarship = await Scholarship.findById(scholarshipid);
        if (!scholarship) {
            return next(new ErrorHandler('Scholarship not found', 404));
        }

        // Ensure the amount is a number
        const allocationAmount = Number(amount);

        if (isNaN(allocationAmount)) {
            return next(new ErrorHandler('Invalid amount provided', 400));
        }

        if (scholarship.fundsAvailable < allocationAmount) {
            return next(new ErrorHandler('Insufficient funds available', 400));
        }

        // Perform the allocation
        scholarship.fundsAvailable -= allocationAmount;
        scholarship.fundallocated += allocationAmount;

        await scholarship.save();

        res.status(200).json({
            success: true,
            message: 'Funds allocated successfully',
        });
    } catch (error) {
        next(error);
    }
};
