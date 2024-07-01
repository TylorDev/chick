import { useState } from "react";
import { Buffer } from "buffer";

import ReactPlayer from "react-player";
// Polifill para Buffer
window.Buffer = window.Buffer || Buffer;

export const FileSelector = () => {
  const [files, setFiles] = useState([]);
  const [audioUrl, setAudioUrl] = useState(null);

  const [audioKey, setAudioKey] = useState(0);

  const handleDirectoryOpen = async () => {
    try {
      const directoryHandle = await window.showDirectoryPicker();
      const mp3Files = [];

      for await (const entry of directoryHandle.values()) {
        if (entry.kind === "file" && entry.name.endsWith(".mp3")) {
          const file = await entry.getFile();
          const url = URL.createObjectURL(file);
          mp3Files.push({ name: entry.name, url });
        }
      }

      setFiles(mp3Files);
    } catch (error) {
      console.error("Error opening directory:", error);
    }
  };

  const handlePlay = async (fileUrl) => {
    setAudioUrl(fileUrl);
    setAudioKey((prevKey) => prevKey + 1);
  };

  return (
    <div>
      <button onClick={handleDirectoryOpen}>Select Directory</button>
      {files.length > 0 && (
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              {file.name}
              <button onClick={() => handlePlay(file.url)}>Play</button>
            </li>
          ))}
        </ul>
      )}

      {audioUrl && (
        <ReactPlayer key={audioKey} url={audioUrl} controls playing />
      )}
    </div>
  );
};
