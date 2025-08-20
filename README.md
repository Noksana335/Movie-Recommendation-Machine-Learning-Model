# Movie Recommendation ML Model

An interactive supervised learning model for movie recommendations built with React and Tailwind CSS.

## Features

- **Training Data**: 20 diverse movie samples with genre, age rating, length, era, and user rating
- **Interactive Prediction**: Test different movie combinations to get recommendations
- **Real-time Results**: Instant "Will Watch" or "Won't Watch" predictions
- **Model Insights**: View training accuracy and feature importance

## Movie Features

- **Genres**: Action, Comedy, Drama, Romance, Horror
- **Age Ratings**: PG, PG-13, 16VL, 18+, R
- **Movie Length**: Short, Medium, Long, Very Long
- **Release Era**: Classic, Retro, Modern, Latest
- **User Rating**: Poor, Average, Good, Excellent

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Noksana335/Movie-Recommendation-Machine-Learning-Model.git
cd movie-recommendation-ml
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## How It Works

The model uses a feature-weighted decision system that considers:

- **User Rating** (25% weight) - Most important factor
- **Genre Preferences** (20% weight) - Action/Comedy favored
- **Movie Length** (20% weight) - Medium length preferred  
- **Release Era** (20% weight) - Modern/Latest preferred
- **Age Rating** (15% weight) - PG-13/16VL sweet spot

## Model Performance

- **Algorithm**: Feature-weighted Decision Tree
- **Training Samples**: 20 movies
- **Accuracy**: High accuracy on training data
- **Prediction Classes**: Will Watch / Won't Watch

## Technologies Used

- React 18
- Tailwind CSS
- Lucide React (icons)
- JavaScript ES6+

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Future Enhancements

- Add more sophisticated ML algorithms (SVM, Random Forest)
- Implement cross-validation
- Add more training data
- Include additional movie features
- Export/import training data functionality
