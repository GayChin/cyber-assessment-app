import React, {Component, createContext} from "react";

export const AuthContext = createContext();

class AuthContextProvider extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      id: "",
      isAuthenticated: false,
      firstTime: false,
    };

    this.setLogout = this.setLogout.bind(this);
  }

  setLogout = () => {
    this.setState({
      name: "",
      id: "",
      isAuthenticated: false,
      firstTime: false,
    });
  };

  updateState = (name, id, isAuthenticated, firstTime) => {
    this.setState({
      name: name,
      id: id,
      isAuthenticated: isAuthenticated,
      firstTime: firstTime,
    });
  };

  componentDidMount() {
    this.setState({
      ...JSON.parse(localStorage.getItem("state")),
    });
  }
  //same as useEffect( ,[])

  componentDidUpdate() {
    localStorage.setItem("state", JSON.stringify(this.state));
  }
  //same as useEffect( ,state)

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          setLogout: this.setLogout,
          updateState: this.updateState,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthContextProvider;
