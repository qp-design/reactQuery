import {useMountedRef} from './libs/hooks'
import { useState, useEffect } from 'react'

const Main = () => {
  const [value, setValue] = useState(0)
  const isMountedR = useMountedRef()
  useEffect(() => {
  }, [isMountedR])

  const test = () => {
    if(isMountedR.current)
    setValue(pre => pre+1)
  }
  return <div>
    {
      isMountedR.current
    }
    <button onClick={test}>{value}</button>
  </div>
}

export default Main
