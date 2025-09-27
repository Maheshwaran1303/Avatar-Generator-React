import React, { useEffect, useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import 'animate.css';
import { toast, ToastContainer } from 'react-toastify'

const data = [
  {
    label: "Illustration",
    value: "illustration",
    url: "https://api.dicebear.com/7.x/avataaars/svg?seed="
  },
  {
    label: "Cartoon",
    value: "cartoon",
    url: "https://api.dicebear.com/7.x/adventurer/svg?seed="
  },
  {
    label: "Sketchy",
    value: "sketchy",
    url: "https://api.dicebear.com/7.x/croodles/svg?seed="
  },
  {
    label: "Robots",
    value: "robots",
    url: "https://api.dicebear.com/7.x/bottts/svg?seed="
  },
  {
    label: "Art",
    value: "art",
    url: "https://api.dicebear.com/7.x/pixel-art/svg?seed="
  },
  {
    label: "Male",
    value: "male",
    url: "https://randomuser.me/api/portraits/men/{id}.jpg"
  },
  {
    label: "Female",
    value: "female",
    url: "https://randomuser.me/api/portraits/women/{id}.jpg"
  }
]

const App = () => {
  const [src, setSrc] = useState(null)
  const [option, setOption] = useState("male")

  const onOptionChange = (e) => {
    const value = e.target.value
    setOption(value)
  }

  const generateRandomNumber = () => {
    // Random number 1 to 99 (randomuser supports 0–99 actually)
    return Math.floor(Math.random() * 99) + 1
  }

  const generate = () => {
    const obj = data.find((item) => item.value === option)
    const url = obj.url

    if (option === "male" || option === "female") {
      // Replace {id} with random number
      const imageUrl = url.replace("{id}", generateRandomNumber())
      setSrc(imageUrl)
    } else {
      // Dicebear → unique ID for random avatar
      const uniqueID = Date.now()
      const imageUrl = `${url}${uniqueID}`
      setSrc(imageUrl)
    }
  }

  const handleDownload = (url) => {
    const a = document.createElement("a")
    a.href = url
    a.download = `avatar${Date.now()}.jpg`
    a.click()
    a.remove()
  }

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url)
    toast.success("Avatar URL copied to clipboard", {position: 'top-center'})
  }

  useEffect(() => {
    generate()
  }, [option])

  return (
    <div className='animate__animated animate__fadeIn min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center text-white'>
      <div className='animate__animated animate__slideInUp animate__faster gap-6 flex flex-col items-center w-full max-w-md border border-slate-700 rounded-2xl p-10 backdrop-blur-xl shadow-xl'>
        
        <img
          src={src || "./avt.jpg"}
          alt="avatar"
          className='w-32 h-32 rounded-full shadow-lg border-4 border-slate-700'
        />

        <div className='text-center'>
          <h1 className='text-3xl font-bold tracking-wide'>Avatar Generator</h1>
          <p className='text-slate-300'>Generate unlimited avatars for your website</p>
        </div>

        <div className='w-full space-y-6'>
          <select
            className='bg-slate-900/60 w-full rounded-xl p-2'
            value={option}
            onChange={onOptionChange}
          >
            {data.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <div className='bg-slate-900/60 w-full rounded-xl p-2'>
            {src}
          </div>
        </div>

        <div className='flex w-full gap-4'>
          <button
            onClick={generate}
            className='flex-1 bg-gradient-to-r from-rose-500 to-orange-600 font-medium rounded-lg py-2 hover:scale-105 transition-transform'
          >
            <i className="ri-arrow-right-up-line mr-1"></i>
            Change
          </button>

          <button
            className='flex-1 bg-gradient-to-r from-green-500 to-cyan-600 font-medium rounded-lg py-2 hover:scale-105 transition-transform'
            onClick={()=> handleDownload(src)}
          >
            <i className="ri-download-line mr-1"></i>
            Download
          </button>

          <button
            className='flex-1 bg-gradient-to-r from-orange-500 to-amber-600 font-medium rounded-lg py-2 hover:scale-105 transition-transform'
            onClick={() => handleCopy(src)}
          >
            <i className="ri-file-copy-line mr-1"></i>
            Copy
          </button>
        </div>

      </div>
      < ToastContainer />
    </div>
  )
}

export default App
