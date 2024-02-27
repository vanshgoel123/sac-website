import { FunctionComponent } from "react";
import ClubsLayout from "../../../layouts/ClubsLayout";
import ClubHeader from "../../../features/club/cultural/ClubHeader";
import ClubBanner from "../../../features/club/cultural/ClubBanner";
import ClubDescription from "../../../features/club/cultural/ClubDescription";
import ClubEvents from "../../../features/club/cultural/ClubEvents";
import Gallery from "../../../features/club/common/Gallery";
import tbdBg from "../../../assets/cultural_clubs_bg/tbd.png";
import tbdLogo from "../../../assets/cultural_clubs_bg/tbd_logo.jpg";
import Crew from "../../../features/club/common/Crew";
import { tdb } from "../../../data/Crews/CulturalClubCrew";

interface TakeDaBaitProps {}

import { calendarData } from "../../../data/EventsAndGallery/EventCalendarData";
interface CalendarDataProps {
  date: string;
  eventName: string;
  club: string;
  desc: string;
}
const today = new Date();
const sortedEvents = calendarData.filter((event) => {
  const [eventDay, eventMonth, eventYear] = event.date.split("-").map(Number);
  const eventDate = new Date(eventYear, eventMonth - 1, eventDay);

  return (
    eventDate.getFullYear() >= today.getFullYear() &&
    (eventDate.getMonth() > today.getMonth() ||
      (eventDate.getMonth() === today.getMonth() &&
        eventDate.getDate() >= today.getDate())) &&
    event.club === "TDB"
  );
});
let earliestTwoEvents: CalendarDataProps[] = [];
if (sortedEvents.length >= 2) {
  earliestTwoEvents = sortedEvents.slice(0, 2);
} else if (sortedEvents.length === 1) {
  earliestTwoEvents = [
    ...sortedEvents,
    { date: "", eventName: "No Upcoming Event", club: "", desc: "" },
  ];
} else {
  earliestTwoEvents = [
    { date: "", eventName: "No Upcoming Event", club: "", desc: "" },
    { date: "", eventName: "No Upcoming Event", club: "", desc: "" },
  ];
}

const TakeDaBait: FunctionComponent<TakeDaBaitProps> = () => {
  return (
    <>
      <ClubsLayout>
        <ClubHeader />
        <ClubBanner clubName="Take da Bait" bg={tbdBg} />
        <ClubDescription img={tbdLogo}>
          Take da Bait is a debate club at IIIT-Naya Raipur that was officially
          sanctioned under the Student Activity Council on January 5th, 2020.
          The club&apos;s purpose is to provide a platform for students to
          discuss and debate current trends and issues in the world, and to help
          members form their own opinions on these topics. The club aims to
          expose members to a wide range of facts and ideas, and to provide
          opportunities for members to share their own perspectives and to
          listen to the perspectives of others. The club is intended to help
          students connect to the changing socio-political environment of the
          world and to understand the potential advantages and disadvantages of
          technology and its impact on the world. The club believes that by
          discussing and debating important issues, members will be better
          equipped to be informed citizens and future leaders.
        </ClubDescription>
        <ClubEvents props={earliestTwoEvents} />
        <Crew props={tdb} />
        <Gallery club="CDT" />
      </ClubsLayout>
    </>
  );
};

export default TakeDaBait;
