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

## Deployment

### Frontend Deployment:
The frontend is deployed using **Vercel**. You can visit the live website here:  
[Visit the Neural Network Web Application](https://your-vercel-deployment-url)

### Backend Deployment:
The backend is deployed using **Render**. It is automatically connected to the frontend, and the API can be accessed via the URL provided by Render.

## How to Use

1. Go to the deployed site (Vercel URL).
2. Enter any number between **0 and 255**.
3. See its binary representation.
4. Watch how the neural network processes the input and classifies it as **Odd** or **Even**.
5. You can visualize the training process step-by-step, including forward propagation, backpropagation, and network updates.

## Technologies Used
- **React**: Frontend for interactive user interface.
- **FastAPI**: Backend to serve API requests and run neural network logic.
- **Python**: The core language for building the neural network.
- **Vercel**: Hosting platform for the frontend.
- **Render**: Hosting platform for the backend.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

