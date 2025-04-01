import "./Home.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

function Home() {
  const [animearray, setAnimeArray] = useState([]);
  const [input, setInput] = useState("");
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [myList, setMyList] = useState([]);

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

  function updateInput(e) {
    setInput(e.target.value);
    fetchAnimeData(e.target.value);
    // console.log(animearray);
  }

  useEffect(() => {
    goToStart(); // Reset scroll to the start
    goToStart2();
  }, [animearray]); // Dependency on animearray ensures it resets when data changes

  function updateSelectedAnime(anime) {
    setSelectedAnime(anime);
  }

  function swipeLeft() {
    document.querySelector("#upperright").scrollBy({
      left: -400, // Adjust scroll distance as per your needs
      behavior: "smooth",
    });
  }

  function swipeRight() {
    document.querySelector("#upperright").scrollBy({
      left: 400, // Adjust scroll distance as per your needs
      behavior: "smooth",
    });
  }

  function swipeLeft2() {
    document.querySelector("#lowerright").scrollBy({
      left: -400, // Adjust scroll distance as per your needs
      behavior: "smooth",
    });
  }

  function swipeRight2() {
    document.querySelector("#lowerright").scrollBy({
      left: 400, // Adjust scroll distance as per your needs
      behavior: "smooth",
    });
  }

  function goToStart() {
    if (document.querySelector("#upperright")) {
      document.querySelector("#upperright").scrollTo({ left: 0 });
    }
  }

  function goToStart2() {
    if (document.querySelector("#lowerright")) {
      document.querySelector("#lowerright").scrollTo({ left: 0 });
    }
  }

  // Load myList from localStorage when the component mounts
  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("myList"));
    if (storedList) {
      setMyList(storedList);
    }
  }, []);

  // Save myList to localStorage whenever it changes
  useEffect(() => {
    if (myList.length > 0) {
      localStorage.setItem("myList", JSON.stringify(myList));
    }
  }, [myList]);

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
          className="homeimg"
          src="https://www.pngmart.com/files/Anime-Logo-PNG-Isolated-Image.png"
          onClick={goHome}
        />
        <input type="text" placeholder="Search anime" onChange={updateInput} />
        <div id="nav_options">
          <h3 onClick={gotomylist}>My List</h3>
          <h3 onClick={gotoRankings}>Rankings</h3>
          <h3 onClick={goHelp}>Help</h3>
        </div>
      </nav>
      <div id="section">
        <div id="left">
          {selectedAnime ? (
            <>
              <h2 className="title">{selectedAnime.title || "Naruto"}</h2>
              <img
                className="animeimg1"
                src={selectedAnime.images.jpg.large_image_url}
                alt={`Cover of ${selectedAnime.title || "Anime"}`}
              />
              {selectedAnime.rank > 1000 ? (
                <>
                  <h2>Rank🥇 : {selectedAnime.rank || "N/A"}</h2>
                </>
              ) : (
                <h2>Top Rank🏆 : {selectedAnime.rank || "N/A"}</h2>
              )}
              <h2>Score🔢 : {selectedAnime.score || "N/A"}</h2>
              <h2>Popularity💗 : {selectedAnime.popularity || "N/A"}</h2>
              <div className="animeinfo">
                <p>Members: {selectedAnime.members || "N/A"}</p>
                <p>Source: {selectedAnime.source || "N/A"}</p>
                <p>Duration: {selectedAnime.duration || "N/A"}</p>
                <p>Status: {selectedAnime.status || "N/A"}</p>
                <p>Rating: {selectedAnime.rating || "N/A"}</p>
                <button
                  className="check"
                  onClick={() => {
                    window.location.href = selectedAnime.url;
                  }}
                >
                  Check
                </button>
              </div>
            </>
          ) : animearray.length > 0 ? (
            <>
              <h2 className="title">{animearray[0].title || "Naruto"}</h2>
              <img
                className="animeimg1"
                src={
                  animearray[0].images?.jpg?.large_image_url ||
                  "https://www.pngall.com/wp-content/uploads/13/Anime-Logo-PNG-Photos.png"
                }
                alt={`Cover of ${animearray[0].title || "Anime"}`}
              />
              {animearray[0].rank > 1000 ? (
                <>
                  <h2>Rank🥇 : {animearray[0].rank || "N/A"}</h2>
                </>
              ) : (
                <h2>Top Rank🏆 : {animearray[0].rank || "N/A"}</h2>
              )}
              <h2>Score🔢 : {animearray[0].score || "N/A"}</h2>
              <h2>Popularity💗 : {animearray[0].popularity || "N/A"}</h2>
              <div className="animeinfo">
                <p>Members: {animearray[0].members || "N/A"}</p>
                <p>Source: {animearray[0].source || "N/A"}</p>
                <p>Duration: {animearray[0].duration || "N/A"}</p>
                <p>Status: {animearray[0].status || "N/A"}</p>
                <p>Rating: {animearray[0].rating || "N/A"}</p>
                <button
                  className="check"
                  onClick={() => {
                    window.location.href =
                      "https://myanimelist.net/anime/20/Naruto";
                  }}
                >
                  Check
                </button>
              </div>
            </>
          ) : null}
        </div>

        <div id="right">
          <h1>Anime</h1>
          <div id="upperright">
            <div id="animelist">
              {animearray.length > 0 ? (
                animearray.map((item) => {
                  return (
                    <div className="animecard">
                      <img
                        src={item.images.jpg.large_image_url}
                        alt=""
                        className="animeimg"
                        onClick={() => {
                          updateSelectedAnime(item);
                        }}
                      />
                      <h3 id="animetitle">{item.title}</h3>
                      <button
                        id="add"
                        onClick={
                          myList.some((item4) => item4.mal_id === item.mal_id)
                            ? null
                            : () => {
                                setMyList((prevList) => [...prevList, item]);
                                localStorage.setItem(
                                  "myList",
                                  JSON.stringify(myList)
                                );
                              }
                        }
                      >
                        Add
                      </button>
                    </div>
                  );
                })
              ) : (
                <p>No results</p>
              )}
            </div>
          </div>
          <div id="buttons">
            {animearray.length > 0 ? (
              <>
                <i class="fas fa-chevron-left" onClick={swipeLeft}></i>
                <i class="fas fa-chevron-right" onClick={swipeRight}></i>
              </>
            ) : null}
          </div>
          <h1>My List</h1>
          {myList.length > 0 ? (
            <>
              <div id="lowerright">
                <div id="myanimelist">
                  {myList ? (
                    myList.map((item2) => {
                      return (
                        <div className="animecard" key={item2.mal_id}>
                          <img
                            src={item2.images.jpg.large_image_url}
                            alt=""
                            className="animeimg"
                            onClick={() => {
                              updateSelectedAnime(item2);
                            }}
                          />
                          <h3 id="animetitle">{item2.title}</h3>
                          <button
                            className="deletebtn"
                            onClick={() => {
                              const updatedList = myList.filter(
                                (item3) => item3 !== item2
                              );

                              // Update the state with the new list
                              setMyList(updatedList);

                              // Immediately update localStorage with the updated list
                              localStorage.setItem(
                                "myList",
                                JSON.stringify(updatedList)
                              );
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      );
                    })
                  ) : (
                    <div>Sorry</div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <p>Your List is Empty</p>
          )}
          <div id="buttons">
            {myList.length > 3 ? (
              <>
                <i class="fas fa-chevron-left" onClick={swipeLeft2}></i>
                <i class="fas fa-chevron-right" onClick={swipeRight2}></i>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
