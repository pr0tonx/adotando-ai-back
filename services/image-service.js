const uuid = require('uuid');

const ResponseFactory = require('../utils/ResponseFactory');
const {sequelizeError} = require('../errors/sequelizeError');

const imageModel = require('../models/image-model');

const addImages = async function (body, transaction) {
  if (!Array.isArray(body.images) || body.images.length === 0) return {};

  const createdImages = [];

  for (const image of body.images) {
    if (typeof image !== 'string' || !image.match(/^data:image\/(png|jpeg|jpg);base64,/)) {
      throw new Error('Invalid image format');
    }

    const base64Data = image.split(',')[1];
    const buffer = Buffer.from(base64Data, 'base64');

    const img = await imageModel.createImage({
      uuid: uuid.v6(),
      dogUuid: body.dogUuid,
      data: buffer
    }, {transaction})
      .catch(err => sequelizeError(err));

    createdImages.push(img.dataValues);
  }

  return createdImages;
};

const deleteImage = async function (uuid) {
  const image = await imageModel.getImageById(uuid);

  if (!image) {
    return new ResponseFactory().createError(
      'NOT_FOUND',
      'Image not found.',
      {
        field: 'uuid', rejectedValue: uuid, rule: 'Image not found.'
      },
      404
    );
  }

  return await image.destroy().catch(err => sequelizeError(err));
};

module.exports = {
  addImages,
  deleteImage
};