from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import sys
import os

# Add the parent directory to Python path to import nn.py
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from nn import (
    sigmoid, sigmoid_derivative, ascii_to_binary,
    forward_propagation, backpropagation,
    hidden_weights, hidden_bias, output_weights, output_bias
)

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class NumberInput(BaseModel):
    number: int

@app.post("/predict")
async def predict(input_data: NumberInput):
    if not 0 <= input_data.number <= 255:
        raise HTTPException(status_code=400, detail="Number must be between 0 and 255")
    
    # Convert number to binary
    binary_input = ascii_to_binary(input_data.number)
    input_array = np.array(binary_input).reshape(1, -1)
    
    # Get network outputs
    hidden_output, final_output = forward_propagation(input_array)
    
    # Calculate intermediate values for visualization
    hidden_wsum = np.dot(input_array, hidden_weights) + hidden_bias
    output_wsum = np.dot(hidden_output, output_weights) + output_bias
    
    return {
        "binary_input": binary_input,
        "hidden_layer_output": hidden_output.tolist(),
        "final_output": float(final_output[0][0]),
        "prediction": "Odd" if final_output[0][0] >= 0.5 else "Even",
        "network_state": {
            "hidden_weights": hidden_weights.tolist(),
            "hidden_bias": hidden_bias.tolist(),
            "output_weights": output_weights.tolist(),
            "output_bias": output_bias.tolist(),
            "hidden_wsum": hidden_wsum.tolist(),
            "output_wsum": output_wsum.tolist()
        }
    }

@app.get("/network-info")
async def get_network_info():
    return {
        "input_size": 8,
        "hidden_size": 16,
        "output_size": 1,
        "weights": {
            "hidden": hidden_weights.tolist(),
            "output": output_weights.tolist()
        },
        "biases": {
            "hidden": hidden_bias.tolist(),
            "output": output_bias.tolist()
        }
    } 