const APIFeatures=require('./ApiFeatures')
const catchAsync=require('./CatchAsync')
const AppError=require('./AppError')
exports.getAll=(Model,popOptions)=>
    catchAsync(async(req,res,next)=>
    {
        let features=new APIFeatures(Model.find(),req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate()
        let data;
        if (popOptions) data=await features.query.populate(popOptions)
        else data=await features.query;
        res.status(200).json({
            status: 'success',
            data: data,
        });
    }
)


exports.getOne=(Model,popOptions)=>
    catchAsync(async(req,res,next)=>
    {
        let query = Model.findById(req.params.id);
        if (popOptions) query = query.populate(popOptions);
        const doc = await query;
    
        if (!doc) {
          return next(new AppError('No document found with that ID', 404));
        }
    
        res.status(200).json({
          status: 'success',
          data: {
            data: doc
          }
        });
    }
)
exports.editOne=(Model,popOptions)=>
    catchAsync(async(req,res,next)=>
    {
        let query = await Model.findByIdAndUpdate(req.params.id,req.body,{
          new: true,
          runValidators: true
        })    
        if (popOptions) query = query.populate(popOptions);
        query=await query;
        if (!query) {
          return next(new AppError('No document found with that ID', 404));
        }
    
        res.status(200).json({
          status: 'success',
          data: {
            data: query
          }
        });
    }
)
exports.createOne=(Model)=>
    catchAsync(async(req,res,next)=>
    {
      const doc = await Model.create(req.body);
      res.status(201).json({
        status: 'success',
        data: {
          data: doc
        }
      });
    }
)
exports.deleteOne=(Model)=>
    catchAsync(async(req,res,next)=>
    {
      const doc = await Model.findByIdAndDelete(req.params.id);
      if (!doc) {
        return next(new AppError('No document found with that ID', 404));
      }
  
      res.status(204).json({
        status: 'success',
        data: null
      });
    }
)