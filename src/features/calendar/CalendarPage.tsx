import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useAuth } from '../../context/AuthContext';
import { fetchTasksDetailedByAssignedToId } from '../../api/TasksApi';
import { getRandomColor } from '../../components/common/colorPalette';


const localizer = momentLocalizer(moment);

interface Event {
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  color?: string;
  colorName?: string;
}

export function CalendarPage() {

  const { state } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const getTasks = async () => {
      try {
        if (state.user?.employeeId) {
          const fetchedTasks = await fetchTasksDetailedByAssignedToId(state.user.employeeId);
          const events = fetchedTasks.map(task => {
            const randomColor = getRandomColor();
            return {
              title: task.title,
              start: task.assignedDate ? new Date(task.assignedDate) : new Date(),
              end: task.doneDate ? new Date(task.doneDate) : new Date(new Date(task.assignedDate || new Date()).getTime() + 365 * 24 * 60 * 60 * 1000), // Default to 1 year in the future if no doneDate
              allDay: true,
              color: randomColor.color,
              colorName: randomColor.name
            };
          });
          setEvents(events);
        }
      } catch (error) {
        console.error('Failed to fetch tasks', error);
      }
    };

    getTasks();
  }, [state.user]);


  const eventPropGetter = (event: Event) => {
    const backgroundColor = event.color;
    return { style: { backgroundColor } };
  };
  
  return (
    <div className='calendar-container'>
      <div className='calendar-header'>
        <h3>
          Calendar
        </h3>
      
      </div>

      <div style={{ height: '500px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        eventPropGetter={eventPropGetter}
        defaultView={Views.WEEK} 
        />
      </div>

    </div>
  );
}
