import React, { useState } from 'react'
import {
  Box,
  Input,
  Button,
  VStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

const NumberInput = ({ onPredict, isLoading }) => {
  const [number, setNumber] = useState('')
  const [error, setError] = useState('')
  const bgColor = useColorModeValue('white', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    // Validate input
    const num = parseInt(number)
    if (isNaN(num)) {
      setError('Please enter a valid number')
      return
    }

    if (num < 0 || num > 255) {
      setError('Please enter a number between 0 and 255')
      return
    }

    onPredict(num)
  }

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      p={6}
      bg={bgColor}
      borderRadius="lg"
      border="1px solid"
      borderColor={borderColor}
      boxShadow="sm"
    >
      <VStack spacing={4}>
        <Text fontSize="lg" fontWeight="medium">
          Enter a number (0-255):
        </Text>
        <Input
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Enter a number between 0 and 255"
          min={0}
          max={255}
          isDisabled={isLoading}
          size="lg"
          width="200px"
          textAlign="center"
        />
        {error && (
          <Text color="red.500" fontSize="sm">
            {error}
          </Text>
        )}
        <Button
          type="submit"
          colorScheme="blue"
          size="lg"
          isLoading={isLoading}
          loadingText="Processing..."
          width="200px"
        >
          Predict
        </Button>
      </VStack>
    </Box>
  )
}

export default NumberInput 