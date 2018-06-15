// const getUser = () => {
//   return {
//     id: 123
//   }
// };
module.exports = {
  getUser: (id) => {
    return { id: id };
  },
  loginUser: () => {
    return true;
  },
  registerUser: () => {
    return { };
  }
};
