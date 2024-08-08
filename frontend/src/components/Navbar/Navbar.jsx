import "./Navbar.css";
const Navbar = ({balance}) => {
  return <div className="nav">
     <div className="title">Pay<span>U</span></div>
     <div className="btn">Balance: {balance}</div>
  </div>;
};

export default Navbar;
