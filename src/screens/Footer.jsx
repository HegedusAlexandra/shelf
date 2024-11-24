import React, {memo} from 'react'
import DropDown from '../components/DropDown'

 function Footer() {
  return (
    <div className='w-[100%] h-[10vh]'><DropDown type={'Sitemap'}/></div>
  )
}

export default memo(Footer)