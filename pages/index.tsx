import Head from 'next/head'
import { Inter } from '@next/font/google'
import Layout from '../core/components/layout'
import Panels from '../components/panels'
import { useState } from 'react';

export default function Home() {
  const [play, setPlay] = useState(true)

  return (
    <Layout>
      <Panels play={play} text="future" />
      <button
        className={`btn btn-filled`}
        onClick={() => setPlay(false)}
      >
        Click
      </button>
    </Layout>
  )
}
