'use client';

import React, { useRef, useCallback, useEffect, useState } from 'react'
import { IPanels } from './types'
import { useResize } from '../../hooks'
import styles from './panels.module.scss'
import { debounce } from 'lodash'

const Panels: React.FC<IPanels> = (props: IPanels) => {
  const { text = '', play = true } = props
  const panelsRef = useRef(null)
  const { width, height } = useResize(panelsRef)
  const [svgKey, setSvgKey] = useState(0)

  const columnNumber = 7
  const columnWidth = width / columnNumber

  const getPosition = useCallback((i: number) => {
    return columnWidth * i
  }, [columnWidth])

  // Each time when screen size is changed 
  // we have to re-create svg with new parameters
  // by update svgKey
  const onReCreate = debounce(() => {
    setSvgKey(svgKey + 1)
  }, 1000)

  useEffect(() => {
    if (width) {
      onReCreate()
    }
    return () => {}
  }, [width]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (play === false) {
      setSvgKey(svgKey + 1)
    }
  }, [play, svgKey])
  
  return (
    <div 
      className={`${styles['panels']} hidden-md-down`}
      ref={panelsRef}
    >
      {svgKey 
        ? (
          <svg key={svgKey} viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <g className={`${styles['panels_lines']}`}>
              {Array.from(Array(columnNumber).keys()).map((_, i) => {
                if (!i) {
                  return null
                }
                return (
                  <line key={i} className={`${styles[`line`]}`} x1={play ? width/2 : getPosition(i)} x2={play ? width/2 : getPosition(i)} y1={0} y2={play ? 0 : height} stroke="#d4d4d3" >
                    {/* play normal */}
                    {play ? (
                      <>
                        <animate attributeName="y2" from={0} to={height} dur="250ms" fill="freeze"/>
                        <animate attributeName="x1" from={width/2} to={getPosition(i)} begin="250ms" dur="500ms" fill="freeze"/>
                        <animate attributeName="x2" from={width/2} to={getPosition(i)} begin="250ms" dur="500ms" fill="freeze"/>
                      </>
                    ) : null}
                    {/* play reverse */}
                    {!play ? (
                      <>
                        <animate attributeName="x1" from={getPosition(i)} to={width/2} dur="500ms" fill="freeze"/>
                        <animate attributeName="x2" from={getPosition(i)} to={width/2} dur="500ms" fill="freeze"/>
                        <animate attributeName="y2" from={height} to={0} begin="500ms" dur="250ms" fill="freeze"/>
                      </>
                    ) : null}
                  </line>
                )
              })}
            </g>
            <g className={`${styles['panels_text']}`}>
              {Array.from(text).map((char, i) => {
                return play ? (
                  <g key={i}>
                    <clipPath id={`clip-${i}`}>
                      <rect width={columnWidth * (i + 1)} height="100%" />
                    </clipPath>
                    <g clipPath={`url(#clip-${i})`}>
                      <text x={getPosition(i) + columnWidth / 2} y="40%" style={{animation: `appear${i} 2s`}} dominantBaseline="middle" textAnchor="middle" fill="#d4d4d3">{char}</text>
                    </g>
                  </g>
                ) : null
              })}
            </g>
            <style>
              {
                `
                  text { font-size: 18rem; opacity: 0.5; }
                  @media only screen and (max-width: 1280px) { 
                    text {
                      font-size: 14rem; 
                    }
                  }
                `
              }
              {Array.from(text).map((char, i) => (
                `
                  @keyframes appear${i} {
                    0% {
                      transform: translateX(100%);
                    }
                    100% {
                      transform: translateX(0);
                    }
                  }
                `
              ))}
            </style>
          </svg>
        ) 
        : null
      }
    </div>
  )
}

export default Panels;
