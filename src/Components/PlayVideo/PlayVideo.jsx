import React, { useEffect, useState } from 'react';
import './PlayVideo.css';
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import { API_KEY, value_converter } from "../../data";
import moment from 'moment';
import { useParams } from 'react-router-dom';
 

export default function PlayVideo() {

  const {videoId} = useParams()

  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData,setCommentData] = useState([])

  const fetchVideoData = async () => {
    const videoDetails_url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`;
    const res = await fetch(videoDetails_url);
    const data = await res.json();
    setApiData(data.items[0]);
  };

  const fetchOtherData = async () => {
    if (!apiData) return;  
  
    const channelId = apiData.snippet.channelId;
    const channelData_url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${API_KEY}`;
    
    const res = await fetch(channelData_url);
    const data = await res.json();
    setChannelData(data.items[0]);

    const comment_url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&maxResults=58&key=${API_KEY}`;

       await fetch(comment_url).then(res=>res.json()).then(data=>setCommentData(data.items))
  };
  

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);  

  useEffect(() => {
    fetchOtherData()
  }, [apiData]);

  return (
    <div className='play-video'>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>

      <h3>{apiData ? apiData.snippet.title : "Title Here"}</h3>

      <div className="play-video-info">
        <p>
          {apiData ? value_converter(apiData.statistics.viewCount) : "16K"} Views &bull;{" "}
          {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}
        </p>
        <div>
          <span><img src={like} alt="" />{apiData ? value_converter(apiData.statistics.likeCount) : "125"}</span>
          <span><img src={dislike} alt="" /></span>
          <span><img src={share} alt="" />Share</span>
          <span><img src={save} alt="" />Save</span>
        </div>
      </div>

      <hr />

      <div className="publisher">
      {channelData && channelData.snippet?.thumbnails?.default?.url && (
     <img src={channelData.snippet.thumbnails.default.url} alt="channel" />
      )}
       <div>
          <p>{apiData?apiData.snippet.channelTitle:""}</p>
          <span>{channelData?value_converter(channelData.statistics.subscriberCount):"1M"}</span>
        </div>
        <button>Subscribe</button>
      </div>

      <div className="vid-description">
        <p>{apiData?apiData.snippet.description.slice(0,250):"Description Here"}</p>
         
        <hr />
        <h4>{apiData?value_converter(apiData.statistics.commentCount):101} Comments</h4>

         {
            commentData.map((item,index)=>{
                return(

          <div className="comment" key={index} >
            <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
            <div>
              <h3>{item.snippet.topLevelComment.snippet.authorDisplayName}<span>1 day ago</span></h3>
              <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
              <div className="comment-action">
                <img src={like} alt="" />
                <span>{ value_converter (item.snippet.topLevelComment.snippet.likeCount)}</span>
                <img src={dislike} alt="" />
              </div>
            </div>
          </div>
                )
            })
         }
        
      </div>
    </div>
  );
}
