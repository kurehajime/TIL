import React, { useEffect } from 'react'

export const CleanUp:React.FC = (props) => {
    const [currentNum, setCurrentNum] = React.useState(0)
    const incrementNum = () => {
        console.log('incrementNum')
        setCurrentNum(x => x + 1)
    }
    useEffect(() => {
        console.log('CleanUp useEffect ')
        window.addEventListener('mousedown',incrementNum)
        return () => {
            console.log('clean up')
            window.removeEventListener('mousedown',incrementNum)
        }
    }, [])


    return (
    <div>{currentNum}</div>
  )
}
