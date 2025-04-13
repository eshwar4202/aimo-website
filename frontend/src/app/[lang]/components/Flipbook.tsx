interface FlipbookProps {
  data: {
    url: string;
  };
}

export default function Flipbook({ data }: FlipbookProps) {

  return (
    <div className="flipbook-container">
      <iframe
        src={data.url} // The flipbook URL
        width="100%" // Make the iframe responsive
        height="600" // Adjust the height as needed
        frameBorder="0"
        style={{ border: 'none' }}
        allowFullScreen
      ></iframe>
    </div>
  )
}
