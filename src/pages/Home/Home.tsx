import { useNavigate } from "react-router-dom";
import { ContinueButton } from "../../components/Buttons";
import "./home.scss";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="page home">
      <div className="home__center">
        <h2 className="home__center__title">Welcome to Playlist!</h2>
        <p>Click below button to continue</p>
        <ContinueButton onClick={() => navigate("/playlist")} />
      </div>
    </div>
  );
};

export default Home;
