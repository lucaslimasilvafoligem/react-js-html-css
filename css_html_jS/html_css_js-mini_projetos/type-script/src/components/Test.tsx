import React from 'react'

interface TestProps {
  myState?: string;
  myFunc: () => void;
}
export const Test: React.FC<TestProps> = ({myState, myFunc}) => {
  return <div onClick={myFunc}>{myState}</div>
}
 