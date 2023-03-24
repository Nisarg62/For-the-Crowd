import React from 'react'
import { Highlight, Heading } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'

function Header({ setPageState }) {

  const handleCreateCampaign = () => {
    setPageState('createCampaign')
  }

  return (
    <div className='header'>
        <Heading lineHeight='tall'>
            <Highlight
                query={['easier', 'secure', 'FTC']}
                styles={{ px: '2', py: '1', rounded: 'full', bg: 'red.100' }}
            >
                Crowdfunding made easier and more secure than ever before.
            </Highlight>
        </Heading>
        <Button onClick={handleCreateCampaign} colorScheme='orange' color={'black'} backgroundColor={'white'} leftIcon={<AiOutlineAppstoreAdd />} style={{margin: '3% 0%'}} >Create Campaign</Button>
    </div>
  )
}

export default Header