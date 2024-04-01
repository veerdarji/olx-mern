function Navbar(props) {
  function handleHome() {
    window.location.reload();
  }
  return (
    <nav className="py-[1%] grid grid-cols-1 sm:grid-cols-2 px-10 lg:px-4 font-fredoka bg-gradient-to-r from-cyan-400 to-gray-500">
      <div className="py-2 text-center sm:text-start">
        <button
          className="text-white hover:text-pink-50 md:ml-6 text-4xl"
          onClick={handleHome}
        >
          Olx Clone
        </button>
      </div>
      <div className="grid grid-cols-4 py-4">
        <button
          className="text-lg font-semibold border-none active:translate-y-0.5 text-white hover:text-pink-50 "
          onClick={props.onNav1}
        >
          {props.Nav1}
        </button>{' '}
        <button
          className="text-lg font-semibold border-none active:translate-y-0.5 text-white hover:text-pink-50 "
          onClick={props.onNav2}
        >
          {props.Nav2}
        </button>{' '}
        <button
          className="text-lg font-semibold border-none active:translate-y-0.5 text-white hover:text-pink-50 "
          onClick={props.onNav3}
        >
          {props.Nav3}
        </button>{' '}
        <button
          className="text-lg font-semibold border-none active:translate-y-0.5 text-white hover:text-pink-50 "
          onClick={props.onNav4}
        >
          {props.Nav4}
        </button>{' '}
      </div>
    </nav>
  );
}

export default Navbar;
