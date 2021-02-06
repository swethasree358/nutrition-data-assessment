const { ApolloServer, gql } = require("apollo-server");

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

let dataToFrontEnd = [...nutritionData];

const getAllNutritionData = () => dataToFrontEnd;

const resetData = () => {
  dataToFrontEnd = [...nutritionData];
  return { success: true };
};

const addNewItem = ({ item }) => {
  const id = (
    parseInt(
      dataToFrontEnd.map((ele) => ele.id).sort()[dataToFrontEnd.length - 1]
    ) + 1
  ).toString();
  dataToFrontEnd.push({ id, ...item });
  return dataToFrontEnd;
};

const deleteItem = ({ id }) => {
  dataToFrontEnd = dataToFrontEnd.filter((item) => item.id !== id);
  return dataToFrontEnd;
};

const resolvers = {
  Query: {
    getAllNutritionData: () => getAllNutritionData(),
  },
  Mutation: {
    addNewItem: (_, { item }) => addNewItem({ item }),
    deleteDessert: (_, { id }) => deleteItem({ id }),
    reset: () => resetData(),
  },
};

const typeDefs = gql`
  type NutritionData {
    id: String
    name: String
    calories: Int
    fat: Int
    carbs: Int
    protein: Int
  }
  type Query {
    getAllNutritionData: [NutritionData]
  }
  type ResetResponse {
    success: Boolean
  }
  input AddItemReqObj {
    name: String
    calories: Int
    fat: Int
    carbs: Int
    protein: Int
  }
  type Mutation {
    addNewItem(item: AddItemReqObj): NutritionData
    deleteDessert(id: String): NutritionData
    reset: ResetResponse
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then((res) => {
  console.log(`Server running at port ${res.url}`);
});
