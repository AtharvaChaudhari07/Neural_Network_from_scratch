import React from 'react'
import {
  Box,
  VStack,
  Heading,
  Text,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
  SimpleGrid,
  Icon,
} from '@chakra-ui/react'
import { MdCheckCircle } from 'react-icons/md'
import { FaBrain, FaCode, FaChartLine, FaLightbulb } from 'react-icons/fa'

const ProjectDescription = () => {
  const textColor = useColorModeValue('gray.600', 'gray.400')
  const headingColor = useColorModeValue('blue.600', 'blue.400')
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  const sections = [
    {
      icon: FaBrain,
      title: "🧠 Why Train a Neural Network to Predict Odd or Even?",
      content: (
        <>
          <Text fontSize="lg" color={textColor} mb={4}>
            You might wonder — <em>"Why use a neural network to classify odd or even numbers when we can just divide by 2?"</em>
          </Text>
          <Text fontSize="lg" color={textColor}>
            That's a valid question! This project isn't about finding the easiest solution — it's about understanding <strong>how a neural network learns</strong> from data to make decisions, even for a problem we already know how to solve.
          </Text>
        </>
      )
    },
    {
      icon: FaCode,
      title: "🔍 What's Happening Under the Hood?",
      content: (
        <>
          <Text fontSize="lg" color={textColor} mb={4}>
            We train a <strong>neural network from scratch</strong> (without using any deep learning library) to recognize patterns in the <strong>binary representation</strong> of numbers. Here's how it works:
          </Text>
          <List spacing={3}>
            <ListItem display="flex" alignItems="center">
              <ListIcon as={MdCheckCircle} color="green.500" />
              <Text fontSize="lg" color={textColor}>
                Every number is converted into its <strong>8-bit binary form</strong> (e.g., 5 → <code>00000101</code>)
              </Text>
            </ListItem>
            <ListItem display="flex" alignItems="center">
              <ListIcon as={MdCheckCircle} color="green.500" />
              <Text fontSize="lg" color={textColor}>
                These 8 binary digits are fed into a neural network
              </Text>
            </ListItem>
            <ListItem display="flex" alignItems="center">
              <ListIcon as={MdCheckCircle} color="green.500" />
              <Text fontSize="lg" color={textColor}>
                The network learns through <strong>multiple training epochs</strong> using forward propagation, backpropagation, and gradient descent
              </Text>
            </ListItem>
            <ListItem display="flex" alignItems="center">
              <ListIcon as={MdCheckCircle} color="green.500" />
              <Text fontSize="lg" color={textColor}>
                Over time, the model adjusts its <strong>weights and biases</strong> to correctly classify a number as <em>odd</em> or <em>even</em>
              </Text>
            </ListItem>
          </List>
        </>
      )
    },
    {
      icon: FaChartLine,
      title: "🧪 Training and Generalization",
      content: (
        <>
          <List spacing={3} mb={4}>
            <ListItem display="flex" alignItems="center">
              <ListIcon as={MdCheckCircle} color="green.500" />
              <Text fontSize="lg" color={textColor}>
                We <strong>train the model using numbers from 0 to 99</strong>
              </Text>
            </ListItem>
            <ListItem display="flex" alignItems="center">
              <ListIcon as={MdCheckCircle} color="green.500" />
              <Text fontSize="lg" color={textColor}>
                Once trained, the network can generalize and <strong>predict for numbers up to 255</strong>
              </Text>
            </ListItem>
            <ListItem display="flex" alignItems="center">
              <ListIcon as={MdCheckCircle} color="green.500" />
              <Text fontSize="lg" color={textColor}>
                Why 255? Because 8 binary digits (<code>11111111</code>) can represent any number from 0 to 255
              </Text>
            </ListItem>
          </List>
          <Text fontSize="lg" color={textColor}>
            This shows how a neural network learns to <strong>extract patterns</strong> from data — not just memorize values — and make predictions on unseen inputs.
          </Text>
        </>
      )
    },
    {
      icon: FaLightbulb,
      title: "🎯 The Goal of This Project",
      content: (
        <>
          <Text fontSize="lg" color={textColor} mb={4}>
            This project is designed to help you:
          </Text>
          <List spacing={3}>
            <ListItem display="flex" alignItems="center">
              <ListIcon as={MdCheckCircle} color="green.500" />
              <Text fontSize="lg" color={textColor}>
                Understand how neural networks work internally
              </Text>
            </ListItem>
            <ListItem display="flex" alignItems="center">
              <ListIcon as={MdCheckCircle} color="green.500" />
              <Text fontSize="lg" color={textColor}>
                Visualize how data flows through each layer
              </Text>
            </ListItem>
            <ListItem display="flex" alignItems="center">
              <ListIcon as={MdCheckCircle} color="green.500" />
              <Text fontSize="lg" color={textColor}>
                See how training improves performance
              </Text>
            </ListItem>
            <ListItem display="flex" alignItems="center">
              <ListIcon as={MdCheckCircle} color="green.500" />
              <Text fontSize="lg" color={textColor}>
                Explore how a model can learn a rule <em>without being explicitly programmed</em>
              </Text>
            </ListItem>
          </List>
        </>
      )
    }
  ]

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
      {sections.map((section, index) => (
        <Box
          key={index}
          bg={cardBg}
          p={6}
          borderRadius="xl"
          boxShadow="xl"
          border="1px solid"
          borderColor={borderColor}
          transform="translateY(0)"
          transition="all 0.3s"
          _hover={{
            transform: "translateY(-5px)",
            boxShadow: "2xl"
          }}
        >
          <VStack align="start" spacing={4}>
            <Box display="flex" alignItems="center" mb={2}>
              <Icon as={section.icon} w={6} h={6} color="blue.500" mr={2} />
              <Heading as="h2" size="xl" color={headingColor}>
                {section.title}
              </Heading>
            </Box>
            {section.content}
          </VStack>
        </Box>
      ))}
    </SimpleGrid>
  )
}

export default ProjectDescription 