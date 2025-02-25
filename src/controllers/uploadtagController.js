import UploadTag from '../models/UploadTag';

const get = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    if (!id) {
      const response = await UploadTag.findAll();
      return res.status(200).send({
        message: 'Dados Encontrados',
        response,
      });
    }

    const response = await UploadTag.findOne({
      where: {
        id,
      },
    });
    return res.status(200).send({
      message: 'Dados Encontrados',
      response,
    });
  } catch (error) {
    return res.status(500).send({
      message: 'Ops',
      response: error.message,
    });
  }
};

const create = async (req, res) => {
  try {
    const { id, idTags, idUpload } = req.body;
    const response = await UploadTag.create(
      {
        id,
        idTags,
        idUpload,
      },
    );
    return res.status(200).send({
      message: 'Dados Criados',
      response,
    });
  } catch (error) {
    return res.status(500).send({
      message: 'Ops',
      response: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    if (!id) {
      return res.status(200).send({
        message: 'Id não informado',
        response: [],
      });
    }

    const response = await UploadTag.findOne({
      where: {
        id,
      },
    });

    if (!response) {
      return res.status(404).send({
        message: 'Id não encontrado',
        response: [],
      });
    }

    Object.keys(req.body).forEach((chave) => {
      response[chave] = req.body[chave];
    });

    await response.save();
    return res.status(201).send({
      message: 'Dados Atualizados',
      response,
    });
  } catch (error) {
    return res.status(500).send({
      message: 'Ops',
      response: error.message,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    if (!id) {
      return res.status(200).send({
        message: 'Id não informado',
        response: [],
      });
    }

    const response = await UploadTag.findOne({
      where: {
        id,
      },
    });

    if (!response) {
      return res.status(404).send({
        message: 'Id não encontrado',
        response: [],
      });
    }
    await response.destroy();
    return res.status(200).send({
      message: 'Dados Destruidos',
      response,
    });
  } catch (error) {
    return res.status(500).send({
      message: 'Ops',
      response: error.message,
    });
  }
};

export default {
  get,
  create,
  update,
  destroy,
};
