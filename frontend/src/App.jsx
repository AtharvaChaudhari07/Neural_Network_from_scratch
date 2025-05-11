import React, { useState, useEffect } from 'react'
import {
  ChakraProvider,
  Box,
  VStack,
  Heading,
  Text,
  Container,
  useColorModeValue,
  useToast,
  Flex,
  Icon,
} from '@chakra-ui/react'
import { FaBrain } from 'react-icons/fa'
import NumberInput from './components/NumberInput'
import NetworkVisualization from './components/NetworkVisualization'
import StepVisualization from './components/StepVisualization'
import NetworkDetails from './components/NetworkDetails'
import ProjectDescription from './components/ProjectDescription'

// API endpoint configuration
const API_BASE_URL = 'https://neural-network-from-scratch.onrender.com'

function App() {
  const [prediction, setPrediction] = useState(null)
  const [networkState, setNetworkState] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const textColor = useColorModeValue('gray.600', 'gray.400')
  const cardBg = useColorModeValue('white', 'gray.800')
  const toast = useToast()

  const handlePrediction = async (number) => {
    setIsLoading(true)
    try {
      console.log('Sending request to backend...')
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ number }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Received response:', data)
      
      if (!data || !data.network_state) {
        throw new Error('Invalid response format from server')
      }

      setPrediction(data)
      setNetworkState(data.network_state)
      setCurrentStep(0)
    } catch (error) {
      console.error('Error details:', error)
      toast({
        title: 'Error',
        description: `Failed to get prediction: ${error.message}. Please check if the backend server is running at ${API_BASE_URL}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle step progression
  useEffect(() => {
    let timer
    if (prediction && currentStep < 6) {
      timer = setInterval(() => {
        setCurrentStep((prev) => prev + 1)
      }, 2000)
    }
    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [prediction, currentStep])

  return (
    <ChakraProvider>
      <Box 
        minH="100vh" 
        bg={bgColor} 
        py={10}
        bgGradient="linear(to-b, blue.50, gray.50)"
        _dark={{
          bgGradient: "linear(to-b, gray.900, blue.900)"
        }}
      >
        <Container maxW="container.xl">
          <VStack spacing={8} align="stretch">
            <Box 
              textAlign="center" 
              py={8}
              bg={cardBg}
              borderRadius="xl"
              boxShadow="xl"
              px={6}
              transform="translateY(0)"
              transition="all 0.3s"
              _hover={{
                transform: "translateY(-5px)",
                boxShadow: "2xl"
              }}
            >
              <Flex justify="center" mb={4}>
                <Icon as={FaBrain} w={12} h={12} color="blue.500" />
              </Flex>
              <Heading 
                as="h1" 
                size="2xl" 
                mb={4}
                bgGradient="linear(to-r, blue.400, purple.500)"
                bgClip="text"
                fontWeight="extrabold"
              >
                Neural Network Visualization
              </Heading>
              <Text color={textColor} fontSize="xl">
                Enter a number to see how the neural network processes it
              </Text>
            </Box>

            <ProjectDescription />

            <Box
              bg={cardBg}
              borderRadius="xl"
              boxShadow="xl"
              p={6}
              transform="translateY(0)"
              transition="all 0.3s"
              _hover={{
                transform: "translateY(-5px)",
                boxShadow: "2xl"
              }}
            >
              <NumberInput onPredict={handlePrediction} isLoading={isLoading} />
            </Box>

            {prediction && (
              <VStack spacing={8}>
                <Box
                  bg={cardBg}
                  borderRadius="xl"
                  boxShadow="xl"
                  p={6}
                  w="100%"
                  transform="translateY(0)"
                  transition="all 0.3s"
                  _hover={{
                    transform: "translateY(-5px)",
                    boxShadow: "2xl"
                  }}
                >
                  <NetworkVisualization
                    prediction={prediction}
                    networkState={networkState}
                    currentStep={currentStep}
                  />
                </Box>
                <Box
                  bg={cardBg}
                  borderRadius="xl"
                  boxShadow="xl"
                  p={6}
                  w="100%"
                  transform="translateY(0)"
                  transition="all 0.3s"
                  _hover={{
                    transform: "translateY(-5px)",
                    boxShadow: "2xl"
                  }}
                >
                  <StepVisualization
                    prediction={prediction}
                    currentStep={currentStep}
                  />
                </Box>
                <Box
                  bg={cardBg}
                  borderRadius="xl"
                  boxShadow="xl"
                  p={6}
                  w="100%"
                  transform="translateY(0)"
                  transition="all 0.3s"
                  _hover={{
                    transform: "translateY(-5px)",
                    boxShadow: "2xl"
                  }}
                >
                  <NetworkDetails
                    prediction={prediction}
                    networkState={networkState}
                    currentStep={currentStep}
                  />
                </Box>
              </VStack>
            )}
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  )
}

export default App 