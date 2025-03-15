# Neural_Network_from_scratch
Implementation of neural network with forward and backpropagation to classify the digit as odd or even. Neural network takes input as binary format

```python
import numpy as np

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def sigmoid_derivative(x):
    return x * (1 - x)

def ascii_to_binary(num):
    binary = bin(num)[2:].zfill(8)
    return [int(digit) for digit in binary]

input_size = 8
hidden_size = 16
output_size = 1

hidden_weights = np.random.rand(input_size, hidden_size)
hidden_bias = np.zeros((1, hidden_size))
output_weights = np.random.randn(hidden_size, output_size)
output_bias = np.zeros((1, output_size))

def forward_propagation(input_number):
    hidden_wsum = np.dot(input_number, hidden_weights) + hidden_bias
    hidden_output = sigmoid(hidden_wsum)

    output_wsum = np.dot(hidden_output, output_weights) + output_bias
    final_output = sigmoid(output_wsum)

    return hidden_output, final_output

def backpropagation(input_number, hidden_output, final_output, target):
    global hidden_weights, hidden_bias, output_weights, output_bias

    error_out = target - final_output
    delta_out = error_out * sigmoid_derivative(final_output)

    error_hidden = np.dot(delta_out, output_weights.T)
    delta_hidden = error_hidden * sigmoid_derivative(hidden_output)

    output_weights += np.dot(hidden_output.T, delta_out)*learning_rate
    hidden_weights += np.dot(input_number.T, delta_hidden)*learning_rate

    output_bias += np.sum(delta_out, axis=0, keepdims=True)
    hidden_bias += np.sum(delta_hidden, axis=0, keepdims=True)

X_train = np.array([ascii_to_binary(decnum) for decnum in range(100)])
y_train = np.array([i % 2 for i in range(100)]).reshape(-1, 1)

epochs = 300
learning_rate=0.1
for epoch in range(epochs):
    for i in range(len(y_train)):
        input_number = np.array(X_train[i]).reshape(1, -1)
        target = np.array(y_train[i])

        hidden_output, final_output = forward_propagation(input_number)
        backpropagation(input_number, hidden_output, final_output, target)

# X_test = np.array((ascii_to_binary(12),ascii_to_binary(5)))
X_test=[]
print("you may enter numbers from 0 - 255 as the input is binary till 8 spaces (binary[11111111] = 255)")
count=int(input("how many nos to test : "))
for i in range(count):
    dec=int(input("Enter number (press enter) : "))
    X_test.append(ascii_to_binary(dec))
X_test=np.array(X_test)

for i in range(len(X_test)):
    input_number = X_test[i].reshape(1, -1)
    _, predicted_output = forward_propagation(input_number)
    result = "Odd" if predicted_output >= 0.5 else "Even"
    print(f"Binary Number: {X_test[i]}, Predicted Label: {result}")


