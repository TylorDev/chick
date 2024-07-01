import { useState } from "react";

import "./App.css";
import * as mmb from "music-metadata-browser";

const App = () => {
  const [metadatos, setMetadatos] = useState([]);
  const [audioUrl, setAudioUrl] = useState(null);

  const getFileMetadata = async (file) => {
    const parseResult = { file };
    try {
      const metadata = await mmb.parseBlob(file, { native: true });
      parseResult.metadata = metadata;
    } catch (err) {
      parseResult.error = err.message;
    }

    return parseResult;
  };

  const onChangeHandler = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setAudioUrl(objectUrl);

    const metadataResult = await getFileMetadata(file);
    setMetadatos([metadataResult]);
  };

  function BinToBlob(uint8Array, mimeType = "image/png") {
    const blob = new Blob([uint8Array], { type: mimeType });
    const url = URL.createObjectURL(blob);
    return url;
  }

  console.log(metadatos);
  const metadata = metadatos.map((parseResult) => (
    <div key={parseResult.file.name}>
      <img
        src={BinToBlob(parseResult.metadata.common.picture[0].data)}
        alt={parseResult.metadata.common.title}
      />
      <div>
        <span>Title:</span>
        <span>{parseResult.metadata.common.title || "N/A"}</span>
      </div>
    </div>
  ));

  return (
    <div className="App">
      <input type="file" name="file" onChange={onChangeHandler} />

      {metadatos.length === 0 ? (
        <div key="message">Please choose an audio file</div>
      ) : (
        metadata
      )}

      {audioUrl && (
        <audio controls>
          <source src={audioUrl} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default App;
