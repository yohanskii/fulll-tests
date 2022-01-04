import { useEffect, useReducer, useState } from "react";

export type GitHubUserType = { id: number; login: string };

export interface GitHubReturn {
  items: Array<GitHubUserType>;
  total_count: number;
}

export interface KeyValue {
  [key: string]: GitHubReturn;
}

export interface State {
  isLoading: boolean;
  isError: boolean;
  data: KeyValue;
}

export type Action =
  | { type: "REQUEST" }
  | { type: "FAILURE" }
  | { type: "SUCCESS"; payload: KeyValue };

//reducer
function dataFetchReducer(state: State, action: Action): State {
  switch (action.type) {
    case "REQUEST":
      return { ...state, isLoading: true, isError: false };
    case "SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: { ...state.data, ...action.payload },
      };
    case "FAILURE":
      return { ...state, isLoading: false, isError: true };
    default:
      throw new Error();
  }
}

function useDataApi(
  endpoint: string,
  initialData: { [key: string]: GitHubReturn }
) {
  //init state
  const initialState = {
    isLoading: false,
    isError: false,
    data: initialData,
  };

  const [state, dispatch] = useReducer(dataFetchReducer, initialState);

  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      try {
        // FETCH if query and query not in data like { ["yohanskii"] : {}}
        if (query && !state.data[query]) {
          // launch isLoading : true, isError: false
          dispatch({ type: "REQUEST" });

          const result: GitHubReturn = await fetch(endpoint + query).then(
            (response) => {
              if (!response.ok) {
                throw new Error(
                  `Request failed with status ${response.status} => response NOT OK`
                );
              }
              return response.json();
            }
          );

          //component not unmount
          if (!isCancelled) {
            //dispatch data, isLoading: false, isError: false
            dispatch({ type: "SUCCESS", payload: { [query]: result } });
          }
        }
      } catch (error: any) {
        //component not unmount
        if (!isCancelled) {
          // isError: true
          dispatch({ type: "FAILURE" });
        }
      }
    };

    fetchData();

    //anticipe unmount Components
    return () => {
      isCancelled = true;
    };
  }, [query, state.data, endpoint]);

  return [state, setQuery] as const;
}

export default useDataApi;
