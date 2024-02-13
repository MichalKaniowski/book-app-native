import { parseISO, format } from "date-fns";
import { pl } from "date-fns/locale";

export default function getStringDate() {
  const weekdaysArray = [
    "poniedziałek",
    "wtorek",
    "środa",
    "czwartek",
    "piątek",
    "sobota",
    "niedziela",
  ];
  const day = new Date().getDay();
  const weekdayName = weekdaysArray[day - 1];
  const stringDate = new Date().toISOString().substring(0, 10);
  const date = format(parseISO(stringDate), "dd MMMM", {
    locale: pl,
  });

  return `${weekdayName}, ${date}`;
}
