#!/usr/bin/env python3
"""
Movie Recommendation ML Model
Supervised learning system for movie preferences
"""

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import streamlit as st

class MovieRecommendationModel:
    def __init__(self):
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.is_trained = False
        
        # Feature mappings
        self.genre_map = {1: 'Action', 2: 'Comedy', 3: 'Drama', 4: 'Romance', 5: 'Horror'}
        self.age_rating_map = {1: 'PG', 2: 'PG-13', 3: '16VL', 4: '18+', 5: 'R'}
        self.length_map = {1: 'Short', 2: 'Medium', 3: 'Long', 4: 'Very Long'}
        self.era_map = {1: 'Classic', 2: 'Retro', 3: 'Modern', 4: 'Latest'}
        self.rating_map = {1: 'Poor', 2: 'Average', 3: 'Good', 4: 'Excellent'}
        
    def generate_training_data(self):
        """Generate 20 dummy training data points"""
        data = [
            # Action movies - generally popular
            [1, 2, 2, 3, 3, 1], [1, 2, 3, 4, 4, 1], [1, 5, 2, 2, 1, 0], [1, 1, 1, 1, 2, 0],
            # Comedy movies - mixed preferences  
            [2, 2, 2, 3, 3, 1], [2, 1, 2, 4, 4, 1], [2, 5, 3, 2, 1, 0], [2, 3, 4, 1, 2, 0],
            # Drama movies - quality dependent
            [3, 3, 3, 3, 4, 1], [3, 4, 3, 2, 3, 1], [3, 2, 2, 4, 1, 0], [3, 1, 1, 1, 2, 0],
            # Romance movies - moderate appeal
            [4, 2, 2, 3, 3, 1], [4, 1, 2, 4, 4, 1], [4, 4, 3, 2, 1, 0], [4, 3, 4, 1, 2, 0],
            # Horror movies - rating sensitive
            [5, 5, 2, 3, 3, 1], [5, 4, 2, 4, 4, 1], [5, 5, 3, 2, 1, 0], [5, 3, 2, 1, 2, 0],
        ]
        
        columns = ['genre', 'age_rating', 'length', 'era', 'user_rating', 'will_watch']
        return pd.DataFrame(data, columns=columns)
    
    def train_model(self):
        """Train the recommendation model"""
        df = self.generate_training_data()
        
        X = df[['genre', 'age_rating', 'length', 'era', 'user_rating']]
        y = df['will_watch']
        
        self.model.fit(X, y)
        self.is_trained = True
        
        # Calculate accuracy
        predictions = self.model.predict(X)
        accuracy = accuracy_score(y, predictions)
        
        return df, accuracy
    
    def predict(self, genre, age_rating, length, era, user_rating):
        """Make prediction for given movie features"""
        if not self.is_trained:
            raise ValueError("Model must be trained first!")
            
        features = np.array([[genre, age_rating, length, era, user_rating]])
        prediction = self.model.predict(features)[0]
        probability = self.model.predict_proba(features)[0]
        
        return prediction, probability

def create_streamlit_app():
    """Create Streamlit web interface"""
    st.set_page_config(
        page_title="Movie Recommendation ML",
        page_icon="🎬",
        layout="wide"
    )
    
    st.title("🎬 Movie Recommendation ML Model")
    st.subheader("Supervised Learning System for Movie Preferences")
    
    # Initialize model
    if 'model' not in st.session_state:
        st.session_state.model = MovieRecommendationModel()
        st.session_state.df, st.session_state.accuracy = st.session_state.model.train_model()
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.header("📊 Training Data")
        
        # Display training data
        display_df = st.session_state.df.copy()
        display_df['genre'] = display_df['genre'].map(st.session_state.model.genre_map)
        display_df['age_rating'] = display_df['age_rating'].map(st.session_state.model.age_rating_map)
        display_df['length'] = display_df['length'].map(st.session_state.model.length_map)
        display_df['era'] = display_df['era'].map(st.session_state.model.era_map)
        display_df['user_rating'] = display_df['user_rating'].map(st.session_state.model.rating_map)
        display_df['will_watch'] = display_df['will_watch'].map({1: 'Will Watch', 0: "Won't Watch"})
        
        st.dataframe(display_df, use_container_width=True)
        
        st.success(f"🎯 Model Accuracy: {st.session_state.accuracy:.1%}")
    
    with col2:
        st.header("🧠 Make Prediction")
        
        # Input features
        genre = st.selectbox("Genre", options=list(st.session_state.model.genre_map.keys()), 
                           format_func=lambda x: st.session_state.model.genre_map[x])
        
        age_rating = st.selectbox("Age Rating", options=list(st.session_state.model.age_rating_map.keys()),
                                format_func=lambda x: st.session_state.model.age_rating_map[x])
        
        length = st.selectbox("Movie Length", options=list(st.session_state.model.length_map.keys()),
                            format_func=lambda x: st.session_state.model.length_map[x])
        
        era = st.selectbox("Release Era", options=list(st.session_state.model.era_map.keys()),
                         format_func=lambda x: st.session_state.model.era_map[x])
        
        user_rating = st.selectbox("User Rating", options=list(st.session_state.model.rating_map.keys()),
                                 format_func=lambda x: st.session_state.model.rating_map[x])
        
        if st.button("🚀 Predict Recommendation", type="primary"):
            try:
                prediction, probability = st.session_state.model.predict(
                    genre, age_rating, length, era, user_rating
                )
                
                if prediction == 1:
                    st.success("✅ **Will Watch** - This movie is recommended!")
                    st.write(f"Confidence: {probability[1]:.1%}")
                else:
                    st.error("❌ **Won't Watch** - This movie is not recommended")
                    st.write(f"Confidence: {probability[0]:.1%}")
                    
            except Exception as e:
                st.error(f"Error making prediction: {e}")
        
        # Current selection
        st.info(f"""
        **Current Selection:**
        - Genre: {st.session_state.model.genre_map[genre]}
        - Age Rating: {st.session_state.model.age_rating_map[age_rating]}
        - Length: {st.session_state.model.length_map[length]}
        - Era: {st.session_state.model.era_map[era]}
        - User Rating: {st.session_state.model.rating_map[user_rating]}
        """)

def main():
    """Main function"""
    create_streamlit_app()

if __name__ == "__main__":
    main()
