import "./Rankings.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

function Rankings() {
  const navigate = useNavigate();
  function goHome() {
    navigate("/");
  }

  function gotomylist() {
    navigate("/mylist");
  }

  function goHelp() {
    navigate("/help");
  }

  function sortbyrank() {
    fetchAnimeDataRank("");
  }

  function sortbyscore() {
    fetchAnimeDataScore("");
  }

  function sortbypopularity() {
    fetchAnimeDataPopularity("");
  }

  useEffect(() => {
    fetchAnimeData(""); // Empty query to fetch a list of anime
  }, []); // Empty dependency array means this runs once on component mount

  const [animearray, setAnimeArray] = useState([]);
  const [input, setInput] = useState("");
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [myList, setMyList] = useState([]);
  const [clickedButtons, setClickedButtons] = useState({});

  async function fetchAnimeData(query) {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime?q=`);
      const animedata = await response.json();
      setAnimeArray(animedata.data || []);
    } catch (error) {
      alert("Whoopsies!");
    }
  }

  async function fetchAnimeDataRank(query) {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/top/anime?limit=25`
      );
      const animedata = await response.json();
      setAnimeArray(animedata.data || []);
    } catch (error) {
      alert("Whoopsies!");
    }
  }

  async function fetchAnimeDataScore(query) {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/top/anime?limit=25`
      );
      const animedata = await response.json();
      setAnimeArray(animedata.data || []);
    } catch (error) {
      alert("Whoopsies!");
    }
  }

  async function fetchAnimeDataPopularity(query) {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=25`
      );
      const animedata = await response.json();
      setAnimeArray(animedata.data || []);
    } catch (error) {
      alert("Whoopsies!");
    }
  }

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("myList"));
    if (storedList) {
      setMyList(storedList);
    }
  }, []);

  return (
    <div>
      <nav>
        <img
          src="https://www.pngmart.com/files/Anime-Logo-PNG-Isolated-Image.png"
          onClick={goHome}
        />
        <div id="nav_options">
          <h3 onClick={gotomylist}>My List</h3>
          <h3>Rankings</h3>
          <h3 onClick={goHelp}>Help</h3>
        </div>
      </nav>
      <div id="main_rankings">
        <h2>Sort By:</h2>
        <div id="categories">
          <h3 onClick={sortbyrank}>Rank 🥇</h3>
          <h3 onClick={sortbyscore}>Score 🔢</h3>
          <h3 onClick={sortbypopularity}>Popularity 💗</h3>
        </div>
        <div id="ranking_cards_container">
          {animearray.map((item) => {
            return (
              <div id="list_item" className="rankingcards">
                <img
                  id="ranking_img"
                  src={item.images.jpg.large_image_url}
                  alt=""
                />
                <div id="description" className="description">
                  <h2>{item.title}</h2>
                  <p>Rank🥇: {item.rank}</p>
                  <p>Score🔢: {item.score}</p>
                  <p>Popularity💗: {item.popularity}</p>
                  <button
                    className={clickedButtons[item.mal_id] ? "added" : "check"}
                    onClick={
                      myList.some((item4) => item4.mal_id === item.mal_id)
                        ? null
                        : () => {
                            setMyList((prevList) => {
                              const updatedList = [...prevList, item];
                              // Update localStorage after the state is updated
                              localStorage.setItem(
                                "myList",
                                JSON.stringify(updatedList)
                              );
                              setClickedButtons((prev) => ({
                                ...prev,
                                [item.mal_id]: true, // Set this button as clicked
                              }));
                              localStorage.setItem(
                                "clickedButtons",
                                JSON.stringify(clickedButtons)
                              );
                              return updatedList;
                            });
                          }
                    }
                  >
                    {clickedButtons[item.mal_id] ? "Added" : "Add"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Rankings;
