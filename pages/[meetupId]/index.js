import { MongoClient, ObjectId } from "mongodb";

function MeetupDetails({ meetupData }) {
  return (
    <>
      <img src={meetupData.image} alt="A first meetup" />
      <h1>{meetupData.title}</h1>
      <address>{meetupData.address}</address>
      <p>{meetupData.description}</p>
    </>
  );
}

export default MeetupDetails;

export async function getStaticPaths() {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://user:user@cluster0.7uoge.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();
  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup
  const meetupId = context.params.meetupId;

  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://user:user@cluster0.7uoge.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
        image: selectedMeetup.image,
      },
    },
  };
}
