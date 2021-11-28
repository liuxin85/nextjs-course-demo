import MeetupList from "../components/meetups/MeetupList";
import { useEffect, useState } from "react";
import { MongoClient } from "mongodb";
import Head from "next/head";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://images.pexels.com/photos/10334932/pexels-photo-10334932.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    address: "Some address 5, 1235 Some City",
    description: "This si a first meetup!",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image:
      "https://images.pexels.com/photos/10334932/pexels-photo-10334932.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    address: "Some address 5, 1235 Some City",
    description: "This si a second meetup!",
  },
];

function HomePage(props) {
  //   const [loadedMeetups, setLoadedMeetups] = useState([]);

  // Two render cycles
  //   useEffect(() => {
  //     // send a http request and fetch data
  //     setLoadedMeetups(DUMMY_MEETUPS);
  //   }, []);
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Brwer a new Meetup" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

export default HomePage;

export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://user:user@cluster0.7uoge.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   // fetch data from an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }
