import { DateTime } from 'luxon'

export default class DateHelper {
    static getDateDifferenceFromNow = (upcomingHour: string, daysDifference: number) => {
        //We get the hour members
        const [hour, minutes] = upcomingHour.split(':');
        //We set the next date and add the days difference
        const nextDate = DateTime.fromObject({
            hour: Number(hour),
            minute: Number(minutes)
        })
            .plus({ days: daysDifference })
            .setLocale('es-mx');
        return nextDate.toRelativeCalendar();

    }
}