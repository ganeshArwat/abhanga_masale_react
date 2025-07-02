const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("./../utils/apiFeatures");
const AttachmentModel = require("./../models/attachmentModel");

/**
 * Delete a document by ID
 */
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) return next(new AppError("No document found with that ID", 404));

    res.status(204).json({ status: "success", data: null });
  });

/**
 * Update a document by ID
 */
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) return next(new AppError("No document found with that ID", 404));

    res.status(200).json({ status: "success", data: { data: doc } });
  });

/**
 * Create a document with optional attachments and user_id
 */
exports.createOne = (Model, save_user_id = false, module_type = 0) =>
  catchAsync(async (req, res, next) => {
    if (save_user_id) req.body.user_id = req.user.id;

    const bodyArray = Array.isArray(req.body) ? req.body : [req.body];
    const insertData = bodyArray.map(({ attachments, attachments_titles, ...rest }) => rest);

    let docs = await Model.create(insertData);
    docs = Array.isArray(docs) ? docs : [docs];
    docs = docs.map((doc) => doc.toObject());

    // Attachments
    if (Array.isArray(req.files) && req.files.length > 0 && docs[0]?._id) {
      const doc_id = docs[0]._id;
      const titles = req.body.attachments_titles?.split(" | ") || [];

      const attachments = req.files.map((file, i) => ({
        title: titles[i] || `Attachment ${i + 1}`,
        file: file.filename,
        module_id: doc_id,
        module_type,
      }));

      const saved = await AttachmentModel.insertMany(attachments);
      const fetched = await AttachmentModel.find({ _id: { $in: saved.map((a) => a._id) } }).select(
        "-module_id -module_type -active"
      );

      docs[0].attachments = fetched;
    }

    res.status(201).json({ status: "success", data: { data: docs.length === 1 ? docs[0] : docs } });
  });

/**
 * Get one document by ID, optionally with attachments and population
 */
exports.getOne = (Model, module_type = 0, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);

    const doc = await query;
    if (!doc) return next(new AppError("No document found with that ID", 404));

    let result = doc.toObject();

    if (module_type > 0) {
      const attachments = await AttachmentModel.find({
        module_id: doc._id,
        module_type,
      }).select("-module_id -module_type -active");
      result.attachments = attachments;
    }

    res.status(200).json({ status: "success", data: { data: result } });
  });

/**
 * Get all documents with filtering, pagination, optional user_id and attachments
 */
exports.getAll = (Model, by_user_id = false, module_type = 0) =>
  catchAsync(async (req, res, next) => {
    const filter = by_user_id ? { user_id: req.params.user_id } : {};

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      // .limitFields()
      .paginate();

    const docs = await features.query;

    let results = docs;
    if (module_type > 0) {
      results = await Promise.all(
        docs.map(async (doc) => {
          const attachments = await AttachmentModel.find({
            module_id: doc._id,
            module_type,
          }).select("-module_id -module_type -active");

          return { ...doc.toObject(), attachments };
        })
      );
    }

    res.status(200).json({
      status: "success",
      results: results.length,
      data: { data: results },
    });
  });
