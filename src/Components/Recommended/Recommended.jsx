import React, { useEffect, useState } from 'react'
import   "./Recommended.css";
import { API_KEY, value_converter } from '../../data';
import { Link } from 'react-router-dom';
export default function Recommended({categoryId}) {
 
  const [apiData, setApiData] = useState([]);

  const fetchData =async ()=>{

    const relatedvideo_url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=US&videoCategoryId=${categoryId}&maxResults=50&key=${API_KEY}`;
    await fetch(relatedvideo_url).then(res=>res.json()).then(data=>setApiData(data.items))
  }

  useEffect(()=>{
    fetchData();
  },[])

  return (
    <div className='recommended'>
    {
     apiData && Array.isArray(apiData) && apiData.map((item, index) => {
        return (
          <Link to={`/video/${item.snippet.categoryId}/${item.id}`} className="side-video-list" key={index}>
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <div className="vid-info">
              <h4>{item.snippet.title}</h4>
              <p>{item.snippet.channelTitle}</p>
              <p>{value_converter(item.statistics.viewCount)} Views</p>
            </div>
          </Link>
        );
      })
    }
  </div>
  
  )
}
