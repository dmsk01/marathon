const AboutPage = () => {
  const handleClick = () => {
    console.log("about page handler");
  };
  return (
    <>
      <div>This is AboutPage!!!</div>
      <button onClick={handleClick}>Change theme</button>
    </>
  );
};

export default AboutPage;
