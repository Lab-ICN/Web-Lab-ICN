import { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'
import { Button } from 'react-daisyui'
import Card from '../../components/card'
import ImageJumbotron from '../../components/image-jumbotron'
import Content from '../../components/content'
import { t } from '../../lib/i18n'
import { Kegiatan } from '../../types/models'
import APIResponse from '../../types/response'
import Custom404 from '../404'


export default ({ data }: { data: APIResponse }) => {
  if (!data.success || data.data === null) {
    return (
      <Custom404 />
    )
  }

  const kegiatan = data.data as Kegiatan
  const [posts, setPosts] = useState<Kegiatan[]>([])

  useEffect(() => {
    fetch('/api/kegiatan')
      .then(res => res.json())
      .then(data => {
        setPosts(data.data.slice(0, 3))
      })
  }, [])

  return (
    <>
      <ImageJumbotron image={kegiatan.gambar} category={kegiatan.tipe} />

      <Content>
        <div className='mb-20'>
          <h3 className='text-baseDark font-bold text-3xl mb-8 text-center'>{kegiatan.judul}</h3>
          <div className='text-lg leading-9'>
            {kegiatan.artikel}
          </div>
        </div>
        <div className='mx-auto'>
          <div className='flex flex-wrap -mx-1 lg:-mx-4'>
            <div className='my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4 flex items-center'>
              <div>
                <h4 className='text-4xl font-bold'>{t('article:check_1')}</h4>
                <h4 className='text-3xl font-bold mb-8'>{t('article:check_2')}</h4>
                <Button color='primary' shape='circle' className='pointer-events-none'>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512' fill='white' width='50%' height='50%'>
                    <path d='M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z' />
                  </svg>
                </Button>
              </div>
            </div>
            {
              posts.map((post, key) => (
                <Card
                  key={key}
                  width='1/4'
                  href={`/tri-dharma/${post.id}`}
                  title={post.judul}
                  description={post.deskripsi}
                  image={post.gambar} />
              ))
            }
          </div>
        </div>
      </Content>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id as string

  const res = await fetch(`${process.env.APP_URL}/api/kegiatan/${id}`)
  const data = await res.json()

  return { props: { data } }
}