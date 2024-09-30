import useAppContext from "../useAppContext";

const Header = () => {
  const { name, version, setName, setVersion } = useAppContext();

  return (
    <header className='header'>
      <h1>React Mockup</h1>
      <div>
        <input
          type='text'
          value={name}
          maxLength={10}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='text'
          value={version}
          maxLength={10}
          onChange={(e) => setVersion(e.target.value)}
        />
      </div>
    </header>
  );
};

export default Header;
