# Neural Network from Scratch

This project demonstrates how a neural network can be built from scratch to classify numbers as **odd** or **even** based on their binary representation. The project is divided into two parts:
1. **Frontend** - Built using **React** to visualize the neural network training process.
2. **Backend** - Built using **FastAPI** to handle API requests and run the neural network logic.

## Project Description

This project allows users to:
- Input any number (from 0 to 255).
- See its binary representation.
- Visualize how the neural network classifies the number as **odd** or **even**.
- See how the neural network is trained interactively step-by-step.

### Why Train a Neural Network for Odd/Even Classification?

While one might think dividing by 2 is a simple way to determine if a number is odd or even, neural networks can be a powerful tool for learning complex patterns. In this project, we show how a neural network learns to classify numbers based on their binary inputs.

- We train the network using numbers **1-100**.
- The network predicts numbers up to **255** as it can process 8-bit binary numbers.
- This project helps understand how neural networks work from scratch, offering interactive steps to visualize forward propagation, backpropagation, and more.

## Deployment

### Frontend Deployment:
The frontend is deployed using **Vercel**. You can visit the live website here:  
[Visit the Neural Network Web Application](https://neural-network-from-scratch.vercel.app/)

### Backend Deployment:
The backend is deployed using **Render**. It is automatically connected to the frontend, and the API can be accessed via the URL provided by Render.

## Installation and Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/AtharvaChaudhari07/Neural_Network_from_scratch.git
    cd Neural_Network_from_scratch
    ```

2. **Backend Setup**:
    - Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
    - Install the dependencies:
    ```bash
    pip install -r requirements.txt
    ```
    - Run the FastAPI backend:
    ```bash
    uvicorn main:app --host 0.0.0.0 --port 10000
    ```

3. **Frontend Setup**:
    - Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
    - Install the dependencies:
    ```bash
    npm install
    ```
    - Run the React app locally:
    ```bash
    npm run dev
    ```



