/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */
const adressService = require('../services/addressService');
const school_userService = require('../services/school_userService');
const school_ModalityService = require('../services/school_modalityService');
const userService = require('../services/userService');
const schoolService = require('../services/schoolService');
// const school_modalityService = require('../services/school_modalityService');
const logsController = require('./logsController');

const HTTP_STATUS_SERVER_ERROR_500 = 'Internal server error';
const HTTP_STATUS_NOT_FOUND_ERROR_404 = 'Resource not found';

const DB_TABLE = 'School';

const getAllScool = async (req, res) => {
  try {
    const listSchool = await schoolService.getSchools();
    const schoolsModalitiesAndCity = await Promise.all(
      listSchool.map(async (school) => {
        const modalities = await school_ModalityService.getSchoolModalities(school.inep);
        const address = await adressService.getAddressById(school.addressId);
        return { ...school, modalities, city: address.city };
      }),
    );
    return res.status(200).json(schoolsModalitiesAndCity);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const getSchoolById = async (req, res) => {
  try {
    const { inep } = req.params;
    const modalities = await school_ModalityService.getSchoolModalities(inep);
    const school = await schoolService.getSchoolById(inep, modalities);
    if (!school) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    return res.status(200).json(school);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const getSchoolByCity = async (req, res) => {
  try {
    const { city } = req.params;
    const schools = await schoolService.getSchoolByCity(city);
    if (!schools) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    return res.status(200).json(schools);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const getSchoolsByGee = async (req, res) => {
  try {
    const { gee } = req.params;
    const schools = await schoolService.getSchoolByGee(gee);
    if (!schools) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    return res.status(200).json(schools);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};
  
// eslint-disable-next-line max-lines-per-function
const createScholl = async (req, res) => {
  try {
    const { userId } = req;
    const {
      inep,
      name,
      cnpj,
      phone,
      email,
      geeId,
      modalities,
      address: {
        zip,
        street,
        number,
        complement,
        district,
        city,
        state,
        immediate_region,
        intermediate_region,
      },
    } = req.body;
    const addressData = {
      id: cnpj,
      zip,
      street,
      number,
      complement,
      district,
      city,
      state,
      immediate_region,
      intermediate_region,
    };
    const newAddress = await adressService.createAddress(addressData);
    logsController.creationLog(newAddress, 'Address', userId);

    const schoolData = { inep, name, cnpj, phone, email, addressId: newAddress.id, geeId };
    const newSchool = await schoolService.createSchool(schoolData);
    const school_inep = newSchool.inep;

    const mods = await Promise.all(
      modalities.map(async (modality) => {
        const mod = await school_ModalityService.createschool_modality({
          school_inep,
          modality_id: modality.id,
        });
        logsController.creationLog(mod, 'school_modality', userId);
        return mod;
      }),
    );

    logsController.creationLog(newSchool, DB_TABLE, userId);
    const response = { ...newSchool, ...newAddress, mods };
    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// eslint-disable-next-line
const updateSchool = async (req, res) => {
  try {
    const { inep } = req.params;
    const { userId } = req;
    const { name, cnpj, phone, email, addressId, geeId, added_modalities, removed_modalities } = req.body;
    const schoolData = { name, cnpj, phone, email, addressId, geeId };
    const oldData = await schoolService.getSchoolById(inep);
    if (!oldData) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    // tirar address do oldData
    delete oldData.Address;
    const updatedSchool = await schoolService.updateSchool(inep, schoolData);
    if (!updatedSchool) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    let addedModalities = [];
    if (added_modalities) {
      addedModalities = await Promise.all(
        added_modalities.map(async (modality) => {
          const mod = await school_ModalityService.createschool_modality({
              school_inep: inep,
              modality_id: modality,
          });
          logsController.creationLog(mod, 'school_modality', userId);
          return mod;
        }),
      );
    }

    let removedModalities = [];
    if (removed_modalities) {
      removedModalities = await Promise.all(
        removed_modalities.map(async (modality) => {
          const mod_id = await school_ModalityService.getschool_modalityByInep(inep, modality);
          const removedModality = await school_ModalityService.deleteschool_modality(mod_id[0].id);
          logsController.deleteLog(removedModality, 'school_modality', userId);
          return removedModality;
        }),
      );
    }
    logsController.updateLog(oldData, updatedSchool, DB_TABLE, userId);
    const response = { ...updatedSchool, added: addedModalities, removed: removedModalities };
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const deleteSchool = async (req, res) => {
  try {
    const { inep } = req.params;
    const { userId } = req;
    const deletedSchool = await schoolService.deleteSchool(inep);
    if (!deletedSchool) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    logsController.deleteLog(deletedSchool, DB_TABLE, userId);
    return res.status(200).json({ message: 'School deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

// eslint-disable-next-line max-lines-per-function
const getSchoolInfo = async (req, res) => {
  try {
    const { inep } = req.params;

    const school = await schoolService.getSchoolById(inep);
    if (!school) return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    const address = await adressService.getAddressById(school.addressId);
    const school_users = await school_userService.getSchool_UserByInep(inep);

    const users = await Promise.all(
      school_users.map(async (schoolUser) => {
        const user = await userService.getUserbyId(schoolUser.user_id);
        return {
          ...user,
          role: schoolUser.role,
          password: undefined,
          createdAt: undefined,
          updatedAt: undefined,
        };
      }),
    );

    const modalities = await school_ModalityService.getSchoolModalities(inep);
    const schoolInfo = {
      school: { ...school, modalities },
      address,
      users,
    };

    return res.status(200).json(schoolInfo);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const getSchoolByGeeAndCity = async (req, res) => {
  try {
    const { gee, city } = req.query;
    const parameters = ['gee', 'city'];
    if (parameters.some((param) => req.query[param])) {
      const schools = await schoolService.getSchoolByGeeAndCity(gee, city);
      if (!schools || schools.length === 0) {
        return res.status(404).json({ error: 'Nenhuma escola encontrada com esses critérios.' });
      }
      return res.status(200).json(schools);
    } 
      return res.status(400).json({ error: 'Parâmetros inválidos.' });
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

module.exports = {
  getAllScool,
  getSchoolByGeeAndCity,
  getSchoolById,
  getSchoolByCity,
  getSchoolInfo,
  getSchoolsByGee,
  createScholl,
  updateSchool,
  deleteSchool,
};
