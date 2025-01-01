import {useState, useEffect} from 'react'
import "./YoutubeVideos.css";
const API_KEY = import.meta.env.VITE_API_KEY;
const CHANNEL_ID = import.meta.env.VITE_CHANNEL_ID;

function YoutubeVideos() {
  const [youTubeVideos, setYouTubeVideos] = useState([]);

  useEffect(() => {
      fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=8`
      )
    
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setYouTubeVideos(data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(youTubeVideos);
  return (
    <>
      <div className="container">
        <div className="row h-100 align-items-center justify-content-center text-center">
          <div className="col-12">
            <div className="title-wraper bold video-title-wrapper">
              Latest Videos
            </div>
          </div>
          {
            youTubeVideos?.map((singleVideo, i) => {
              console.log(singleVideo.snippet);
              let vidId = singleVideo.id.videoId;
              let vidLink = `https://www.youtube.com/watch?v=${vidId}`;
              let videoWrapper = (
                <div key={i} className="col-sm-12 col-md-6">
                  <div className="singleVideoWrapper">
                    <div className="videoThumbnail">
                      <a href={vidLink} target="_blank">
                        <img src={singleVideo.snippet.thumbnails.high.url} />
                      </a>
                    </div>
                    <div className="videoInfoWrapper">
                      <div className="videoTitle">
                        <a href={vidLink} target="_blank">
                          {singleVideo.snippet.title}
                        </a>
                      </div>
                      <div className="videoDesc">
                        {singleVideo.snippet.description}
                      </div>
                      <div className='published-date'>
                        {new Date(singleVideo.snippet.publishedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              );
               return videoWrapper;
            })}
        </div>
      </div>
    </>
  );
}

export default YoutubeVideos