import { Link } from "react-router-dom";
import "./not-found.scss";

const NotFound = () => {
  return (
    <div className="page not-found-page">
      <div className="not-found-page__center">
        <h1 className="not-found-page__center__title">PAGE NOT FOUND</h1>
        <Link to={"/"} className="not-found-page__center__back-to-main">
          Back to main
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
