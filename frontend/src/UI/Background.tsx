export default function Background() {  
    return (
      <div className="top-bg">
        <div className="background">
  
          {/* Grainy overlay */}
          <svg className="grain">
            <defs>
              <filter id="grainy">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.8"
                  numOctaves="3"
                  stitchTiles="stitch"
                />
                <feColorMatrix type="saturate" values="0" />
              </filter>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="transparent"
              filter="url(#grainy)"
            />
          </svg>
        </div>
      </div>
    )
  }