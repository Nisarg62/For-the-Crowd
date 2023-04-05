import React from 'react'
import useEffect from 'react';
import {
    Stat,
    StatLabel,
    StatNumber,
    Text,
    Divider
  } from '@chakra-ui/react'
import { FaEthereum } from 'react-icons/fa'



function Stats({ allCampaigns, totalEther, setTypeWriter, typewriter}) {

  const handleAnimation = () => {
    setTypeWriter(true)
  }

  const classes = 'stats aniDesc'

  return (
    <div className={classes}>
        <Text className={typewriter? 'desc2' : 'desc'} fontSize='4xl' color='white' onAnimationEnd={handleAnimation} >Bring a creative project to life.</Text>
        <div className='stats-items' >
            <Stat className='stats-item'>
                <StatNumber className='aniDesc'>{allCampaigns.length}</StatNumber>
                <StatLabel className={typewriter? 'desc2' : 'desc'} >Projects Funded</StatLabel>
            </Stat>
            <Divider orientation='vertical'/>
            <Stat className='stats-item'>
                <StatNumber className='aniDesc' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} >{`${totalEther}`.substring(0, 8)} ETH<FaEthereum/></StatNumber>
                <StatLabel className={typewriter? 'desc2' : 'desc'} >Towards Creative Work</StatLabel>
            </Stat>
        </div>
    </div>
  )
}

export default Stats