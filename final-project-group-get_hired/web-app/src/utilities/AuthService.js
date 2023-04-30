//Created AuthService to get and retrieve user from the local storage
class AuthService {
    setCurrUser = (data) => {
      localStorage.setItem("user", JSON.stringify(data));
    };
  
    getCurrUser = () => {
      let userData = JSON.parse(localStorage.getItem("user"));
      console.log("---from authservice--"+userData);
      return userData;
    };
  
    removeCurrUser = () => {
      localStorage.removeItem("user");
    };
  }
  
  export default new AuthService();
  