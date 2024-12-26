import LogoMark from "../../assets/logo-main.svg";
import LogoType from "../../assets/logo-type.svg";
import styles from "./Logo.module.css";

interface LogoProps {
  showText?: boolean;
}

const Logo = ({ showText = true }: LogoProps) => {
  return (
    <div className={styles.logo}>
      <img src={LogoMark} alt='Logo Main' className={styles.logoMark} />
      {showText && (
        <img src={LogoType} alt='Logo Main' className={styles.logoType} />
      )}
    </div>
  );
};

export default Logo;
