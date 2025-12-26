import { useEffect, useReducer } from "react";
import {
  DocumentDispatchContext,
  DocumentContext,
  DocumentHistoryContext,
} from "@store/context";
import {
  documentReducer,
  withHistoryLimit,
  initState,
  STORAGE_KEY,
} from "@store/reducer";

import { TEMPLATES } from "@store/templates";

const HISTORY_LMIT = 60;

export default function DocumentProvider({ children }) {
  const [data, dispatch] = useReducer(
    withHistoryLimit(documentReducer, HISTORY_LMIT),
    TEMPLATES.blank,
    initState,
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

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
}
