import '../style/user.css';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import pencil from "@/assets/editUser.png";
import {Label} from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input";
import {Button} from "@/components/ui/button.tsx";

export function DialogDemo() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <img src={pencil} alt={"arrow right"} width={"60px"}
                     className={"box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2)"}/>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[40%]">
                <DialogHeader>
                    <DialogTitle>Меню сотрудника</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            ФИО:
                        </Label>
                        <Input value={"Сотрудник 1"} name={"user"}/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Должность:
                        </Label>
                        <Input value={"Менеджер"} name={"user"}/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            TG id:
                        </Label>
                        <p>@tgID</p>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Команда:
                        </Label>
                        <p>Команда 1</p>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Отпуск:
                        </Label>
                        <p>Отсутсвует</p>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Количество активных задач:
                        </Label>
                        <p>4</p>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" variant={"yellow"}>Сохранить изменения</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function User() {
    return (
        <div>
            <div className={'mainBlockUser'}>
            <div className={'titleUser'}>
                    <p>Сотрудники</p>
                    <div className={'formSearch'}>
                        <input type={'text'} className={'searchUser'} placeholder={'Поиск сотрудника'}/>
                        <button type={'submit'} className={'buttonSearch'}/>
                    </div>
                </div>
                <div className={'columnUser'}>
                    <div className={'rowUser'}>
                        <div>
                            <p className={'nameUser'} id={'nameUser'}>Сотрудник 1</p>
                        </div>

                        <p>Менеджер</p>
                        <DialogDemo/>

                    </div>
                    <div className={'rowUser'}>
                        <div>

                            <p className={'nameUser'} id={'nameUser'}>Сотрудник 2</p>
                            
                        </div>
                        <p>Разработчик</p>
                        <DialogDemo/>
                    </div>
                    <div className={'rowUser'}>
                        <div>

                            <p className={'nameUser'} id={'nameUser'}>Сотрудник 3</p>
                            
                        </div>
                        <p>Тестировщик</p>
                        <DialogDemo/>
                    </div>
                    <div className={'rowUser'}>
                        <div>

                            <p className={'nameUser'} id={'nameUser'}>Сотрудник 4</p>
                            
                        </div>
                        <p>Дизайнер</p>
                        <DialogDemo/>
                    </div>
                    <div className={'rowUser'}>
                        <div>

                            <p className={'nameUser'} id={'nameUser'}>Сотрудник 5</p>
                            
                        </div>
                        <p>Разработчик</p>
                        <DialogDemo/>
                    </div>
                    <div className={'rowUser'}>
                        <div>

                            <p className={'nameUser'} id={'nameUser'}>Сотрудник 6</p>
                            
                        </div>
                        <p>Тестировщик</p>
                        <DialogDemo/>
                    </div>
                    <div className={'rowUser'}>
                        <div>

                            <p className={'nameUser'} id={'nameUser'}>Сотрудник 7</p>
                            
                        </div>
                        <p>Разработчик</p>
                        <DialogDemo/>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default User;