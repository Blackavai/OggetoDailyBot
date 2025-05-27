import '../style/team.css';
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
import { Textarea } from "@/components/ui/textarea"

export function DialogDemo() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <img src={arrow} alt={"arrow right"} width={"60px"} className={"box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2)"}/>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[50%]">
                <DialogHeader>
                    <DialogTitle>Команда 1</DialogTitle>
                    <DialogDescription>
                        Описание команды
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Название
                        </Label>
                        <Input id="name" value="Команда 1" className="col-span-3"/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Описание
                        </Label>
                        <Textarea id="username" value="Какое-то описание" className="col-span-3" />
                    </div>
                    <div className="grid items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Участники команды
                        </Label>
                        <ol type={"1"}>
                            <li>1. Джонгук</li>
                            <li>2. Ви</li>
                            <li>3. Чимин</li>
                            <li>4. Джин</li>
                            <li>5. Шуга</li>
                            <li>6. Джей-хоуп</li>
                        </ol>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Сохранить изменения</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function Teams() {
    return (
        <div>
            <div className={'mainBlockTeam'}>
                <div className={'titleTeam'}>
                    <p>Список команд</p>
                    <div className={'formSearch'}>
                        <input type={'text'} className={'searchTeam'} placeholder={'Поиск команды'}/>
                        <button type={'submit'} className={'buttonSearch'}/>
                    </div>
                    <button type={'submit'} className={'addTeam'}/>
                </div>
                <div className={'columnTeam'}>
                    <div className={'rowTeam'}>
                        <div>
                            <p className={'nameTeam'} id={'nameTeam'}>Команда 1</p>
                            <p className={'descriptionTeam'}>Описание команды</p>
                        </div>
                        <DialogDemo/>
                    </div>
                    <div className={'rowTeam'}>
                        <div>
                            <p className={'nameTeam'} id={'nameTeam'}>Команда 2</p>
                            <p className={'descriptionTeam'}>Описание команды</p>
                        </div>
                        <DialogDemo/>
                    </div>
                    <div className={'rowTeam'}>
                        <div>
                            <p className={'nameTeam'} id={'nameTeam'}>Команда 3</p>
                            <p className={'descriptionTeam'}>Описание команды</p>
                        </div>
                        <DialogDemo/>
                    </div>
                    <div className={'rowTeam'}>
                        <div>
                            <p className={'nameTeam'} id={'nameTeam'}>Команда 4</p>
                            <p className={'descriptionTeam'}>Описание команды</p>
                        </div>
                        <DialogDemo/>
                    </div>
                    <div className={'rowTeam'}>
                        <div>
                            <p className={'nameTeam'} id={'nameTeam'}>Команда 5</p>
                            <p className={'descriptionTeam'}>Описание команды</p>
                        </div>
                        <DialogDemo/>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
}

export default Teams;