import "./Help.css";
import { useNavigate } from "react-router-dom";

function Help() {
  const navigate = useNavigate();

  function gotomylist() {
    navigate("/mylist");
  }

  function gotoRankings() {
    navigate("/rankings");
  }

  function goHome() {
    navigate("/");
  }

  function goHelp() {
    navigate("/help");
  }

  return (
    <div>
      <nav>
        <img
          src="https://www.pngmart.com/files/Anime-Logo-PNG-Isolated-Image.png"
          onClick={goHome}
        />
        <div id="nav_options">
          <h3 onClick={gotomylist}>My List</h3>
          <h3 onClick={gotoRankings}>Rankings</h3>
          <h3 onClick={goHelp}>Help</h3>
        </div>
      </nav>
      <div id="help_section">
        <h2>Create Your List</h2>
        <div id="help_container">
          <div id="firstcard">
            <img
              src="https://cdn.myanimelist.net/images/about/overview/fig01_1@2.png?v=170130"
              alt=""
              id="firstimg"
            />
            <h3>What have you watched?</h3>
            <p>
              Create your personalized list from tens of thousands of titles on
              the world’s largest anime and manga database.
            </p>
          </div>
          <div id="secondcard">
            <img
              src="https://cdn.myanimelist.net/images/about/overview/fig01_2@2.png?v=170130"
              alt=""
              id="secondimg"
            />
            <h3>Need to stay up to date?</h3>
            <p>
              Use your list to organize and track what titles you’ve completed,
              your current progress, what you plan to watch or read and so much
              more.
            </p>
          </div>
        </div>
        <button className="check" onClick={goHome}>Start exploring</button>
      </div>
    </div>
  );
}

export default Help;
