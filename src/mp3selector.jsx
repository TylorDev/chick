import { useState, useEffect } from "react";

const Mp3Selector = () => {
  const [files, setFiles] = useState([]);
  const [totalDuration, setTotalDuration] = useState(0);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };

  const calculateTotalDuration = () => {
    let total = 0;
    let processed = 0;

    files.forEach((file) => {
      const audio = new Audio(URL.createObjectURL(file));
      audio.onloadedmetadata = () => {
        total += audio.duration;
        processed += 1;
        if (processed === files.length) {
          setTotalDuration(total);
        }
      };
    });
  };

  function convertSeconds(seconds) {
    const totalSeconds = Math.round(seconds); // Redondear segundos
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = totalSeconds % 60;

    // Formatear como hh:mm:ss con ceros a la izquierda si es necesario
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  return (
    <div>
      <input
        type="file"
        accept="audio/mp3"
        multiple
        onChange={handleFileChange}
      />
      <button onClick={calculateTotalDuration}>Calcular Duración Total</button>
      <h3>Duración Total: {convertSeconds(totalDuration)} </h3>
      <ul>
        {files.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Mp3Selector;
