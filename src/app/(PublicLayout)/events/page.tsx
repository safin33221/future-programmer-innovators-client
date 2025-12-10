import EventCard from "@/components/modules/events/EventCard";


export default function Events() {
  const events = [
    {
      title: "Intro to Web Development",
      date: "Oct 15, 2024",
      time: "2:00 PM - 4:00 PM",
      location: "Lab 3, CS Block",
      type: "Workshop",
      description:
        "Learn the basics of HTML, CSS, and JavaScript in this hands-on workshop.",
      status: "Upcoming",
    },
    {
      title: "FPI Coding Cup 2024",
      date: "Oct 20, 2024",
      time: "10:00 AM - 1:00 PM",
      location: "Online",
      type: "Contest",
      description:
        "Our flagship competitive programming contest. Open to all members.",
      status: "Registration Open",
    },
    {
      title: "Guest Lecture: AI Trends",
      date: "Oct 25, 2024",
      time: "3:00 PM - 4:30 PM",
      location: "Auditorium",
      type: "Seminar",
      description:
        "A deep dive into the latest trends in Artificial Intelligence and Machine Learning.",
      status: "Upcoming",
    },
  ];

  return (
    <section className="container mx-auto py-16 px-4 md:px-6 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          Events & Workshops
        </h1>

        <p className="text-xl text-muted-foreground">
          Join us for our upcoming events. Learn, compete and network.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>
    </section>
  );
}
