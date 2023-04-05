import React from 'react'
import { Highlight, Heading } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'

function Header({ setPageState, callData, setTypeWriter}) {

  const handleCreateCampaign = () => {
    setTypeWriter(true)
    setPageState('createCampaign')
  }

  return (
    <div className='header' >
       <div className={callData ? null : 'typewriter1'}>
        <Heading lineHeight='tall'>
            <Highlight
                query={['easier', 'secure', 'FTC']}
                styles={{ px: '2', py: '1', rounded: 'full', bg: 'red.100' }}
            >
                Crowdfunding made easier and
            </Highlight>
        </Heading>
        </div>
        <Heading lineHeight='tall'>
        <div className={callData ? null : 'typewriter2'}>
            <Highlight
                query={['easier', 'secure', 'FTC']}
                styles={{ px: '2', py: '1', rounded: 'full', bg: 'red.100' }}
            >
                 more secure than ever before.
            </Highlight>
       </div>
        </Heading>
        <Button  className={callData ? null : 'aniBtn'} onClick={handleCreateCampaign} colorScheme='orange' color={'black'} backgroundColor={'white'} leftIcon={<AiOutlineAppstoreAdd />} style={{margin: '3% 0%'}} >Create Campaign</Button>
    </div>
  )
}

export default Header