const getChangedFields = (current, updated, fields) => {
  const changes = {};

  fields.forEach(field => {
    if (updated[field] !== undefined && current[field] !== updated[field]) {
      changes[field] = updated[field];
    }
  });

  return changes;
};

module.exports = {
  getChangedFields
};