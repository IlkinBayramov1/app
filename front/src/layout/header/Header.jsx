import React from 'react'
import style from './Header.module.css'

const Header = () => {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.herder1}>
          <div className={style.headerhome}>Home</div>
          <div className={style.headerhome}>Contact</div>
          <div className={style.headerhome}>About Us</div>
          <div className={style.headerhome}></div>
          <div className={style.headerhome}></div>
        </div>
      </div>
    </div>
  )
}

export default Header