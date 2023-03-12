import React from 'react'
import Head from "next/head";
import { ILayout } from './types'

export default function Layout(props: ILayout) {
  const { title, children, description } = props;
  return (
    <>
      <Head>
        <title>{`${title ? `${title} | ` : ""} CraftScript`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {description ? <meta name="description" content={description} /> : ''}

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>{children}</div>
    </>
  )
}
