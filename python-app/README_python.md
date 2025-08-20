# Python Movie Recommendation ML

This is the Python/Streamlit implementation of the Movie Recommendation ML model.

## 🚀 Quick Start

```bash
# Install dependencies
pip install -r requirements.txt

# Run the app
streamlit run main.py
```

## 🐍 Python Features

- **Scikit-learn**: Random Forest Classifier
- **Pandas**: Data manipulation and analysis  
- **Streamlit**: Interactive web interface
- **NumPy**: Numerical computing

## 🔧 Virtual Environment Setup

```bash
# Create virtual environment
python -m venv venv

# Activate (Linux/Mac)
source venv/bin/activate

# Activate (Windows)
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run app
streamlit run main.py
```

## 📊 Model Details

- **Algorithm**: Random Forest Classifier
- **Estimators**: 100 trees
- **Random State**: 42 (for reproducibility)
- **Features**: 5 movie characteristics
- **Classes**: Binary (Will Watch / Won't Watch)

## 🛠 Customization

You can easily modify the model by:

1. **Adding more data** in `generate_training_data()`
2. **Changing algorithm** in `MovieRecommendationModel.__init__()`
3. **Adjusting features** in the feature mapping dictionaries
4. **Modifying UI** in the `create_streamlit_app()` function

## 📈 Model Performance

The model achieves high accuracy on the training data and provides probability scores for each prediction, giving you confidence levels in the recommendations.
