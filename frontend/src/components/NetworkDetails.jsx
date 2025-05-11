import React, { useState, useEffect } from 'react'
import {
  Box,
  Text,
  VStack,
  Card,
  CardBody,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

const NetworkDetails = ({ networkState, prediction, currentStep }) => {
  const bgColor = useColorModeValue('white', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const [stepHistory, setStepHistory] = useState([])

  useEffect(() => {
    if (prediction && networkState) {
      const newStep = {
        step: currentStep,
        timestamp: new Date().toLocaleTimeString(),
        data: renderStepDetails(currentStep)
      }
      setStepHistory(prev => [...prev, newStep])
    }
  }, [currentStep, prediction, networkState])

  const renderStepDetails = (step) => {
    switch (step) {
      case 0: // Input Processing
        return (
          <VStack align="start" spacing={4}>
            <Text>Input number: {prediction?.input_number}</Text>
            <Text>Binary representation: {prediction?.binary_input?.join('')}</Text>
            <Text fontSize="sm" color="gray.500">
              The input number is converted to 8-bit binary representation, where each bit represents a power of 2.
            </Text>
          </VStack>
        )

      case 1: // Input Layer
        return (
          <VStack align="start" spacing={4}>
            <Text>Input Layer Neurons:</Text>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Bit Position</Th>
                  <Th>Value</Th>
                </Tr>
              </Thead>
              <Tbody>
                {prediction?.binary_input?.map((bit, index) => (
                  <Tr key={index}>
                    <Td>2^{7-index}</Td>
                    <Td>{bit}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </VStack>
        )

      case 2: // Weight Multiplication
        return (
          <VStack align="start" spacing={4}>
            <Text>Weight Multiplication:</Text>
            <Text fontSize="sm">
              Each input is multiplied by its corresponding weight in the hidden layer.
              The weights are initialized randomly and updated during training.
            </Text>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Input</Th>
                  <Th>Weight</Th>
                  <Th>Result</Th>
                </Tr>
              </Thead>
              <Tbody>
                {prediction?.binary_input?.map((input, index) => (
                  <Tr key={index}>
                    <Td>{input}</Td>
                    <Td>{networkState?.hidden_weights[index][0]?.toFixed(4)}</Td>
                    <Td>{(input * networkState?.hidden_weights[index][0])?.toFixed(4)}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </VStack>
        )

      case 3: // Hidden Layer Activation
        return (
          <VStack align="start" spacing={4}>
            <Text>Hidden Layer Activation (Sigmoid):</Text>
            <Text fontSize="sm">
              The sigmoid function: f(x) = 1 / (1 + e^(-x))
              This function squashes the output between 0 and 1.
            </Text>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Weighted Sum</Th>
                  <Th>Activation</Th>
                </Tr>
              </Thead>
              <Tbody>
                {networkState?.hidden_wsum?.[0]?.map((sum, index) => (
                  <Tr key={index}>
                    <Td>{sum.toFixed(4)}</Td>
                    <Td>{(1 / (1 + Math.exp(-sum))).toFixed(4)}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </VStack>
        )

      case 4: // Output Layer Processing
        return (
          <VStack align="start" spacing={4}>
            <Text>Output Layer Processing:</Text>
            <Text fontSize="sm">
              The hidden layer outputs are multiplied by the output layer weights
              and passed through the sigmoid function.
            </Text>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Hidden Output</Th>
                  <Th>Output Weight</Th>
                  <Th>Weighted Sum</Th>
                </Tr>
              </Thead>
              <Tbody>
                {networkState?.output_weights?.map((weight, index) => (
                  <Tr key={index}>
                    <Td>{prediction?.hidden_layer_output[0][index]?.toFixed(4)}</Td>
                    <Td>{weight[0]?.toFixed(4)}</Td>
                    <Td>{(prediction?.hidden_layer_output[0][index] * weight[0])?.toFixed(4)}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </VStack>
        )

      case 5: // Final Prediction
        return (
          <VStack align="start" spacing={4}>
            <Text>Final Output:</Text>
            <Text fontSize="sm">
              The final output is the result of applying the sigmoid function
              to the weighted sum of the output layer.
            </Text>
            <Box>
              <Text>Output Value: {prediction?.final_output?.toFixed(4)}</Text>
              <Text>Prediction: {prediction?.prediction}</Text>
              <Text>Confidence: {(prediction?.final_output * 100)?.toFixed(2)}%</Text>
            </Box>
          </VStack>
        )

      default:
        return null
    }
  }

  const getStepTitle = (step) => {
    const titles = [
      "Input Processing",
      "Input Layer",
      "Weight Multiplication",
      "Hidden Layer Activation",
      "Output Layer Processing",
      "Final Prediction"
    ]
    return titles[step] || "Unknown Step"
  }

  return (
    <Card>
      <CardBody>
        <VStack spacing={4} align="stretch">
          <Heading size="md">Network Details</Heading>
          <Accordion allowMultiple defaultIndex={[currentStep]}>
            {stepHistory.map((step, index) => (
              <AccordionItem key={index}>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Text fontWeight="bold">
                        {getStepTitle(step.step)} ({step.timestamp})
                      </Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <MotionBox
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {step.data}
                  </MotionBox>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </VStack>
      </CardBody>
    </Card>
  )
}

export default NetworkDetails 