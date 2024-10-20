import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
            src="/images/logo.png"
            alt="Transpofacil logo"
            width={180}    
            height={200}
            layout="responsive"  
            priority
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,..."
        />
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
