const extractUserId = (params) => params.userId.replace(/\D/g, '');

module.exports = extractUserId;