import { TEMPLATES } from "@store/templates.js";
const STORAGE_KEY = "my_document_data";

const documentReducer = (state, action) => {
  const { past, future, current } = state;
  switch (action.type) {
    case "UNDO": {
      if (past.length === 0) return state;
      return {
        past: past.slice(0, -1),
        current: { ...past.at(-1) },
        future: [{ ...current }, ...future],
      };
    }
    case "REDO": {
      if (future.length === 0) return state;
      return {
        past: [...past, { ...current }],
        current: { ...future.at(0) },
        future: future.slice(1),
      };
    }
    case "UPDATE_FIELD": {
      const newCurrent = {
        ...current,
        [action.field]: action.value,
      };
      return {
        past: [...past, { ...current }],
        current: newCurrent,
        future: [],
      };
    }
    case "UPDATE_ARRAY_ELEMENT": {
      const oldArray = current[action.arrayName];
      const newCurrent = {
        ...current,
        [action.arrayName]: [
          ...oldArray.slice(0, action.index),
          action.newElement,
          ...oldArray.slice(action.index + 1),
        ],
      };
      return {
        past: [...past, { ...current }],
        current: newCurrent,
        future: [],
      };
    }
    case "ADD_ARRAY_ELEMENT": {
      const oldArray = current[action.arrayName];
      const newCurrent = {
        ...current,
        [action.arrayName]: [...oldArray, action.newElement],
      };
      return {
        past: [...past, { ...current }],
        current: newCurrent,
        future: [],
      };
    }
    case "REMOVE_ARRAY_ELEMENT": {
      const oldArray = current[action.arrayName];
      const newCurrent = {
        ...current,
        [action.arrayName]: oldArray.filter((_, i) => i !== action.index),
      };
      return {
        past: [...past, { ...current }],
        current: newCurrent,
        future: [],
      };
    }
    case "UPDATE_TEMPLATE": {
      const templateName = action.templateName;
      const data = TEMPLATES[templateName].current;
      if (data === undefined)
        throw "Error: TEMPLATES does not have " + templateName;
      return {
        past: [...past, { ...current }],
        current: { ...data },
        future: [],
      };
    }
    case "CLEAR_DOCUMENT": {
      return {
        past: [],
        current: { ...TEMPLATES.blank.current },
        future: [],
      };
    }

    default: {
      throw new Error(`Unknown action: ${action.type}`);
    }
  }
};

function withHistoryLimit(reducer, limit = 50) {
  return (state, action) => {
    const nextState = reducer(state, action);
    if (nextState.past && nextState.past.length > limit) {
      return { ...nextState, past: nextState.past.slice(-limit) };
    }
    return nextState;
  };
}

function initState(defaultTemplate) {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return JSON.parse(saved);

  return defaultTemplate;
}

export { documentReducer, withHistoryLimit, initState, STORAGE_KEY };
