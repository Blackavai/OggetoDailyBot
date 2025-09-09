import '../style/report.css';
import arrow from '../assets/right-arrow-upd.png';
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
// import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import React, {useEffect, useState} from "react";
import axios from "axios";

export function DialogDemo({userReport}) {

    const readReport = (userReportId) => {
        axios
            .put(`http://localhost:5000/api/reports/accept/${userReportId}`)
            .then((response) => {
                console.log("Успешный запрос", response.data);
                // setOpen(false);
            })
            .catch((error) => {
                console.error("Ошибка запроса", error);
            });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <img src={arrow} alt={"arrow right"} width={"60px"} className={"box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2)"}/>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[40%] p-15">
                <DialogHeader>
                    <DialogTitle>Меню отчётов</DialogTitle>
                </DialogHeader>
                <div className="grid gap-5 py-10">
                    <div className="grid grid-cols-4 items-center gap-4 hrTitle">
                        <p id="name" className="col-span-3">Отчитывающийся: {userReport.fname} {userReport.lname}</p>
                    </div>
                    <div className="grid items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Выполненные задачи:
                        </Label>
                        <ol type={"1"}>
                            <li>{userReport.content}</li>
                        </ol>
                    </div>
                </div>
                <DialogFooter>
                    {userReport.check_report ? null : (
                        <Button type="submit" variant={"yellow"} onClick={() => readReport(userReport.id)}>Отчёт прочитан</Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export function SelectDemo({onSelect}) {
    return (
        <Select onValueChange={onSelect}>
            <SelectTrigger className="w-[350px] h-[100%]">
                <SelectValue placeholder="Запланировано"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="noWatched">Запланировано</SelectItem>
                    <SelectItem value="watched">Просмотрено</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

function ReportsList () {
    const [userReport, setUserReport] = useState([]);
    const [searchUserReport, setsearchUserReport] = useState("");
    const [filter, setFilter] = useState("noWatched");

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/reports")
            .then((response) => {
                setUserReport(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const filteredReports = userReport.filter(report => {
        const matchesSearch = `${report.fname} ${report.lname}`.toLowerCase().includes(searchUserReport.toLowerCase());
        const matchesFilter = filter === "watched" ? report.check_report : !report.check_report;
        return matchesSearch && matchesFilter;
    });

    return (
        <div>
            <div className={'mainBlockTeam'}>
                <div className={'titleReport'}>
                    <p>Отчёты</p>
                    <div className={'formSearch'}>
                        <input type={'text'} className={'searchReport'} placeholder={'Поиск отчёта'} onChange={(e) => setsearchUserReport(e.target.value)} />
                        <button type={'submit'} className={'buttonSearch'} />
                    </div>
                    <div className={"selectReport"}>
                        <SelectDemo onSelect={setFilter} />
                    </div>
                </div>
                <div className={'columnReport'}>
                    {filteredReports.map(report => {
                        const formattedDate = new Date(report.end_date).toLocaleDateString("ru-RU", {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                        });

                        return (
                            <div className={'rowReport'} key={report.id}>
                                <p className={'nameReport'} id={'nameReport'}>{report.fname} {report.lname}</p>
                                <p>{formattedDate}</p>
                                <DialogDemo userReport={report} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ReportsList;