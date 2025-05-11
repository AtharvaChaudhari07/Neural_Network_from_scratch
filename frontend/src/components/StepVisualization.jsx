import React, { useState, useEffect } from 'react'
import {
  Box,
  Text,
  VStack,
  HStack,
  Progress,
  Card,
  CardBody,
  Heading,
  Spinner,
  useColorModeValue,
} from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

const MotionBox = motion(Box)

const Step = ({ title, description, isActive, isComplete }) => {
  const bgColor = useColorModeValue('white', 'gray.700')
  const activeColor = useColorModeValue('blue.50', 'blue.900')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  return (
    <MotionBox
      p={4}
      borderRadius="md"
      bg={isActive ? activeColor : bgColor}
      border="1px solid"
      borderColor={borderColor}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <VStack align="start" spacing={2}>
        <HStack spacing={3}>
          <Text fontWeight="bold" color={isComplete ? 'green.500' : isActive ? 'blue.500' : 'gray.500'}>
            {title}
          </Text>
          {isActive && (
            <Spinner
              size="sm"
              color="blue.500"
              thickness="2px"
              speed="0.65s"
            />
          )}
          {isComplete && (
            <Text color="green.500">✓</Text>
          )}
        </HStack>
        <Text fontSize="sm" color="gray.600">
          {description}
        </Text>
      </VStack>
    </MotionBox>
  )
}

const StepVisualization = ({ prediction, currentStep }) => {
  const steps = [
    {
      title: "Input Processing",
      description: "Converting decimal number to 8-bit binary representation",
      isActive: currentStep === 0,
      isComplete: currentStep > 0,
    },
    {
      title: "Input Layer",
      description: "Binary digits are fed into the input layer neurons",
      isActive: currentStep === 1,
      isComplete: currentStep > 1,
    },
    {
      title: "Weight Multiplication",
      description: "Input values are multiplied by their corresponding weights",
      isActive: currentStep === 2,
      isComplete: currentStep > 2,
    },
    {
      title: "Hidden Layer Activation",
      description: "Sigmoid activation function is applied to the weighted sum",
      isActive: currentStep === 3,
      isComplete: currentStep > 3,
    },
    {
      title: "Output Layer Processing",
      description: "Hidden layer outputs are processed through the output layer",
      isActive: currentStep === 4,
      isComplete: currentStep > 4,
    },
    {
      title: "Final Prediction",
      description: "Network outputs the probability of the number being odd or even",
      isActive: currentStep === 5,
      isComplete: currentStep > 5,
    }
  ]

  return (
    <Card>
      <CardBody>
        <VStack spacing={6}>
          <Heading size="md">Neural Network Process</Heading>
          <Progress
            value={(currentStep / steps.length) * 100}
            size="sm"
            colorScheme="blue"
            w="100%"
          />
          <VStack spacing={4} w="100%">
            <AnimatePresence>
              {steps.map((step, index) => (
                <Step
                  key={index}
                  {...step}
                />
              ))}
            </AnimatePresence>
          </VStack>
          {currentStep === steps.length && prediction && (
            <Box textAlign="center" mt={4}>
              <Text fontSize="lg">
                Final Prediction: <strong>{prediction.prediction}</strong>
              </Text>
              <Text fontSize="sm" color="gray.500">
                Confidence: {(prediction.final_output * 100).toFixed(2)}%
              </Text>
            </Box>
          )}
        </VStack>
      </CardBody>
    </Card>
  )
}

export default StepVisualization 