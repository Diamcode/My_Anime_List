import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Mylist.css";

function MyList() {
  const navigate = useNavigate();
  function goHome() {
    navigate("/");
  }

  function gotoRankings() {
    navigate("/rankings");
  }

  function goHelp() {
    navigate("/help");
  }

  const [animearray, setAnimeArray] = useState([]);
  const [input, setInput] = useState("");
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [myList, setMyList] = useState([]);

  // Fetch the stored myList from localStorage when the component mounts
  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("myList"));
    if (storedList) {
      setMyList(storedList);
    }
  }, []);

  async function fetchAnimeData(query) {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?q=${query}&limit=10`
      );
      const animedata = await response.json();
      setAnimeArray(animedata.data || []);
    } catch (error) {
      alert("Whoopsies!");
    }
  }

  useEffect(() => {
    fetchAnimeData("naruto");
  }, []);

  return (
    <div>
      <nav>
        <img
          src="https://www.pngmart.com/files/Anime-Logo-PNG-Isolated-Image.png"
          onClick={goHome}
        />
        <div id="nav_options">
          <h3>My List</h3>
          <h3 onClick={gotoRankings}>Rankings</h3>
          <h3 onClick={goHelp}>Help</h3>
        </div>
      </nav>
      <div id="list">
        <h1>My List</h1>
        {myList.length > 0 ? (
          myList.map((item) => {
            return (
              <div id="list_item">
                <img
                  className="mylist_img"
                  src={item.images.jpg.large_image_url}
                  alt=""
                />
                <div id="description">
                  <h2>{item.title}</h2>
                  <p>{item.synopsis}</p>
                  <button
                    className="check"
                    onClick={() => {
                      window.location.href = item.url;
                    }}
                  >
                    Check
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>
            Your list is empty...go back to the main page and add your favorite
            anime!
          </p>
        )}
      </div>
    </div>
  );
}

export default MyList;
