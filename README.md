# Movie Recommendation ML Model

An interactive supervised learning model for movie recommendations available in **two implementations**: React web app and Python/Streamlit app.

## 🎯 Choose Your Version

### 🚀 React Web App (Recommended)
- **Location**: `/react-app/`
- **Tech Stack**: React, Tailwind CSS, JavaScript
- **Features**: Modern UI, instant predictions, responsive design
- **Best for**: Web deployment, modern interface, no Python setup needed

### 🐍 Python/Streamlit App  
- **Location**: `/python-app/`
- **Tech Stack**: Python, Streamlit, Scikit-learn
- **Features**: Traditional ML approach, pandas integration, model metrics
- **Best for**: Data science workflows, Python developers, ML experimentation

## 📊 Model Features

Both versions include the same ML model with:

- **Genres**: Action, Comedy, Drama, Romance, Horror
- **Age Ratings**: PG, PG-13, 16VL, 18+, R
- **Movie Length**: Short, Medium, Long, Very Long
- **Release Era**: Classic, Retro, Modern, Latest
- **User Rating**: Poor, Average, Good, Excellent

## 🚀 Quick Start

### React Version
```bash
cd react-app
npm install
npm start
```
Open [http://localhost:3000](http://localhost:3000)

### Python Version
```bash
cd python-app
pip install -r requirements.txt
streamlit run main.py
```
Open [http://localhost:8501](http://localhost:8501)

## 🔧 Detailed Setup

### React App Setup

#### Prerequisites
- Node.js 14+
- npm or yarn

#### Installation
```bash
git clone https://github.com/YOUR_USERNAME/movie-recommendation-ml.git
cd movie-recommendation-ml/react-app
npm install
npm start
```

### Python App Setup

#### Prerequisites
- Python 3.8+
- pip

#### Installation
```bash
git clone https://github.com/YOUR_USERNAME/movie-recommendation-ml.git
cd movie-recommendation-ml/python-app
pip install -r requirements.txt
streamlit run main.py
```

#### Using Virtual Environment (Recommended)
```bash
cd python-app
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
streamlit run main.py
```

## 🧠 How It Works

Both implementations use the same core logic:

### Model Architecture
- **Algorithm**: Feature-weighted Decision System (React) / Random Forest (Python)
- **Features**: 5 input features (genre, age rating, length, era, user rating)
- **Output**: Binary classification (Will Watch / Won't Watch)
- **Training Data**: 20 carefully crafted movie examples

### Feature Importance
1. **User Rating** (25% weight) - Most critical factor
2. **Genre** (20% weight) - Action/Comedy preferred
3. **Movie Length** (20% weight) - Medium length optimal
4. **Release Era** (20% weight) - Modern/Latest favored
5. **Age Rating** (15% weight) - PG-13/16VL sweet spot

## 📈 Model Performance

- **Training Samples**: 20 movies
- **Accuracy**: ~85-90% on training data
- **Prediction Speed**: Real-time
- **Scalability**: Easy to add more features/data

## 🛠 Technologies Used

### React Version
- React 18
- Tailwind CSS
- Lucide React (icons)
- JavaScript ES6+

### Python Version
- Python 3.8+
- Streamlit
- Scikit-learn
- Pandas
- NumPy

## 📁 Project Structure

```
movie-recommendation-ml/
├── react-app/              # React implementation
│   ├── src/
│   │   ├── App.js          # Main React component
│   │   ├── index.js        # React entry point
│   │   └── index.css       # Styles with Tailwind
│   ├── public/
│   │   └── index.html      # HTML template
│   ├── package.json        # Node dependencies
│   ├── tailwind.config.js  # Tailwind configuration
│   └── postcss.config.js   # PostCSS configuration
├── python-app/             # Python implementation  
│   ├── main.py            # Streamlit app
│   └── requirements.txt   # Python dependencies
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

## 🤝 Contributing

1. Fork the repository
2. Choose your version (`react-app/` or `python-app/`)
3. Create your feature branch (`git checkout -b feature/amazing-feature`)
4. Make your changes
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 🔮 Future Enhancements

### Shared Features
- [ ] More sophisticated ML algorithms
- [ ] Cross-validation implementation
- [ ] Expanded training dataset
- [ ] Additional movie features (director, cast, budget)
- [ ] User preference learning

### React-Specific
- [ ] Data visualization components
- [ ] Export/import functionality
- [ ] Progressive Web App (PWA) features
- [ ] Dark/light theme toggle

### Python-Specific
- [ ] Model comparison dashboard
- [ ] Hyperparameter tuning interface
- [ ] Data upload functionality
- [ ] Advanced metrics and plots

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎬 Demo

Try both versions and see which interface you prefer:

- **React**: Modern, fast, mobile-friendly
- **Python**: Data science focused, traditional ML interface

Both provide the same accurate movie recommendations!
