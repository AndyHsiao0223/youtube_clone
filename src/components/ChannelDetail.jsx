import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { Videos, ChannelCard } from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`)
      .then((data) => setChannelDetail(data?.items[0]));

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
      .then((data) => setVideos(data?.items));
  }, [id]);
  
  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{
          background: 'linear-gradient(108deg, rgba(214,255,140,1) 0%, rgba(255,211,125,1) 50%, rgba(255,198,123,1) 100%)',
          zIndex: 10,
          height: '300px'
        }} />
          <ChannelCard channelDetail={channelDetail} marginTop='-110px' />
      </Box>
      <Box display="flex" p="2">
        <Videos videos={videos} justifyContent="center" />
      </Box>
    </Box>
  )
}

export default ChannelDetail