const APIFeatures=require('./ApiFeatures')
const catchAsync=require('./CatchAsync')

exports.getAll=Model=>
    catchAsync(async(req,res,next)=>
    {
        const features=new APIFeatures(Model.find(),req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate()
        const data=await features.query;
        res.status(200).json({
            status: 'success',
            data: data,
        });
    }
)


exports.getOne=(Model,popOptions)=>
    catchAsync(async(req,res,next)=>
    {
        console.log(req.params.id)
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