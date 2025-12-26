import { useContext, createContext, useReducer } from "react";

import { TEMPLATES } from "@store/templates";

const DocumentContext = createContext(null);
const DocumentDispatchContext = createContext(null);
const DocumentHistoryContext = createContext(null);

export const DocumentProvider = ({ children }) => {
  const [data, dispatch] = useReducer(
    withHistoryLimit(documentReducer),
    TEMPLATES.blank,
  );
  const history = { past: data.past, future: data.future };
  return (
    <DocumentDispatchContext value={dispatch}>
      <DocumentContext value={data.current}>
        <DocumentHistoryContext value={history}>
          {children}
        </DocumentHistoryContext>
      </DocumentContext>
    </DocumentDispatchContext>
  );
};

export function useDocument() {
  return useContext(DocumentContext);
}
export function useDocumentDispatch() {
  return useContext(DocumentDispatchContext);
}
export function useDocumentHistory() {
  return useContext(DocumentHistoryContext);
}

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
