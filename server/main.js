const { ApolloServer, gql } = require("apollo-server");

const nutritionData = [
  {
    nutritionId: "1",
    name: "Cake",
    calories: 340,
    fat: 34,
    carbs: 58,
    protein: 84,
  },
  {
    nutritionId: "2",
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
  const nutritionId = (
    parseInt(
      dataToFrontEnd.map((ele) => ele.id).sort()[dataToFrontEnd.length - 1]
    ) + 1
  ).toString();
  dataToFrontEnd.push({ nutritionId, ...item });
  return { nutritionId, ...item };
};

const deleteItem = ({ name }) => {
  dataToFrontEnd = dataToFrontEnd.filter((item) => item.name !== name);
  return { success: true };
};

const resolvers = {
  Query: {
    nutritionData: () => getAllNutritionData(),
  },
  Mutation: {
    addNewItem: (_, { item }) => addNewItem({ item }),
    deleteItem: (_, { name }) => deleteItem({ name }),
    reset: () => resetData(),
  },
};

const typeDefs = gql`
  type NutritionData {
    nutritionId: String
    name: String
    calories: Int
    fat: Int
    carbs: Int
    protein: Int
  }
  type Query {
    nutritionData: [NutritionData]
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
    deleteItem(name: String): ResetResponse
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
