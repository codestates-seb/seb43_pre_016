import { FadeLoader } from "react-spinners";

const Loading = () => {
  const override = {
    height: "100vh",
    display: "flex",
    margin: "0 auto",
    textAlign: "center",
  };
  return (
    <div>
      <FadeLoader
        color="#f48228"
        height={20}
        radius={2}
        width={5}
        cssOverride={override}
      />
    </div>
  );
};

export default Loading;
