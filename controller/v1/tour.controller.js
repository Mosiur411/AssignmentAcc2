const Tours = require('../../model/tours.schema.js');
const asyncHandler = require('../../middleware/catchAsyncError.js');
const ErrorHandler = require('../../utils/errorHandle.js');
const { isValidObjectId } = require('mongoose');

// Get All Tour
exports.getAllTours = asyncHandler(async (req, res, next) => {
  const fields = req.query?.fields?.split(',')?.join(' ') || '';
  const sort = req.query?.sort?.split(',')?.join(' ') || '';
  const { page = 1, limit = 0 } = req.query;

  const tours = await Tours.find()
    .select(fields)
    .skip((+page - 1) * +limit)
    .limit(+limit)
    .sort(sort);

  if (!tours) {
    res.status(400).json({
      success: false,
      message: 'something is wrong'
    });
  }
  res.status(200).json({
    success: true,
    message: 'get all tours',
    data: tours
  });
});

// Create A Tour
exports.createTour = asyncHandler(async (req, res, next) => {

  const result = await Tours.create(req.body);
  if (!result) {
    return next(new ErrorHandler("Tour Not Found", 404))
  }
  res.status(201).json({
    message: "Tour created successfully",
    status: 201,
    result
  });
});

//Get Cheapest Tours
exports.getCheapest = asyncHandler(async (req, res, next) => {
  const cheapest = await Tours.find().sort('price').limit(3);
  res.status(200).json({
    success: true,
    message: 'cheapest tours price',
    data: cheapest
  });
});

//  Get A Tour By Id
exports.getOneTourById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const result = await Tours.findById(id);
  const incViewCont = await Tours.updateOne(
    { _id: id },
    { $inc: { viewCount: 1 } }
  );
  if (!result || !isValidObjectId(id) || !incViewCont.acknowledged) {
    return res.status(400).json({ success: false, message: 'no data found' });
  }
  res.status(200).json({
    success: true,
    message: 'get tour details by id',
    data: result
  });
});

// Get All Trending Tours
exports.getTrending = asyncHandler(async (req, res, next) => {
  const trending = await Tours.find({}).sort('-viewCount').limit(3);
  if (!trending || trending.length === 0) {
    return next(new ErrorHandler(`No data found`, 404));
  }
  res.status(200).json({
    success: true,
    message: 'Trending tours',
    data: trending
  });
});

// Update Tour Service
exports.updateById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  const result = await Tours.updateOne(
    { _id: id },
    { $set: data },
    { runValidators: true }
  );

  if (!result.acknowledged || !isValidObjectId(id)) {
    return res.status(400).json({ success: false, message: 'no data updated' });
  }
  res.status(200).json({ success: true, message: 'tour updated' });
});
