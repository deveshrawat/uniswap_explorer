import { useContext, useEffect, useState } from 'react';
import { AiOutlineDown } from 'react-icons/ai';
import { FiArrowUpRight } from 'react-icons/fi';
import ethLogo from '../assests/eth.png';
import uniswapLogo from '../assests/uniswap.png';
import { TransactionContext } from '../context/AuthContext';

const style = {
  wrapper: `p-4 w-screen flex justify-between items-center`,
  headerLogo: `flex w-1/4 items-center justify-start`,
  nav: `flex-1 flex justify-center items-center`,
  navItemsContainer: `flex bg-[#191B1F] rounded-3xl`,
  navItem: `px-4 py-2 m-1 flex items-center text-lg font-semibold text-[0.9rem] cursor-pointer rounded-3xl`,
  activeNavItem: `bg-[#20242A]`,
  buttonsContainer: `flex w-1/4 justify-end items-center`,
  button: `flex items-center bg-[#191B1F] rounded-2xl mx-2 text-[0.9rem] font-semibold cursor-pointer`,
  buttonPadding: `p-2`,
  buttonTextContainer: `h-8 flex items-center`,
  buttonIconContainer: `flex items-center justify-center w-8 h-8`,
  buttonAccent: `bg-[#172A42] border border-[#163256] hover:border-[#234169] h-full rounded-2xl flex items-center justify-center text-[#4F90EA]`
};

const Header = () => {
  const [userName, setUserName] = useState<string>();
  const { connectWallet, currentAccount, handleLoggedOut } = useContext(TransactionContext);

  useEffect(() => {
    if (currentAccount) {
      setUserName(`${currentAccount.slice(0, 7)}...${currentAccount.slice(35)}`);
    }
  }, [currentAccount, userName]);

  return (
    <div className={style.wrapper}>
      <div className={style.headerLogo}>
        <img src={uniswapLogo} alt="uniswap_explorer" height={40} width={40} />
      </div>
      <div className={style.nav}>
        <div className={style.navItemsContainer}>
          <div className={`${style.navItem} ${style.activeNavItem}`}>Transactions History</div>

          <a href="https://info.uniswap.org/#/" target="_blank" rel="noreferrer">
            <div className={style.navItem}>
              Charts <FiArrowUpRight />
            </div>
          </a>
        </div>
      </div>
      <div className={style.buttonsContainer}>
        <div className={`${style.button} ${style.buttonPadding}`}>
          <div className={style.buttonIconContainer}>
            <img src={ethLogo} alt="eth logo" height={20} width={20} />
          </div>
          <p>Ethereum</p>
          <div className={style.buttonIconContainer}>
            <AiOutlineDown />
          </div>
        </div>
        {currentAccount ? (
          <>
            <div className={`${style.button} ${style.buttonPadding}`}>
              <div className={style.buttonTextContainer}>{userName}</div>
            </div>
            <div onClick={() => handleLoggedOut()} className={`${style.button} ${style.buttonPadding}`}>
              <div className={`${style.buttonAccent} ${style.buttonPadding}`}>Logout</div>
            </div>
          </>
        ) : (
          <div onClick={() => connectWallet()} className={`${style.button} ${style.buttonPadding}`}>
            <div className={`${style.buttonAccent} ${style.buttonPadding}`}>Connect Wallet</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
