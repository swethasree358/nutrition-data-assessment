import React from "react";
import Home from "./index";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../../state/rootReducer";
import initialState from "../../state/initialState";
import thunk from "redux-thunk";
import {
  cleanup,
  getAllByTestId,
  getByTestId,
  render as testRender,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { setNutritionData } from "../../state/nutritionData/actions";

const nutritionData = [
  {
    id: "1",
    name: "Cake",
    calories: 340,
    fat: 34,
    carbs: 58,
    protein: 84,
  },
  {
    id: "2",
    name: "Donut",
    calories: 98,
    fat: 458,
    carbs: 548,
    protein: 54,
  },
];

describe("Home", () => {
  let wrapper: any;
  const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
  const apolloClient = new ApolloClient({
    uri: "",
    cache: new InMemoryCache(),
  });
  beforeEach(() => {
    wrapper = testRender(
      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <Home />
        </ApolloProvider>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("should render header", () => {
    const { container } = wrapper;
    expect(getByTestId(container, "header")).toBeDefined();
  });

  it("should render toolbox", () => {
    const { container } = wrapper;
    expect(getByTestId(container, "toolbox")).toBeDefined();
  });

  it("should render table", () => {
    const { container } = wrapper;
    expect(getByTestId(container, "table")).toBeDefined();
  });

  it("should have 2 table rows on render", () => {
    store.dispatch(setNutritionData(nutritionData));
    const { container } = wrapper;
    expect(getAllByTestId(container, "table-row").length).toBe(2);
  });
});
