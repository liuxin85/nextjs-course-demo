import Link from "next/link";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Meetups</div>
      <ul>
        <li>
          <Link href="/">All MeetUp </Link>
        </li>
        <li>
          <Link href="/new-meetup">New MeetUp </Link>
        </li>
      </ul>
    </header>
  );
};

export default MainNavigation;
