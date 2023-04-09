import React from 'react'
import MyCampaignCard from './MyCampaignCard'
import { Heading, Text } from '@chakra-ui/react'
import { MdArrowBack } from 'react-icons/md'

function MyCampaigns({ setPageState, managerCampaigns, setCampaignIndex, ethToUsd }) {

    const handleHome = () => {
        setPageState('home')
        }

  return (
    <div className='campaigns-container' >
        <div onClick={handleHome} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', width: '8%' }} >
            <MdArrowBack color='tomato'/>
            <Text color='tomato' fontWeight='bold'>Go Back</Text>
        </div>
        <div>
          <Heading className='typewriter3'style={{ marginBottom: '5%'}}>My Campaigns</Heading>
        </div>
          {
            managerCampaigns.map((camp, ind) => (
                <MyCampaignCard key={ind} setPageState={setPageState} camp={camp} setCampaignIndex={setCampaignIndex} 
                ethToUsd={ethToUsd} />
            ))
          }
    </div>
  )
}

export default MyCampaigns