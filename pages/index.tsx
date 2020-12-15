import Head from 'next/head'
import Layout from '../components/layout'
import Header from '../components/header'
import Grid from '../components/grid'
import React from "react";

export default function Home() {
    return (
        <Layout home siteTitle="在线工具">
            <Header/>
            <div className="container">
                <Grid/>
            </div>
            <style jsx>
                {
                    ` .container {
              width: 75%;
              min-width: 640px;
              max-width: 960px;
              margin: 0 auto;
              padding: 1em;
          }
          `
                }
            </style>
        </Layout>

    )
}
