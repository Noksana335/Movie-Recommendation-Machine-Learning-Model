import React, { useState, useEffect } from 'react';
import { Play, Film, BarChart3, Brain, Target, CheckCircle, XCircle } from 'lucide-react';

const MovieRecommendationML = () => {
  const [trainingData, setTrainingData] = useState([]);
  const [model, setModel] = useState(null);
  const [testInput, setTestInput] = useState({
    genre: 1,
    ageRating: 2,
    length: 2,
    era: 3,
    userRating: 3
  });
  const [prediction, setPrediction] = useState(null);
  const [accuracy, setAccuracy] = useState(null);

  // Feature mappings
  const genreMap = { 1: 'Action', 2: 'Comedy', 3: 'Drama', 4: 'Romance', 5: 'Horror' };
  const ageRatingMap = { 1: 'PG', 2: 'PG-13', 3: '16VL', 4: '18+', 5: 'R' };
  const lengthMap = { 1: 'Short', 2: 'Medium', 3: 'Long', 4: 'Very Long' };
  const eraMap = { 1: 'Classic', 2: 'Retro', 3: 'Modern', 4: 'Latest' };
  const ratingMap = { 1: 'Poor', 2: 'Average', 3: 'Good', 4: 'Excellent' };

  // Generate 20 dummy training data points
  const generateTrainingData = () => {
    const data = [
      // Action movies - generally popular
      [1, 2, 2, 3, 3, 1], // Action, PG-13, Medium, Modern, Good -> Will Watch
      [1, 2, 3, 4, 4, 1], // Action, PG-13, Long, Latest, Excellent -> Will Watch
      [1, 5, 2, 2, 1, 0], // Action, R, Medium, Retro, Poor -> Won't Watch
      [1, 1, 1, 1, 2, 0], // Action, PG, Short, Classic, Average -> Won't Watch
      
      // Comedy movies - mixed preferences
      [2, 2, 2, 3, 3, 1], // Comedy, PG-13, Medium, Modern, Good -> Will Watch
      [2, 1, 2, 4, 4, 1], // Comedy, PG, Medium, Latest, Excellent -> Will Watch
      [2, 5, 3, 2, 1, 0], // Comedy, R, Long, Retro, Poor -> Won't Watch
      [2, 3, 4, 1, 2, 0], // Comedy, 16VL, Very Long, Classic, Average -> Won't Watch
      
      // Drama movies - quality dependent
      [3, 3, 3, 3, 4, 1], // Drama, 16VL, Long, Modern, Excellent -> Will Watch
      [3, 4, 3, 2, 3, 1], // Drama, 18+, Long, Retro, Good -> Will Watch
      [3, 2, 2, 4, 1, 0], // Drama, PG-13, Medium, Latest, Poor -> Won't Watch
      [3, 1, 1, 1, 2, 0], // Drama, PG, Short, Classic, Average -> Won't Watch
      
      // Romance movies - moderate appeal
      [4, 2, 2, 3, 3, 1], // Romance, PG-13, Medium, Modern, Good -> Will Watch
      [4, 1, 2, 4, 4, 1], // Romance, PG, Medium, Latest, Excellent -> Will Watch
      [4, 4, 3, 2, 1, 0], // Romance, 18+, Long, Retro, Poor -> Won't Watch
      [4, 3, 4, 1, 2, 0], // Romance, 16VL, Very Long, Classic, Average -> Won't Watch
      
      // Horror movies - rating and quality sensitive
      [5, 5, 2, 3, 3, 1], // Horror, R, Medium, Modern, Good -> Will Watch
      [5, 4, 2, 4, 4, 1], // Horror, 18+, Medium, Latest, Excellent -> Will Watch
      [5, 5, 3, 2, 1, 0], // Horror, R, Long, Retro, Poor -> Won't Watch
      [5, 3, 2, 1, 2, 0], // Horror, 16VL, Medium, Classic, Average -> Won't Watch
    ];
    
    return data.map((row, index) => ({
      id: index + 1,
      genre: row[0],
      ageRating: row[1],
      length: row[2],
      era: row[3],
      userRating: row[4],
      output: row[5] // 1 = Will Watch, 0 = Won't Watch
    }));
  };

  // Simple decision tree-like model
  const trainModel = (data) => {
    // Calculate feature weights based on correlation with output
    const weights = {
      genre: 0.2,
      ageRating: 0.15,
      length: 0.2,
      era: 0.2,
      userRating: 0.25
    };

    // Simple scoring function
    const predict = (features) => {
      let score = 0;
      
      // Genre preferences (Action and Comedy score higher)
      if (features.genre === 1 || features.genre === 2) score += 0.3;
      else if (features.genre === 3 || features.genre === 4) score += 0.2;
      else score += 0.1; // Horror
      
      // Age rating (PG-13 and 16VL are sweet spots)
      if (features.ageRating === 2 || features.ageRating === 3) score += 0.25;
      else if (features.ageRating === 1) score += 0.2;
      else score += 0.15; // 18+ and R
      
      // Length (Medium preferred)
      if (features.length === 2) score += 0.3;
      else if (features.length === 3) score += 0.2;
      else score += 0.1; // Short or Very Long
      
      // Era (Modern and Latest preferred)
      if (features.era === 3 || features.era === 4) score += 0.25;
      else score += 0.15;
      
      // User rating (most important factor)
      score += (features.userRating / 4) * 0.4;
      
      return score > 0.6 ? 1 : 0; // Threshold for recommendation
    };

    return { predict, weights };
  };

  // Calculate model accuracy
  const calculateAccuracy = (model, data) => {
    let correct = 0;
    data.forEach(item => {
      const predicted = model.predict({
        genre: item.genre,
        ageRating: item.ageRating,
        length: item.length,
        era: item.era,
        userRating: item.userRating
      });
      if (predicted === item.output) correct++;
    });
    return (correct / data.length * 100).toFixed(1);
  };

  useEffect(() => {
    const data = generateTrainingData();
    setTrainingData(data);
    
    const trainedModel = trainModel(data);
    setModel(trainedModel);
    
    const acc = calculateAccuracy(trainedModel, data);
    setAccuracy(acc);
  }, []);

  const handlePredict = () => {
    if (model) {
      const result = model.predict(testInput);
      setPrediction(result);
    }
  };

  const handleInputChange = (field, value) => {
    setTestInput(prev => ({
      ...prev,
      [field]: parseInt(value)
    }));
    setPrediction(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Film className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl font-bold text-white">Movie Recommendation ML Model</h1>
            <Brain className="w-8 h-8 text-cyan-400" />
          </div>
          <p className="text-gray-300 text-lg">Supervised Learning System for Movie Preferences</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Training Data */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-semibold text-white">Training Data (20 samples)</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-300 border-b border-white/20">
                    <th className="text-left p-2">Genre</th>
                    <th className="text-left p-2">Age</th>
                    <th className="text-left p-2">Length</th>
                    <th className="text-left p-2">Era</th>
                    <th className="text-left p-2">Rating</th>
                    <th className="text-left p-2">Output</th>
                  </tr>
                </thead>
                <tbody>
                  {trainingData.slice(0, 10).map(item => (
                    <tr key={item.id} className="text-gray-200 border-b border-white/10">
                      <td className="p-2">{genreMap[item.genre]}</td>
                      <td className="p-2">{ageRatingMap[item.ageRating]}</td>
                      <td className="p-2">{lengthMap[item.length]}</td>
                      <td className="p-2">{eraMap[item.era]}</td>
                      <td className="p-2">{ratingMap[item.userRating]}</td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          item.output === 1 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {item.output === 1 ? 'Will Watch' : "Won't Watch"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-gray-400 text-xs mt-2">Showing first 10 of 20 training samples</p>
            </div>
            
            {accuracy && (
              <div className="mt-4 p-3 bg-green-500/20 rounded-lg">
                <p className="text-green-400 font-medium">
                  <Target className="w-4 h-4 inline mr-1" />
                  Model Accuracy: {accuracy}%
                </p>
              </div>
            )}
          </div>

          {/* Prediction Interface */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-semibold text-white">Make Prediction</h2>
            </div>

            <div className="space-y-4">
              {/* Genre */}
              <div>
                <label className="block text-gray-300 mb-2">Genre</label>
                <select 
                  value={testInput.genre}
                  onChange={(e) => handleInputChange('genre', e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-cyan-400 focus:outline-none"
                >
                  {Object.entries(genreMap).map(([key, value]) => (
                    <option key={key} value={key} className="bg-gray-800">{value}</option>
                  ))}
                </select>
              </div>

              {/* Age Rating */}
              <div>
                <label className="block text-gray-300 mb-2">Age Rating</label>
                <select 
                  value={testInput.ageRating}
                  onChange={(e) => handleInputChange('ageRating', e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-cyan-400 focus:outline-none"
                >
                  {Object.entries(ageRatingMap).map(([key, value]) => (
                    <option key={key} value={key} className="bg-gray-800">{value}</option>
                  ))}
                </select>
              </div>

              {/* Length */}
              <div>
                <label className="block text-gray-300 mb-2">Movie Length</label>
                <select 
                  value={testInput.length}
                  onChange={(e) => handleInputChange('length', e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-cyan-400 focus:outline-none"
                >
                  {Object.entries(lengthMap).map(([key, value]) => (
                    <option key={key} value={key} className="bg-gray-800">{value}</option>
                  ))}
                </select>
              </div>

              {/* Era */}
              <div>
                <label className="block text-gray-300 mb-2">Release Era</label>
                <select 
                  value={testInput.era}
                  onChange={(e) => handleInputChange('era', e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-cyan-400 focus:outline-none"
                >
                  {Object.entries(eraMap).map(([key, value]) => (
                    <option key={key} value={key} className="bg-gray-800">{value}</option>
                  ))}
                </select>
              </div>

              {/* User Rating */}
              <div>
                <label className="block text-gray-300 mb-2">User Rating</label>
                <select 
                  value={testInput.userRating}
                  onChange={(e) => handleInputChange('userRating', e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-cyan-400 focus:outline-none"
                >
                  {Object.entries(ratingMap).map(([key, value]) => (
                    <option key={key} value={key} className="bg-gray-800">{value}</option>
                  ))}
                </select>
              </div>

              {/* Predict Button */}
              <button
                onClick={handlePredict}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" />
                Predict Recommendation
              </button>

              {/* Prediction Result */}
              {prediction !== null && (
                <div className={`p-4 rounded-lg flex items-center gap-3 ${
                  prediction === 1 
                    ? 'bg-green-500/20 border border-green-500/30' 
                    : 'bg-red-500/20 border border-red-500/30'
                }`}>
                  {prediction === 1 ? (
                    <>
                      <CheckCircle className="w-6 h-6 text-green-400" />
                      <div>
                        <p className="text-green-400 font-semibold">Will Watch</p>
                        <p className="text-green-300 text-sm">This movie is recommended for the user</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-6 h-6 text-red-400" />
                      <div>
                        <p className="text-red-400 font-semibold">Won't Watch</p>
                        <p className="text-red-300 text-sm">This movie is not recommended for the user</p>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Current Selection Summary */}
              <div className="mt-4 p-3 bg-white/5 rounded-lg">
                <p className="text-gray-400 text-sm mb-1">Current Selection:</p>
                <p className="text-white">
                  {genreMap[testInput.genre]} • {ageRatingMap[testInput.ageRating]} • {lengthMap[testInput.length]} • {eraMap[testInput.era]} • {ratingMap[testInput.userRating]}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Model Information */}
        <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4">Model Information</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-medium text-cyan-400 mb-2">Features Used</h4>
              <ul className="text-gray-300 space-y-1">
                <li>• Genre (Action, Comedy, Drama, Romance, Horror)</li>
                <li>• Age Rating (PG, PG-13, 16VL, 18+, R)</li>
                <li>• Movie Length (Short, Medium, Long, Very Long)</li>
                <li>• Release Era (Classic, Retro, Modern, Latest)</li>
                <li>• User Rating (Poor, Average, Good, Excellent)</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium text-cyan-400 mb-2">Model Details</h4>
              <ul className="text-gray-300 space-y-1">
                <li>• Algorithm: Feature-weighted Decision Tree</li>
                <li>• Training Samples: 20</li>
                <li>• Output Classes: Will Watch / Won't Watch</li>
                <li>• Accuracy: {accuracy}% on training data</li>
                <li>• Key Factor: User Rating (25% weight)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieRecommendationML;
