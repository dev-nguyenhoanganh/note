import { useRef } from 'react';
import { Card } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

import { isSaturday, previousSunday, nextSaturday, isSunday } from 'date-fns';

import '@fullcalendar/react/dist/vdom';
import FullCalendar, { EventContentArg, EventInput } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja';

// Utils
const StyledCalendar = styled(Card)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.1 : 0.8),
  backdropFilter: 'blur(135px)',
  padding: theme.spacing(3),
  borderRadius: '16px',

  overflow: 'hidden',
  '& table': {
    backgroundColor: alpha(theme.palette.common.white, theme.palette.mode === 'dark' ? 0.05 : 0.4),
    border: 'none !important',
  },

  '.fc thead th': {
    fontWeight: 'bold',
    backgroundColor: alpha(theme.palette.common.white, theme.palette.mode === 'dark' ? 0.05 : 0.5),
  },

  '& table tbody tr:last-child td': {
    borderBottom: 'none',
  },

  '.fc-day-sat': {
    backgroundColor: alpha('#47a5d7', 0.3),
  },
  '.fc-day-sun': {
    backgroundColor: alpha('#e05e5e', 0.3),
  },

  '.fc-daygrid-day-number': {
    fontSize: '16px',
  },

  'th.fc-day-sat': {
    color: '#47a5d7',
  },
  'th.fc-day-sun': {
    color: '#e05e5e',
  },

  '.fc .fc-daygrid-body-unbalanced .fc-daygrid-day-events': {
    minHeight: '20px',
    marginBottom: 0,
  },

  '.fc .fc-daygrid-event': {
    padding: '5px',
    boxSizing: 'border-box',
    marginTop: '5px',
  },

  '.fc-daygrid-dot-event:hover, .fc-daygrid-dot-event.fc-event-mirror': {
    backgroundColor: 'inherit',
  },

  '.fc-daygrid-day-top': {
    justifyContent: 'center',
  },

  '.workout-value': {
    margin: 0,
  },

  '.fc-col-header-cell': {
    height: '20px',
    fontWeight: 400,
    // borderTop: 'none',
    borderBottom: 'none',
  },

  '.fc-theme-standard td:first-of-type, .fc-theme-standard th:first-of-type': {
    borderLeft: 'none',
  },

  '.fc-theme-standard td:last-child, .fc-theme-standard th:last-child': {
    borderRight: 'none',
  },

  '.fc-h-event .fc-event-main': {
    color: '#000',
  },

  '.fc .hidden-cell tbody': {
    display: 'none',
  },

  '.fc-day-disabled': {
    display: 'none',
  },
}));

interface Props {
  className?: string;
  events?: EventInput[];
  onMonthChange?: (value: string) => unknown;
}

export function CalendarMonth({ events = [] }: Props): JSX.Element {
  const calendarRef = useRef<FullCalendar>(null);

  const renderEventContent = ({ event: { title } }: EventContentArg) => {
    return (
      <div className="relative w-full">
        <p className="workout-value">{title}</p>
      </div>
    );
  };

  return (
    <StyledCalendar>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin]} // Cần phải khai báo plugin để sử dụng Week view
        initialView="dayGridMonth"
        locales={[jaLocale]}
        duration={{ weeks: 2, month: 1 }} // Xác định khoảng thời gian là 2 tuần
        headerToolbar={{ center: 'title', end: undefined, start: undefined }}
        validRange={{
          start: isSunday(new Date()) ? new Date() : previousSunday(new Date()),
          end: isSaturday(new Date()) ? nextSaturday(new Date()) : nextSaturday(nextSaturday(new Date())),
        }} // Đảm bảo người dùng không thể chuyển qua các tuần khác
        events={events}
        eventContent={renderEventContent}
        dayCellContent={({ dayNumberText }) => {
          return dayNumberText.replace('日', '');
        }}
        dayMaxEventRows={true}
      />
      {/* <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin]}
        initialView="dayGridWeek"
        locales={[jaLocale]}
        locale="ja"
        height="auto"
        headerToolbar={{ center: 'title', end: undefined, start: undefined }}
        firstDay={0}
        dayHeaderFormat={{ weekday: 'short' }}
        selectable={false}
        viewClassNames="hidden-cell"
      />
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridWeek"
        locales={[jaLocale]}
        locale="ja"
        height="auto"
        headerToolbar={false}
        firstDay={0}
        dayHeaderFormat={{ day: '2-digit' }}
        selectable={false}
        events={events}
        eventContent={renderEventContent}
        dayHeaderContent={({ text }) => {
          return text.replace('日', '');
        }}
      />
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridWeek"
        locales={[jaLocale]}
        locale="ja"
        height="auto"
        headerToolbar={false}
        firstDay={0}
        dayHeaderFormat={{ day: '2-digit' }}
        selectable={false}
        events={events}
        initialDate={nextSunday(new Date())}
        eventContent={renderEventContent}
        dayHeaderContent={({ text }) => {
          return text.replace('日', '');
        }}
      /> */}
    </StyledCalendar>
  );
}
