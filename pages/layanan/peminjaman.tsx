import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Button, Input, InputGroup } from 'react-daisyui'
import Jumbotron from '../../components/jumbotron'
import BarangInput from '../../components/barang-input'
import Content from '../../components/content'
import { GetServerSideProps } from 'next'
import APIResponse from '../../types/response'
import { Barang } from '../../types/models'
import { toast } from 'react-toastify'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { t } from '../../lib/i18n'

interface BarangInput {
  barang?: Barang,
  jumlah: number
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`${process.env.APP_URL}/api/barang`)
  const data = await res.json()

  return { props: { data } }
}

export default ({ data }: { data: APIResponse }) => {
  const barangs = data.data as Barang[]

  const [isLoading, setLoading] = useState(false)
  const [nama, setNama] = useState('')
  const [nim, setNim] = useState(0)
  const [alamat, setAlamat] = useState('')
  const [email, setEmail] = useState('')
  const [noTelp, setNoTelp] = useState('')
  const [keperluan, setKeperluan] = useState('')
  const [pinjam, setPinjam] = useState('')
  const [kembali, setKembali] = useState('')

  const [barangInputs, setBarangInputs] = useState<BarangInput[]>([
    { jumlah: 0 }
  ])

  const addInput = () => {
    setBarangInputs([
      ...barangInputs,
      { jumlah: 0 }
    ])
  }

  const deleteInput = (index: number) => {
    setBarangInputs(barangInputs.filter((_, i) => i != index))
  }

  const handleFormChange = (index: number, event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const data = [...barangInputs]
    const key = event.target.name as keyof BarangInput
    const value = Number.parseInt(event.target.value)

    if (key === 'barang') {
      const barang = barangs.filter(barang => barang.id === value)[0]
      data[index][key] = barang
    }
    else if (key === 'jumlah') {
      const barang = data[index]['barang']
      const filteredValue = barang
        ? Math.min(Math.max(0, value), barang.jumlah)
        : 0
      data[index][key] = filteredValue
    }
    setBarangInputs(data)
  }

  const handleSubmit = async (e: FormEvent<EventTarget>) => {
    e.preventDefault()
    setLoading(true)

    const filteredBarangInputs = barangInputs
      .filter(barangInput => barangInput.barang)
      .map(barangInput => ({
        barang_id: barangInput.barang ? barangInput.barang.id : 0,
        jumlah: barangInput.jumlah
      }))

    const requestData = {
      nama: nama,
      alamat: alamat,
      kembali: kembali,
      pinjam: pinjam,
      nim: nim.toString(),
      no_telp: noTelp.toString(),
      email: email,
      keperluan: keperluan,
      barang: filteredBarangInputs
    }
    try {
      const res = await fetch('/api/pinjam', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(requestData)
      })

      const resJson = await res.json()

      if (res.status === 200) {
        setNama('')
        setAlamat('')
        setKembali('')
        setPinjam('')
        setNim(0)
        setNoTelp('')
        setEmail('')
        setKeperluan('')
        setBarangInputs([{ jumlah: 0 }])
        withReactContent(Swal)
          .fire({
            title: <p>Peminjaman berhasil dilakukan.</p>,
            html: `Silakan cek Email Anda untuk detil lebih lanjut mengenai peminjaman yang telah dilakukan.<br>Kode Peminjaman Anda adalah: ${resJson.data.kode_peminjaman}`,
            icon: 'success',
            allowOutsideClick: false
          }).then(() => {
            window.location.reload()
          })
      } else {
        toast(`${res.status} | ${resJson.error}.`, {
          type: 'error'
        })
      }
    } catch (err) {
      toast('Peminjaman gagal dilakukan.', {
        type: 'error'
      })
    }
    setLoading(false)
  }

  return (
    <>
      <Jumbotron
        title={t('services:borrow.title')}
        subtitle={t('services:borrow.subtitle')} />

      <Content>
        <div className='text-center mb-20'>
          <h3 className='text-baseDark font-bold text-3xl mb-8'>{t('services:borrow.rules_title')}</h3>
          <div className='bg-warning p-4 font-semibold rounded-2xl xl:mx-32 mb-4'>{t('services:borrow.rules_1')}</div>
          <div className='bg-warning p-4 font-semibold rounded-2xl xl:mx-32 mb-4'>{t('services:borrow.rules_2')}</div>
          <div className='bg-warning p-4 font-semibold rounded-2xl xl:mx-32'>{t('services:borrow.rules_3')}</div>
        </div>
        <div className='mb-20'>
          <h3 className='text-baseDark font-bold text-3xl mb-8'>{t('services:borrow.data_title')}</h3>
          <form onSubmit={handleSubmit}>
            <InputGroup size='lg' className='mb-6 shadow max-lg:input-group-vertical'>
              <span className='lg:w-52'>{t('form:name')}</span>
              <Input value={nama} onChange={e => setNama(e.target.value)}
                className='w-full' type='text' placeholder='Paulin Suartini' bordered required />
            </InputGroup>
            <InputGroup size='lg' className='mb-6 shadow max-lg:input-group-vertical'>
              <span className='lg:w-52'>{t('form:nim')}</span>
              <Input value={nim || ''} onChange={e => setNim(Number.parseInt(e.target.value))}
                className='w-full' type='number' placeholder='205150201111099' bordered required />
            </InputGroup>
            <InputGroup size='lg' className='mb-6 shadow max-lg:input-group-vertical'>
              <span className='lg:w-52'>{t('form:address')}</span>
              <Input value={alamat} onChange={e => setAlamat(e.target.value)}
                className='w-full' type='text' placeholder='Jl. Veteran' bordered required />
            </InputGroup>
            <InputGroup size='lg' className='mb-6 shadow max-lg:input-group-vertical'>
              <span className='lg:w-52'>{t('form:email')}</span>
              <Input value={email} onChange={e => setEmail(e.target.value)}
                className='w-full' type='email' placeholder='username@ub.ac.id' bordered required />
            </InputGroup>
            <InputGroup size='lg' className='mb-6 shadow max-lg:input-group-vertical'>
              <span className='lg:w-52'>{t('form:phone')}</span>
              <Input value={noTelp} onChange={e => setNoTelp((e.target.value).replace(/[^0-9]+/g, ''))}
                className='w-full' type='tel' placeholder='083341612722' bordered required />
            </InputGroup>
            <InputGroup size='lg' className='mb-6 shadow max-lg:input-group-vertical'>
              <span className='lg:w-52'>{t('form:purpose')}</span>
              <Input value={keperluan} onChange={e => setKeperluan(e.target.value)}
                className='w-full' type='text' placeholder='Kebutuhan Praktikum' bordered required />
            </InputGroup>
            <InputGroup size='lg' className='mb-6 shadow max-lg:input-group-vertical'>
              <span className='lg:w-72'>{t('form:borrow_date')}</span>
              <Input value={pinjam} onChange={e => setPinjam(e.target.value)}
                className='w-full' type='date' bordered required />
            </InputGroup>
            <InputGroup size='lg' className='mb-10 shadow max-lg:input-group-vertical'>
              <span className='lg:w-72'>{t('form:return_date')}</span>
              <Input value={kembali} onChange={e => setKembali(e.target.value)}
                className='w-full' type='date' bordered required />
            </InputGroup>
            <hr className='my-8 h-px bg-gray-200 border-0' />

            <h3 className='text-baseDark font-bold text-3xl mb-8'>{t('services:borrow.items_title')}</h3>
            <div className='mb-8'>
              {barangInputs.map((barang, index) => (
                <BarangInput
                  key={index}
                  barangs={barangs}
                  barang={barang.barang}
                  jumlah={barang.jumlah}
                  onChange={event => handleFormChange(index, event)}
                  onDelete={() => deleteInput(index)} />
              ))}
              <Button color='success' onClick={() => addInput()} type='button' className='shadow'>{t('form:add_button')}</Button>
            </div>

            <div className='text-center'>
              <Button color='warning' type='submit' className={`w-full lg:w-52 ${isLoading && 'loading'}`}>{t('button_send')}</Button>
            </div>
          </form>
        </div>
      </Content>
    </>
  )
}
