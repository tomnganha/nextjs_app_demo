import { MongoClient } from "mongodb";
import { Fragment } from "react";
import MeetupList from "@/components/meetup/MeetupList  ";
import Head from "next/head";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups </title>
        <meta
          name="description"
          content="Browser a huge of highly active React meetups!"
        ></meta>
      </Head>
      <MeetupList meetups={props.meetups}></MeetupList>
    </Fragment>
  );
}

export async function getStaticProps() {
  //fetch data from an API

  const client = await MongoClient.connect(
    "mongodb+srv://hoangthai220102:hoangthai220102@cluster0.7gpusmi.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  console.log(db);
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find().toArray();
  client.close();
  console.log(meetups);
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
export default HomePage;
