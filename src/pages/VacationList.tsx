import '../style/vacation.css';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    // DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils"
import {DialogDemo} from "@/pages/users.tsx";

function formatDate(date: Date | undefined) {
    if (!date) {
        return ""
    }
    return date.toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    })
}
function isValidDate(date: Date | undefined) {
    if (!date) {
        return false
    }
    return !isNaN(date.getTime())
}
export function Calendar28({ plcHolder, onChange }) {
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState<Date | undefined>();
    const [month, setMonth] = React.useState<Date | undefined>(date);
    const [value, setValue] = React.useState(formatDate(date));

    React.useEffect(() => {
        if (date) {
            setValue(formatDate(date));
            onChange(date); // Call the onChange prop to notify parent of the date change
        }
    }, [date, onChange]);

    return (
        <div className="flex flex-col gap-3">
            <div className="relative flex gap-2">
                <input
                    id="date"
                    value={value}
                    placeholder={plcHolder}
                    className="col-span-3 outlineFocus hrTitle rounded-none focus:shadow-none w-full"
                    onChange={(e) => {
                        const date = new Date(e.target.value);
                        if (isValidDate(date)) {
                            setDate(date);
                            setMonth(date);
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                            e.preventDefault();
                            setOpen(true);
                        }
                    }}
                />
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            id="date-picker"
                            variant="ghost"
                            className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                        >
                            <CalendarIcon className="size-3.5" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="end"
                        alignOffset={-8}
                        sideOffset={10}
                    >
                        <Calendar
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            month={month}
                            onMonthChange={setMonth}
                            onSelect={(selectedDate) => {
                                setDate(selectedDate);
                                setOpen(false);
                            }}
                            startMonth={new Date(2025, 1)}
                            endMonth={new Date(2030, 12)}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}

export function SelectUser({ setUserId }) {
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/users")
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {value
                        ? users.find((user) => `${user.fname} ${user.lname}` === value)?.fname + " " + users.find((user) => `${user.fname} ${user.lname}` === value)?.lname
                        : "Начните вводить ФИО"}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <Command>
                    <CommandInput placeholder="Начните вводить ФИО" />
                    <CommandList>
                        <CommandEmpty>Пользователь не найден</CommandEmpty>
                        <CommandGroup>
                            {users.map((user) => (
                                <CommandItem
                                    key={user.id}
                                    value={`${user.fname} ${user.lname}`}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue);
                                        setUserId(user.id); // Set the user ID when selected
                                        setOpen(false);
                                    }}
                                >
                                    <CheckIcon
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === `${user.fname} ${user.lname}` ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    <div className={"userList"}>
                                        <p>{user.fname} {user.lname}</p>
                                        <span>{user.post}</span>
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export function DialogAddVacation() {
    const [userId, setUserId] = useState(""); // State to hold the selected user ID
    const [startHoliday, setStartDate] = useState("");
    const [endHoliday, setEndDate] = useState("");

    const addVacation = () => {
        const vacationData = {
            startHoliday,
            endHoliday,
        };

        axios
            .post(`http://localhost:5000/api/users/vacation/${userId}`, vacationData)
            .then((response) => {
                console.log("Vacation added successfully:", response.data);
                // Optionally reset the form
                setUserId("");
                setStartDate("");
                setEndDate("");
            })
            .catch((error) => {
                console.error("There was an error adding the vacation:", error);
            });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button type={'submit'} className={'addVacationButt'} />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[40%] p-15">
                <DialogHeader>
                    <DialogTitle>Меню отпусков</DialogTitle>
                </DialogHeader>
                <div className="grid gap-5 py-10">
                    <SelectUser setUserId={setUserId} /> {/* Pass setUserId to SelectUser */}
                    <div>
                        <Calendar28
                            plcHolder={"Начало отпуска"}
                            onChange={(date) => setStartDate(date)} // Set start date
                        />
                    </div>
                    <div>
                        <Calendar28
                            plcHolder={"Конец отпуска"}
                            onChange={(date) => setEndDate(date)} // Set end date
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" variant={"yellow"} onClick={addVacation}>
                        Открыть отпуск
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function VacationList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/users/vacation/view")
            .then((response) => {
                console.log(response.data); // Логируем данные
                setUsers(response.data.user); // Извлекаем массив пользователей
            })
            .catch((error) => {
                console.log(error);
                setUsers([]); // Устанавливаем пустой массив в случае ошибки
            });
    }, []);

    // Получаем текущую дату
    const today = new Date();

    // Фильтруем пользователей, оставляя только тех, у кого отпуск в будущем
    const upcomingUsers = users.filter(user => {
        const startDate = new Date(user.end_holiday);
        return startDate >= today; // Проверяем, начинается ли отпуск сегодня или позже
    });

    return (
        <div className={'mainBlockTeam'}>
            <div className={'titleVacation'}>
                <p>Сотрудники в отпуске</p>
                <DialogAddVacation />
            </div>

            <div className={'columnReport'}>
                {upcomingUsers.length === 0 ? (
                    <p>Нет сотрудников в отпуске</p>
                ) : (
                    upcomingUsers.map(user => {
                        const startDate = new Date(user.start_holiday);
                        const endDate = new Date(user.end_holiday);
                        const formattedStartDate = startDate.toLocaleDateString("ru-RU", {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                        });
                        const formattedEndDate = endDate.toLocaleDateString("ru-RU", {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                        });

                        return (
                            <div className={'rowReport'} key={user.id}>
                                <p className={'nameReport'} id={'nameReport'}>{user.fname} {user.lname}</p>
                                <p>{formattedStartDate} - {formattedEndDate}</p>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default VacationList;