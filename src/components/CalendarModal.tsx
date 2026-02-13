import React, { useState } from 'react';

interface Meeting {
  id: number;
  name: string;
  date: string;
  time: string;
  location: string;
  avatar: string;
  avatarColor: string;
}

interface CalendarModalProps {
  onClose: () => void;
}

export function CalendarModal({ onClose }: CalendarModalProps) {
  const [currentMonth, setCurrentMonth] = useState(0); // January 2022
  const [currentYear] = useState(2022);

  const meetings: Meeting[] = [
    {
      id: 1,
      name: 'Pixel Parliament',
      date: 'January 10th, 2022',
      time: '5:00 PM',
      location: 'Conference Room A',
      avatar: 'LA',
      avatarColor: 'from-pink-400 to-pink-600'
    },
    {
      id: 2,
      name: 'The Empathy Lab Sync',
      date: 'January 12th, 2022',
      time: '3:00 PM',
      location: 'Conference Room B',
      avatar: 'MF',
      avatarColor: 'from-amber-400 to-amber-600'
    },
    {
      id: 3,
      name: 'Constraint & Creativity Council',
      date: 'January 12th, 2022',
      time: '5:00 PM',
      location: 'Conference Room C',
      avatar: 'DV',
      avatarColor: 'from-blue-400 to-blue-600'
    },
    {
      id: 4,
      name: 'Wireframe War Room',
      date: 'January 13th, 2022',
      time: '10:00 AM',
      location: 'Conference Room D',
      avatar: 'SJ',
      avatarColor: 'from-green-400 to-green-600'
    },
    {
      id: 5,
      name: 'The Affordance Assembly',
      date: 'January 13th, 2022',
      time: '2:30 PM',
      location: 'Conference Room E',
      avatar: 'TB',
      avatarColor: 'from-purple-400 to-purple-600'
    },
    {
      id: 6,
      name: 'Signal over Noise Summit',
      date: 'January 14th, 2022',
      time: '11:00 AM',
      location: 'Conference Room F',
      avatar: 'EC',
      avatarColor: 'from-red-400 to-red-600'
    },
    {
      id: 7,
      name: 'Prototype & Provoke Roundtable',
      date: 'January 14th, 2022',
      time: '4:00 PM',
      location: 'Conference Room G',
      avatar: 'JW',
      avatarColor: 'from-teal-400 to-teal-600'
    },
    {
      id: 8,
      name: 'Delight by Design Forum',
      date: 'January 15th, 2022',
      time: '9:30 AM',
      location: 'Conference Room H',
      avatar: 'RM',
      avatarColor: 'from-indigo-400 to-indigo-600'
    }
  ];

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = () => {
    const days = [];
    const totalDays = daysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

    // Previous month's days
    const prevMonthDays = currentMonth === 0
      ? daysInMonth(11, currentYear - 1)
      : daysInMonth(currentMonth - 1, currentYear);

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        isCurrentMonth: false,
        isToday: false
      });
    }

    // Current month's days
    const today = 22; // January 22nd as shown in the design
    for (let i = 1; i <= totalDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        isToday: i === today && currentMonth === 0
      });
    }

    // Next month's days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        isToday: false
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-6xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white">
          <h2 className="text-xl font-bold text-gray-900">Calendar & Meetings</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Upcoming meetings */}
          <div className="flex flex-col max-h-[600px]">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming meetings</h3>
            <div className="space-y-4 overflow-y-auto pr-2">
              {meetings.map((meeting) => (
                <div key={meeting.id} className="flex items-start gap-3 pb-4 border-b border-gray-200 last:border-0">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${meeting.avatarColor} flex items-center justify-center flex-shrink-0`}>
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900">{meeting.name}</h4>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600 mt-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{meeting.date} at {meeting.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600 mt-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      <span>{meeting.location}</span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Calendar */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setCurrentMonth(Math.max(0, currentMonth - 1))}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <h3 className="text-lg font-semibold text-gray-900">{monthNames[currentMonth]}</h3>
              <button
                onClick={() => setCurrentMonth(Math.min(11, currentMonth + 1))}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>

            {/* Calendar grid */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              {/* Day headers */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                  <div key={idx} className="text-center text-xs font-medium text-gray-600">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar days */}
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day, idx) => (
                  <button
                    key={idx}
                    className={`
                      aspect-square flex items-center justify-center text-sm rounded-lg transition-all
                      ${day.isToday
                        ? 'bg-indigo-600 text-white font-semibold'
                        : day.isCurrentMonth
                          ? 'text-gray-900 hover:bg-gray-100'
                          : 'text-gray-400'
                      }
                    `}
                  >
                    {day.day}
                  </button>
                ))}
              </div>

              {/* Add event button */}
              <button className="w-full mt-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors">
                Add event
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
