import React, { useEffect, useState } from 'react'
import moment from 'moment';
import './Feed.css'
import { Link } from 'react-router-dom'
import {API_KEY} from "../../data"
import {value_converter} from "../../data"

export default function Feed({category}) {

  const [data,setData] = useState([])

  const fetchData = async()=>{
    const videoList_url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=US&videoCategoryId=${category}&maxResults=50&key=${API_KEY}`
    await fetch(videoList_url).then(response=>response.json().then(data=>setData(data.items)))
  }

  useEffect(()=>{
    fetchData()
  },[category])

  return (
    <div className='feed'>
        {
            data.map((item,index)=>{
                return(
                 
       <Link to={`video/${item.snippet.categoryId}/${item.id}`} className="card" key={index}>
         <img src={item.snippet.thumbnails.medium.url} alt="" />
         <h2>{item.snippet.title}</h2>
         <h3>{item.snippet.channelTitle}</h3>
         <p> {value_converter(item.statistics.viewCount)} views 
         views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
       </Link>
                )
            })
        }
        
        
    </div>
  )
}
