import { useContext, createContext } from "react";

const DocumentContext = createContext(null);
const DocumentDispatchContext = createContext(null);
const DocumentHistoryContext = createContext(null);

function useDocument() {
  return useContext(DocumentContext);
}
function useDocumentDispatch() {
  return useContext(DocumentDispatchContext);
}
function useDocumentHistory() {
  return useContext(DocumentHistoryContext);
}

export {
  DocumentHistoryContext,
  useDocumentHistory,
  useDocumentDispatch,
  DocumentContext,
  DocumentDispatchContext,
  useDocument,
};
