const Page: React.FC = () => {
    return (
        <main>
            <h1>Calendario</h1>
        </main>
    );
};

export default Page;

// import { Calendar, dateFnsLocalizer } from "react-big-calendar";
// import format from "date-fns/format";
// import parse from "date-fns/parse";
// import startOfWeek from "date-fns/startOfWeek";
// import getDay from "date-fns/getDay";
// import enUS from "date-fns/locale/en-US";

// const locales = {
//     "en-US": enUS,
// };

// const localizer = dateFnsLocalizer({
//     format,
//     parse,
//     startOfWeek,
//     getDay,
//     locales,
// });

// const MyCalendar = () => (
//     <div>
//         <Calendar
//             localizer={localizer}
//             events={[]}
//             startAccessor="start"
//             endAccessor="end"
//             style={{ height: 500 }}
//         />
//     </div>
// );

// export default MyCalendar;
