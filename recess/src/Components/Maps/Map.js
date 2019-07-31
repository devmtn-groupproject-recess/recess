//this is the base map component 
import React, { useEffect, useRef} from 'react'
//import {isEqual, omit, functions} from 'lodash'
const Key = process.env.REACT_APP_GOOGLE_API_KEY


export default function Map({ options, onMount, className }) {
  // console.log(options, 1111,onMount,222222,className )
  const props = { ref: useRef(), className }
  const onLoad = () => {
    const map = new window.google.maps.Map(props.ref.current, options)
    onMount && onMount(map)
  }



  useEffect(() => {
    if (!window.google) {
      const script = document.createElement(`script`)
      script.type = `text/javascript`
      script.src =
        `https://maps.google.com/maps/api/js?key=` + Key
      const headScript = document.getElementsByTagName(`script`)[0]
      headScript.parentNode.insertBefore(script, headScript)
      script.addEventListener(`load`, onLoad)
      return () => script.removeEventListener(`load`, onLoad)
    } else onLoad()


  })

  return (
  
    <div
            
      {...props}
      style={{ height: `70vh`, margin: `1em 0`, borderRadius: `0.5em` }}>
      
      </div>
    
  )
  }  
//   const shouldUpdate = (prevProps, nextProps) => {
//     const [prevFuncs, nextFuncs] = [functions(prevProps), functions(nextProps)]
//     return (
//       isEqual(omit(prevProps, prevFuncs), omit(nextProps, nextFuncs)) &&
//       prevFuncs.every(fn => prevProps[fn].toString() === nextProps[fn].toString())
//     )
//   }

// export default React.memo(Map, shouldUpdate)  



// Map.defaultProps = {
//     options: {
//       center: { lat: 48, lng: 8 },
//       zoom: 5,
//     },
// }