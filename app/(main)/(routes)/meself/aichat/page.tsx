import React, { useState } from 'react';
import axios from 'axios';

export const BotPage = () => {
  const [inputData, setInputData] = useState('');
  const [prediction, setPrediction] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/predict', { data: inputData });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          placeholder="Enter input data"
        />
        <button type="submit">Predict</button>
      </form>
      {prediction && <div>Prediction: {prediction}</div>}
    </div>
  );
};
