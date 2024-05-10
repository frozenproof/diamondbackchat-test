import React, { useState } from 'react';
import axios from 'axios';

export const BotPage = () => {

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/predict', { data: "" });
      (response.data.prediction);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter input data"
        />
        <button type="submit">Predict</button>
      </form>
    </div>
  );
};
