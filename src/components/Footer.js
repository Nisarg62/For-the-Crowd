import React from 'react'
import { Link, Heading, Text } from '@chakra-ui/react'
import { AiFillGithub, AiFillPhone } from 'react-icons/ai'

function Footer({ setPageState }) {
  return (
    <div className='footer-container' >
        <Heading fontSize='4xl' color='black' style={{ textAlign: 'center' }} >For The Crowd</Heading>
        <div className='links' >
            <Link href='https://github.com/Nisarg62?tab=repositories' isExternal style={{ display: 'flex', alignItems: 'center' }} >
                <AiFillGithub />Github
            </Link>
            <Link onClick={() => {
              setPageState('contact')
            }} style={{ display: 'flex', alignItems: 'center', marginLeft: '5%' }}>
                <AiFillPhone/> Contact
            </Link>
        </div>
        <Text fontSize='xl' bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' fontWeight='bold'>Made by Nisarg, Keshav Sureka, Anshul Inani, Ramansh Bhatia</Text>
    </div>
  )
}

export default Footer