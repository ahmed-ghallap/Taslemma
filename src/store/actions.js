const clearDocument = () => {
  return { type: "CLEAR_DOCUMENT" };
};
const updateField = (field, value) => {
  return { type: "UPDATE_FIELD", field: field, value: value };
};

const updateTemplate = (templateName) => {
  return { type: "UPDATE_TEMPLATE", templateName: templateName };
};

const updateArrayElement = (arrayName, index, newElement) => {
  return {
    type: "UPDATE_ARRAY_ELEMENT",
    arrayName: arrayName,
    index: index,
    newElement: newElement,
  };
};

const removeArrayElement = (arrayName, index) => {
  return {
    type: "REMOVE_ARRAY_ELEMENT",
    arrayName: arrayName,
    index: index,
  };
};
const addArrayElement = (arrayName, newElement) => {
  return {
    type: "ADD_ARRAY_ELEMENT",
    arrayName: arrayName,
    newElement: newElement,
  };
};

export {
  updateField,
  updateArrayElement,
  removeArrayElement,
  addArrayElement,
  updateTemplate,
  clearDocument,
};
