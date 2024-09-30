import useAppContext from "../../useAppContext";

const Header = () => {
  const { version } = useAppContext();

  return (
    <header className='header'>
      <h1>Mockup</h1>
      <div>
        {"Version: "}
        {version}
      </div>
    </header>
  );
};

export default Header;
