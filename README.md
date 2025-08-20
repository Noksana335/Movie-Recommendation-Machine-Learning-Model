# Movie Recommendation ML Model

An interactive supervised learning model for movie recommendations available in **two versions**:

## 🚀 React Web App (Default)
Modern, interactive web interface built with React and Tailwind CSS.

**To run:**
```bash
npm install
npm start
```
Open [http://localhost:3000](http://localhost:3000)

## 🐍 Python/Streamlit Version  
Traditional ML approach using Scikit-learn and Streamlit.

**To run:**
```bash
pip install -r requirements.txt
streamlit run app.py
```
Open [http://localhost:8501](http://localhost:8501)

## 📊 Features

Both versions include the same ML model with:
- **Genres**: Action, Comedy, Drama, Romance, Horror
- **Age Ratings**: PG, PG-13, 16VL, 18+, R  
- **Movie Length**: Short, Medium, Long, Very Long
- **Release Era**: Classic, Retro, Modern, Latest
- **User Rating**: Poor, Average, Good, Excellent

## 🧠 How It Works

The model analyzes movie features to predict whether a user will watch a movie:
- **React Version**: Custom weighted decision algorithm
- **Python Version**: Random Forest Classifier from Scikit-learn
- **Training Data**: 20 carefully crafted movie examples
- **Accuracy**: ~85-90% on training data

## 🛠 Technologies

### React Version
- React 18, Tailwind CSS, Lucide Icons
- Pure JavaScript implementation

### Python Version  
- Python, Streamlit, Scikit-learn, Pandas
- Traditional ML pipeline

## 📁 Files

```
├── src/                    # React app source
├── public/                 # React public files  
├── package.json           # Node.js dependencies
├── app.py                 # Python/Streamlit version
├── requirements.txt       # Python dependencies
├── tailwind.config.js     # Tailwind configuration
└── README.md              # This file
```

## 🎯 Try Both!

- Want modern UI? → Use React version (`npm start`)
- Prefer Python/ML tools? → Use Python version (`streamlit run app.py`)

Both provide the same accurate movie recommendations with different interfaces!
