const User = require('./../models/userModel');
const AppError = require('./../utils/AppError');
const QueryHelpers=require('./../utils/QueryHelpers')
const catchAsync = require('./../utils/CatchAsync');
exports.getAllUsers = QueryHelpers.getAll(User)
exports.getUser = QueryHelpers.getOne(User)
exports.deleteUser = QueryHelpers.deleteOne(User)
exports.updateUser=catchAsync(async(req,res,next)=>
    {
    const user = await User.findById(req.params.id).select('+active');
    if (!user) {
        return next(new AppError('No User found with that ID', 404));
      }
    if(req.body.active!=null ||req.body.active!=undefined) user.active=req.body.active;
    if(req.body.role!=null ||req.body.role!=undefined) user.role=req.body.role;
    user.save({ validateBeforeSave: false });
    res.status(201).json({
        status: 'success',
        data: user
        
    });
    }
    )
exports.updateMe=catchAsync(async(req,res,next)=>
    {
    req.params.id=req.user.id;
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new AppError('No User found with that ID', 404));
      }
    if(req.body.fname!=null ||req.body.fname!=undefined) user.fname=req.body.fname;
    if(req.body.lname!=null ||req.body.lname!=undefined) user.lname=req.body.lname;
    if(req.body.phone!=null ||req.body.phone!=undefined) user.phone=req.body.phone;
    if(req.body.secPhone!=null ||req.body.secphone!=undefined) user.secphone=req.body.secphone;
    
    user.save({ validateBeforeSave: false });
    res.status(201).json({
        status: 'success',
        data: user
        
    });
    }
    )
exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
    };
