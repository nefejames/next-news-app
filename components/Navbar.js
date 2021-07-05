import Link from "next/link";
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.main}>
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
      </div>
      <div>
        <Link href="/feed/1">
          <a>Feed</a>
        </Link>
      </div>
      <div>
        <Link href="/eom">
          <a>EOM</a>
        </Link>
      </div>
    </nav>
  );
}
