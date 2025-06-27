import { Calendar, Briefcase, GraduationCap, Zap } from "lucide-react";
import { TabDataTypes } from "./types";

export const TimelineData: TabDataTypes[] = [
  {
    id: "conference",
    title: "Tech Conference",
    icon: Calendar,
    stats: {
      sessions: "9+",
      attendees: "250+",
      duration: "8h"
    },
    entries: [
      {
        startTime: "09:00 AM",
        endTime: "09:30 AM",
        title: "Registration & Welcome Coffee",
        description: "Check-in and network with fellow attendees while enjoying complimentary refreshments.",
        labels: ["LIVE"],
        attendees: 150,
        location: "Main Lobby",
        pointColor: "point_1"
      },
      {
        startTime: "09:30 AM",
        endTime: "10:30 AM",
        title: "Opening Keynote: The Future of Technology",
        description: "Join our distinguished speaker as they explore emerging trends in AI and machine learning.",
        labels: ["VIP"],
        attendees: 250,
        location: "Grand Hall",
        pointColor: "point_2"
      },
      {
        startTime: "10:30 AM",
        endTime: "11:30 AM",
        title: "LIVE Discussion: Digital Transformation",
        description: "Industry experts discuss the challenges and opportunities of digital transformation.",
        labels: ["LIVE"],
        attendees: 180,
        location: "Conference Room A",
        pointColor: "point_3"
      },
      {
        startTime: "11:30 AM",
        endTime: "12:00 PM",
        title: "Coffee Break & Networking",
        description: "Take a break to recharge and connect with other participants.",
        labels: ["LIVE"],
        attendees: 200,
        location: "Exhibition Area",
        pointColor: "point_4"
      },
      {
        startTime: "12:00 PM",
        endTime: "01:30 PM",
        title: "Workshop: Hands-on Development",
        description: "Interactive workshop where participants will build real-world applications.",
        labels: ["VIP"],
        attendees: 80,
        location: "Lab Room 1",
        pointColor: "point_5"
      },
    ]
  },
  {
    id: "business",
    title: "Business Summit",
    icon: Briefcase,
    stats: {
      sessions: "12+",
      attendees: "500+",
      duration: "2 days"
    },
    entries: [
      {
        startTime: "08:00 AM",
        endTime: "09:00 AM",
        title: "Executive Breakfast",
        description: "Exclusive networking breakfast for C-level executives and industry leaders.",
        labels: ["VIP"],
        attendees: 50,
        location: "Executive Lounge",
        pointColor: "point_6"
      },
      {
        startTime: "09:00 AM",
        endTime: "10:00 AM",
        title: "Global Market Trends Analysis",
        description: "Deep dive into emerging markets and investment opportunities worldwide.",
        labels: ["LIVE"],
        attendees: 300,
        location: "Main Auditorium",
        pointColor: "point_1"
      },
      {
        startTime: "10:00 AM",
        endTime: "11:30 AM",
        title: "Strategic Leadership Workshop",
        description: "Interactive session on leadership strategies for the modern business landscape.",
        labels: ["VIP"],
        attendees: 150,
        location: "Workshop Hall",
        pointColor: "point_2"
      },
      {
        startTime: "11:30 AM",
        endTime: "12:30 PM",
        title: "Innovation Showcase",
        description: "Startup pitches and innovation demonstrations from leading entrepreneurs.",
        labels: ["LIVE"],
        attendees: 400,
        location: "Innovation Center",
        pointColor: "point_3"
      },
      {
        startTime: "12:30 PM",
        endTime: "02:00 PM",
        title: "Business Networking Lunch",
        description: "Structured networking session with industry-specific roundtables.",
        labels: ["VIP"],
        attendees: 500,
        location: "Grand Ballroom",
        pointColor: "point_4"
      },
    ]
  },
  {
    id: "education",
    title: "Education Forum",
    icon: GraduationCap,
    stats: {
      sessions: "15+",
      attendees: "350+",
      duration: "10h"
    },
    entries: [
      {
        startTime: "08:30 AM",
        endTime: "09:30 AM",
        title: "Future of Education Keynote",
        description: "Exploring how technology is transforming learning and teaching methodologies.",
        labels: ["VIP"],
        attendees: 350,
        location: "Main Hall",
        pointColor: "point_5"
      },
      {
        startTime: "09:30 AM",
        endTime: "10:30 AM",
        title: "Digital Classroom Technologies",
        description: "Hands-on demonstration of cutting-edge educational technologies and tools.",
        labels: ["LIVE"],
        attendees: 200,
        location: "Tech Lab",
        pointColor: "point_6"
      },
      {
        startTime: "10:30 AM",
        endTime: "12:00 PM",
        title: "Curriculum Design Workshop",
        description: "Interactive workshop on designing engaging and effective modern curricula.",
        labels: ["VIP"],
        attendees: 100,
        location: "Workshop Room A",
        pointColor: "point_1"
      },
      {
        startTime: "12:00 PM",
        endTime: "01:00 PM",
        title: "Student Success Stories",
        description: "Inspiring presentations from students and recent graduates.",
        labels: ["LIVE"],
        attendees: 300,
        location: "Auditorium",
        pointColor: "point_2"
      },
      {
        startTime: "01:00 PM",
        endTime: "02:30 PM",
        title: "Educator's Networking Lunch",
        description: "Connect with fellow educators and share best practices.",
        labels: ["VIP"],
        attendees: 350,
        location: "Dining Hall",
        pointColor: "point_3"
      },
    ]
  },
  {
    id: "startup",
    title: "Startup Weekend",
    icon: Zap,
    stats: {
      sessions: "20+",
      attendees: "400+",
      duration: "48h"
    },
    entries: [
      {
        startTime: "06:00 PM",
        endTime: "07:00 PM",
        title: "Pitch Night Kickoff",
        description: "60-second pitches from aspiring entrepreneurs to form weekend teams.",
        labels: ["LIVE"],
        attendees: 400,
        location: "Main Stage",
        pointColor: "point_4"
      },
      {
        startTime: "07:00 PM",
        endTime: "08:00 PM",
        title: "Team Formation",
        description: "Network and form teams around the most compelling ideas.",
        labels: ["VIP"],
        attendees: 400,
        location: "Open Space",
        pointColor: "point_5"
      },
      {
        startTime: "08:00 PM",
        endTime: "09:00 PM",
        title: "Mentor Speed Dating",
        description: "Quick sessions with experienced mentors from various industries.",
        labels: ["VIP"],
        attendees: 300,
        location: "Mentor Lounge",
        pointColor: "point_6"
      },
      {
        startTime: "09:00 PM",
        endTime: "11:00 PM",
        title: "Hackathon Begins",
        description: "Teams start working on their MVP with support from mentors.",
        labels: ["LIVE"],
        attendees: 350,
        location: "Workspace",
        pointColor: "point_1"
      },
      {
        startTime: "11:00 PM",
        endTime: "01:00 AM",
        title: "Late Night Coding Session",
        description: "Dedicated time for development with pizza and energy drinks provided.",
        labels: ["LIVE"],
        attendees: 250,
        location: "Dev Zone",
        pointColor: "point_2"
      },
    ]
  }
];