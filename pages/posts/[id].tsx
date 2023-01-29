import { getAllPostIds, getPostData } from '@/lib/post'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import postStyles from '@/styles/Post.module.css'
import React from 'react'

const Post = ({ postData }: {
    postData: {
        title: string,
        date: string,
        contentHtml: string
    }
 }) => {
    return (
        <>
            <Head>
                <title>{postData.title}</title>
            </Head>
            
            <div className={postStyles.container}>
                <article>
                    <h1 className={postStyles.title}>{postData.title}</h1>

                    <p className={postStyles.date}>{postData.date}</p>

                    <div className={postStyles.desc} dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
                </article>
            </div>
        </>
    )
}

export default Post

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostIds()

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const postData = await getPostData(params.id as string)
    return {
        props: {
            postData
        }
    }
}