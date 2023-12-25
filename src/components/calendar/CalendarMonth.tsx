import { useRef } from 'react';
import { Tooltip, Card } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

import '@fullcalendar/react/dist/vdom';
import FullCalendar, { EventContentArg, EventInput } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja';

// Utils
const StyledCalendar = styled(Card)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.1 : 0.8),
  backdropFilter: 'blur(135px)',
  padding: theme.spacing(3),
  height: '485px',
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

  // '.fc .fc-toolbar': {
  //   display: 'none',
  // },

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

  '.fc-col-header-cell': {
    height: '20px',
    fontWeight: 400,
    borderTop: 'none',
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
}));

interface Props {
  className?: string;
  events?: EventInput[];
  onMonthChange?: (value: string) => unknown;
}

export function CalendarMonth({ events = [] }: Props): JSX.Element {
  const calendarRef = useRef<FullCalendar>(null);

  const renderEventContent = ({ event: { title, display } }: EventContentArg) => {
    if (display === 'background') {
      return (
        <div className="p-[8px] max-w-[85%]">
          <Tooltip title={title} PopperProps={{ style: { zIndex: 10000, maxWidth: '230px' } }} arrow>
            <p className="whitespace-nowrap w-fit overflow-hidden text-ellipsis text-[13px] text-[#e05e5e]">{title}</p>
          </Tooltip>
        </div>
      );
    }

    return (
      <Tooltip title={title} PopperProps={{ style: { zIndex: 10000, maxWidth: '230px' } }} arrow>
        <div className="relative w-full">
          <p className="whitespace-nowrap overflow-hidden text-ellipsis text-[13px]">{title}</p>
        </div>
      </Tooltip>
    );
  };

  return (
    <StyledCalendar>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locales={[jaLocale]}
        locale="ja"
        height="auto"
        firstDay={1}
        selectable={true}
        events={events}
        eventContent={renderEventContent}
        fixedWeekCount={false}
        dayCellContent={(args) => {
          return args.dayNumberText.replace('日', '');
        }}
        moreLinkContent={() => {
          return <a href="#">more</a>;
        }}
      />
    </StyledCalendar>
  );
}
