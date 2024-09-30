import useAppContext from "../useAppContext";

const Footer = () => {
  const { name, version } = useAppContext();

  return (
    <footer className='footer'>
      <p>
        &copy; 2024 React Mockup
        {name && version && (
          <>
            [{name}][{version}]
          </>
        )}
      </p>
    </footer>
  );
};

export default Footer;
