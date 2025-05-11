import React from 'react'
import { Box, Card, CardBody, Text, VStack, HStack, useColorModeValue } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

const Neuron = ({ value, isActive, color }) => {
  const bgColor = useColorModeValue('white', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  return (
    <MotionBox
      w="40px"
      h="40px"
      borderRadius="full"
      bg={isActive ? color : bgColor}
      border="2px solid"
      borderColor={borderColor}
      display="flex"
      alignItems="center"
      justifyContent="center"
      initial={{ scale: 0.8 }}
      animate={{ scale: isActive ? 1 : 0.8 }}
      transition={{ duration: 0.3 }}
    >
      <Text fontSize="xs" color={isActive ? 'white' : 'gray.500'}>
        {value !== undefined ? value.toFixed(2) : ''}
      </Text>
    </MotionBox>
  )
}

const Layer = ({ neurons, title, color }) => {
  return (
    <VStack spacing={2}>
      <Text fontSize="sm" fontWeight="medium">
        {title}
      </Text>
      <VStack spacing={2}>
        {neurons.map((value, index) => (
          <Neuron
            key={index}
            value={value}
            isActive={value !== undefined}
            color={color}
          />
        ))}
      </VStack>
    </VStack>
  )
}

const NetworkVisualization = ({ networkState, prediction }) => {
  if (!networkState) return null

  const inputNeurons = prediction?.binary_input || Array(8).fill(undefined)
  const hiddenNeurons = prediction?.hidden_layer_output?.[0] || Array(16).fill(undefined)
  const outputNeuron = prediction?.final_output !== undefined ? [prediction.final_output] : [undefined]

  return (
    <Card>
      <CardBody>
        <VStack spacing={6}>
          <Text fontSize="xl" fontWeight="bold">
            Neural Network Visualization
          </Text>
          <HStack spacing={8} justify="center">
            <Layer
              neurons={inputNeurons}
              title="Input Layer"
              color="blue.400"
            />
            <Layer
              neurons={hiddenNeurons}
              title="Hidden Layer"
              color="green.400"
            />
            <Layer
              neurons={outputNeuron}
              title="Output Layer"
              color="purple.400"
            />
          </HStack>
          {prediction && (
            <Box textAlign="center" mt={4}>
              <Text fontSize="lg">
                Prediction: <strong>{prediction.prediction}</strong>
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

export default NetworkVisualization 