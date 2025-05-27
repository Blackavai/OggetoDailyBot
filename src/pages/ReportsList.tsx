import '../style/report.css';
import arrow from '../assets/right-arrow-upd.png';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function DialogDemo() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <img src={arrow} alt={"arrow right"} width={"60px"} className={"box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2)"}/>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[50%]">
                <DialogHeader>
                    <DialogTitle>Меню отчёта</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Автор отчёта:
                        </Label>
                        <p id="name" className="col-span-3">Сотрудник 1</p>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Дата формирования:
                        </Label>
                        <p id="name" className="col-span-3">01.01.2000</p>
                    </div>
                    <div className="grid items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Выполненные задачи:
                        </Label>
                        <ol type={"1"}>
                            <li>1. Задача 1</li>
                            <li>2. Задача 2</li>
                        </ol>
                    </div>
                    <div className="grid grid-cols-1 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Комментарий сотрудника:
                        </Label>
                        <p id="name" className="col-span-3">Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст </p>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Принять отчёт</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function SelectDemo() {
    return (
        <Select>
            <SelectTrigger className="w-[350px] h-[100%]">
                <SelectValue placeholder="Не просмотренные"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="noWatched">Не просмотренные</SelectItem>
                    <SelectItem value="watched">Просмотренные</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

function ReportsList () {
    return (
        <div>
            <div className={'mainBlockTeam'}>
                <div className={'titleReport'}>
                    <p>Список всех отчётов</p>
                    <div className={'formSearch'}>
                        <input type={'text'} className={'searchReport'} placeholder={'Поиск отчёта'}/>
                        <button type={'submit'} className={'buttonSearch'}/>
                    </div>
                    <div className={"selectReport"}>
                        <SelectDemo />
                    </div>
                </div>
                <div className={'columnReport'}>
                    <div className={'rowReport'}>
                        <p className={'nameReport'} id={'nameReport'}>Сотрудник 1</p>
                        <p>01.01.2000</p>
                        <DialogDemo/>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
}

export default ReportsList;