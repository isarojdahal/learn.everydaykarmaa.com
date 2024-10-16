const YoutubeEmbed = ({ videoId }) => (
  <div className="video-container">
    <iframe
      width="100%"
      height="400"
      src={`https://www.youtube.com/embed/${videoId}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
);

export default YoutubeEmbed;
