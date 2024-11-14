import Buscador from "../Forms/Buscador";

const Header = ({ title }) => {
  return (
    <>
      <header className="header">
        <h1 className="titulo-eti">
          {title} <span className="sub">ETI</span>
        </h1>
        <Buscador />
      </header>
    </>
  );
};

export default Header;
