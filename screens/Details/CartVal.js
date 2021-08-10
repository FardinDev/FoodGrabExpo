import React from 'react'
import { Text } from 'react-native-animatable'
import { useSelector } from 'react-redux'

export const CartVal = () => {
  const selSelectedTab = useSelector((state) => state.selSelectedTab)

  
  return (<Text>{selSelectedTab}</Text>)
}