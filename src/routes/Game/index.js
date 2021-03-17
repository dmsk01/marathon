const GamePage = ({ onChangePage }) => {
  const handleClick = () => {
    console.log("go to the home page from game page");
    onChangePage && onChangePage("app");
  };
  return (
    <>
      <div>
        This is GamePage!!!
        <button onClick={handleClick}>Go to the Home page!</button>
      </div>
    </>
  );
};

export default GamePage;
