import type { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import homeStyles from '../styles/Home.module.css'
import { getSortedPostsData } from '../lib/post'
import profileImage from '@/public/images/profile_image.jpeg'

const Home = ({allPostsData}: {
  allPostsData: {
    date: string,
    title: string,
    id: string
  }[]
}) => {
  return (
    <>
      <Head>
        <title>개발자 둔덕 Mini Blog</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={homeStyles.container}>
        <section className={homeStyles.profile}>
          <div className={homeStyles.profile__img}>
            <Image src={profileImage} alt="프로필 사진" />
          </div>

          <h3 className={homeStyles.profile__name}>개발자 둔덕</h3>

          <p className={homeStyles.profile__desc}>
            <strong>NextJs</strong> & <strong>TypeScript</strong> 활용한 미니 블로그입니다.
          </p>
        </section>

        <section className={homeStyles.blogBox}>
          <h2 className={homeStyles.blogBox__title}>블로그 글 목록</h2>

          <ul className={homeStyles.blogBox__list}>
            {allPostsData.map(({id, title, date}) => (
              <li className={homeStyles.blogBox__listItem} key={id}>
                <Link href={`/posts/${id}`}>{title}</Link>

                <small className={homeStyles.lightText}>
                  {date}
                </small>
              </li>
              ))}
          </ul>
        </section>
      </div>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}