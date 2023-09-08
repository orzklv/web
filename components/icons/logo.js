import Image from 'next/image'
import PNG from '../../public/favicons/logo.png'

// PNG Version
// const Logo = () => {
//   return <Image src={PNG} width={50} height={50} alt="Sokhibjon's Logo" />
// }

// SVG Resolution
const Logo = () => {
  // fill="var(--fg)" == fill="#ffffff"
  // fill="var(--bg)" == fill="var(--bg)"
  return (
    <svg height="40" width="50" viewBox="0 0 3000 3000">
      <g id="Main" stroke="none" strokeWidth="1" fill="var(--fg)" fillRule="evenodd">
        <path d="M2250,238 L2250,761 L2750,761 L2250,1261 L2250,1762 L1250,2761 L1250,2261.5 L1749.001,1762 L1250,1762 L1250,1261 L750,1761 L250,1761 L1250,761 L1750,761 L2250,238 Z" id="Combined-Shape"></path>
      </g>
    </svg>
  )
}

export default Logo
